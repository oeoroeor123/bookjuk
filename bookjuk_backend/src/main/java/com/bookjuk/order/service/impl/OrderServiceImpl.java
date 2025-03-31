package com.bookjuk.order.service.impl;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.bookjuk.model.dto.PageDto;
import com.bookjuk.order.domain.CancelDefinition;
import com.bookjuk.order.domain.CancelReason;
import com.bookjuk.order.domain.CancelStatus;
import com.bookjuk.order.domain.Order;
import com.bookjuk.order.domain.OrderItem;
import com.bookjuk.order.domain.OrderStatus;
import com.bookjuk.order.dto.CancelDefinitionDto;
import com.bookjuk.order.dto.CancelReasonDto;
import com.bookjuk.order.dto.CancelStatusDto;
import com.bookjuk.order.dto.OrderDto;
import com.bookjuk.order.dto.OrderItemDto;
import com.bookjuk.order.dto.OrderStatusDto;
import com.bookjuk.order.repository.CancelDefinitionRepository;
import com.bookjuk.order.repository.CancelReasonRepository;
import com.bookjuk.order.repository.CancelStatusRepository;
import com.bookjuk.order.repository.OrderItemRepository;
import com.bookjuk.order.repository.OrderRepository;
import com.bookjuk.order.repository.OrderStatusRepository;
import com.bookjuk.order.service.IOrderService;
import com.bookjuk.port.one.domain.Pay;
import com.bookjuk.port.one.repository.PayRepository;
import com.bookjuk.port.one.service.impl.PaymentServiceImpl;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.portone.sdk.server.payment.PaymentClient;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderServiceImpl implements IOrderService {

  // 의존성 주입을 위한 final 필드들: 각 Repository, ModelMapper, PageDto 등이 자동 주입됩니다.
  private final OrderRepository            orderRepository;
  private final CancelDefinitionRepository cancelDefinitionRepository;
  private final OrderItemRepository        orderItemRepository;
  private final OrderStatusRepository      orderStatusRepository;
  private final CancelReasonRepository     cancelReasonRepository;
  private final CancelStatusRepository     cancelStatusRepository;
  private final PayRepository              payRepository;
  private final ModelMapper                modelMapper;
  private final PageDto                    pageDto;
  private final ObjectMapper               objectMapper;
  private final PaymentServiceImpl         paymentServiceImpl;

  private final PaymentClient portone = new PaymentClient(
      "pWw5BI1fPoncJnEuZ6PF5ILF9Svx3hLEu2UaAg72S5XJbJa5yEHgQFAT5eYVXJRjUnhypozpWzhHvGeg",
      "https://api.portone.io", null
  );

  /**
   * 주문 상세 조회 메서드
   * 주어진 orderId를 기반으로 주문 정보를 조회하고, Order 엔티티를 OrderDto로 변환하여 반환합니다.
   *
   * @param  orderId                  조회할 주문의 식별자
   * 
   * @return                          주문 정보를 담은 OrderDto 객체
   * 
   * @throws IllegalArgumentException 주문이 존재하지 않을 경우 예외 발생
   */
  @Override
  @Transactional(readOnly = true)
  public OrderDto findOrderId(Integer orderId) {

    // 1. orderId를 기준으로 Order 엔티티를 조회합니다.
    Order order = orderRepository.findById(orderId)
        .orElseThrow(() -> new IllegalArgumentException("해당 orderId의 주문이 존재하지 않습니다."));

    // 2. 조회된 Order 엔티티를 OrderDto로 매핑합니다.
    OrderDto orderDto = modelMapper.map(order, OrderDto.class);

    // 3. 주문 엔티티에 포함된 모든 주문 항목(OrderItem)에 대해,
    // 각 항목을 OrderItemDto로 변환하며, CancelReason 리스트도 함께 매핑합니다.
    List<OrderItemDto> orderItemsDtoList = order.getOrderItems()
        .stream()
        .map(orderItem -> {
          // 주문 항목을 DTO로 변환
          OrderItemDto orderItemDto = modelMapper.map(orderItem, OrderItemDto.class);

          // 주문 항목의 취소 사유(CancelReason)들을 CancelReasonDto로 변환
          List<CancelReasonDto> cancelReasonDtoList = orderItem.getCancelReason()
              .stream()
              .map(cancelReason -> modelMapper.map(cancelReason, CancelReasonDto.class))
              .collect(Collectors.toList());

          // 변환된 취소 사유 목록을 주문 항목 DTO에 설정
          orderItemDto.setCancelReasons(cancelReasonDtoList);
          return orderItemDto;
        })
        .collect(Collectors.toList());

    // 4. 변환된 주문 항목 리스트를 OrderDto에 설정한 후 반환
    orderDto.setOrderItems(orderItemsDtoList);
    return orderDto;
  }

  /**
   * 사용자 ID를 기준으로 해당 사용자의 주문 내역을 조회하고, 페이징 정보를 포함한 결과를 반환합니다.
   *
   * @param  userId                   주문을 조회할 사용자의 식별자
   * @param  pageable                 페이징 정보 (페이지 번호, 크기 등)
   * 
   * @return                          주문 목록, 페이지 번호 리스트, 페이징 정보를 포함한 Map 객체
   * 
   * @throws IllegalArgumentException 해당 사용자의 주문이 존재하지 않을 경우 예외 발생
   */
  @Override
  @Transactional(readOnly = true)
  public Map<String, Object> findOrderByUserId(Integer userId, Pageable pageable) {

    // 1. 음수 페이지 번호 방지를 위해 현재 페이지에서 1을 차감하여 Pageable 객체를 수정합니다.
    pageable = pageable.withPage(pageable.getPageNumber() - 1);

    // 2. 사용자 ID를 기준으로 주문 목록을 조회합니다.
    Page<Order> orders = orderRepository.findByUserUserId(userId, pageable);

    // 3. 조회된 주문 건수에 따라 PageDto의 페이징 정보를 업데이트합니다.
    pageDto.setPaging(
        pageable.getPageNumber() + 1, pageable.getPageSize(), (int) orders.getTotalElements()
    );

    // 4. 주문 목록이 없을 경우 예외를 발생시킵니다.
    if (orders == null || orders.isEmpty()) {
      throw new IllegalArgumentException("해당 사용자 ID의 주문이 존재하지 않습니다.");
    }

    // 5. 각 주문 엔티티를 OrderDto로 변환하고, 주문 항목과 취소 사유를 함께 매핑합니다.
    List<OrderDto> orderDtoList = orders.stream()
        .map(order -> {
          // Order 엔티티를 DTO로 매핑
          OrderDto orderDto = modelMapper.map(order, OrderDto.class);

          // OrderItem 리스트를 OrderItemDto 리스트로 변환
          List<OrderItemDto> orderItemsDtoList = order.getOrderItems().stream()
              .map(orderItem -> {
                OrderItemDto orderItemDto = modelMapper.map(orderItem, OrderItemDto.class);

                // 주문 항목에 포함된 취소 사유(CancelReason)들을 DTO로 변환
                List<CancelReasonDto> cancelReasonDtoList = orderItem.getCancelReason().stream()
                    .map(cancelReason -> modelMapper.map(cancelReason, CancelReasonDto.class))
                    .collect(Collectors.toList());

                // 변환된 취소 사유를 주문 항목 DTO에 설정
                orderItemDto.setCancelReasons(cancelReasonDtoList);
                return orderItemDto;
              })
              .collect(Collectors.toList());

          // 변환된 주문 항목 리스트를 주문 DTO에 설정
          orderDto.setOrderItems(orderItemsDtoList);
          return orderDto;
        }).collect(Collectors.toList());

    // 6. 현재 페이지부터 마지막 페이지까지의 페이지 번호 리스트를 IntStream으로 생성합니다.
    List<Integer> pageList = IntStream.rangeClosed(pageDto.getBeginPage(), pageDto.getEndPage())
        .boxed()
        .collect(Collectors.toList());

    // 7. 주문 목록, 페이지 번호 리스트, 페이징 정보를 Map에 담아 반환합니다.
    return Map.of("orderList", orderDtoList, "pageList", pageList, "pageDto", pageDto);
  }

  /**
   * 새로운 주문을 생성하는 메서드.
   * 유효한 사용자 ID와 주문 정보를 받아 Order 엔티티를 생성하고 저장한 후, 저장된 엔티티를 DTO로 반환합니다.
   *
   * @param  userId                   주문을 생성할 사용자의 식별자
   * @param  orderDto                 주문 정보가 담긴 DTO 객체
   * 
   * @return                          저장된 주문 정보를 담은 OrderDto 객체
   * 
   * @throws IllegalArgumentException 유효한 사용자 ID가 제공되지 않을 경우 예외 발생
   */
  @Override
  public OrderDto insertOrder(Integer userId, OrderDto orderDto) {
    // 1. 사용자 ID가 없으면 주문 진행이 불가능하므로 예외 발생
    if (userId == null) {
      throw new IllegalArgumentException("유저 아이디가 제공되지 않아 주문을 진행할 수 없습니다.");
    }

    // 2. OrderDto를 Order 엔티티로 변환
    Order orderEntity = modelMapper.map(orderDto, Order.class);

    // 3. 주문 항목(OrderItem)이 존재할 경우, 각 항목에 부모 Order 객체를 설정하여 양방향 연관관계를 구성
    if (orderEntity.getOrderItems() != null) {
      orderEntity.getOrderItems().forEach(item -> item.setOrder(orderEntity));
    }

    // 4. 주문 엔티티를 데이터베이스에 저장 후, 저장된 엔티티를 반환
    Order savedOrder = orderRepository.save(orderEntity);

    // 5. 저장된 Order 엔티티를 다시 OrderDto로 매핑하여 반환
    OrderDto savedOrderDto = modelMapper.map(savedOrder, OrderDto.class);
    return savedOrderDto;
  }

  /**
   * 모든 취소 사유 정의(CancelDefinition) 목록을 조회하는 메서드
   *
   * @return CancelDefinitionDto 리스트
   */
  @Override
  public List<CancelDefinitionDto> getAllCancelDefinitions() {
    // Repository를 통해 모든 취소 사유 정의 데이터를 DTO 리스트로 조회하여 반환합니다.
    return cancelDefinitionRepository.findAllCancelDefinitionDtos();
  }

  /**
   * 모든 취소 상태(CancelStatus) 목록을 조회하는 메서드
   *
   * @return CancelStatusDto 리스트
   */
  @Override
  public List<CancelStatusDto> getAllCancelStatus() {
    // Repository를 통해 모든 취소 상태 데이터를 DTO 리스트로 조회하여 반환합니다.
    return cancelStatusRepository.findAllCancelStatus();
  }

  /**
   * 취소 요청을 처리하는 메서드.
   * 각 CancelReasonDto에 대해 주문 항목을 조회하고, 취소 관련 엔티티(CancelDefinition, CancelStatus)를 할당한 후,
   * CancelReason 엔티티를 생성하여 데이터베이스에 저장합니다.
   *
   * @param  cancelReasonDtoList      취소 요청 정보를 담은 DTO 리스트
   * 
   * @throws IllegalArgumentException 주문 항목이 존재하지 않거나, 필수 정보가 누락된 경우 예외 발생
   */
  @Override
  public void processCancelRequests(List<CancelReasonDto> cancelReasonDtoList) {
    for (CancelReasonDto cancelReasonDto : cancelReasonDtoList) {
      // 1. 주문 항목(OrderItem) 조회
      OrderItem orderItem = null;
      if (cancelReasonDto.getOrderItem() != null &&
          cancelReasonDto.getOrderItem().getOrderItemId() != null) {
        orderItem = orderItemRepository.findById(
            cancelReasonDto.getOrderItem().getOrderItemId()
        ).orElse(null);
      }

      if (orderItem == null) {
        throw new IllegalArgumentException(
            "주문 항목을 찾을 수 없습니다. orderItemId: " +
                (cancelReasonDto.getOrderItem() != null
                    ? cancelReasonDto.getOrderItem().getOrderItemId()
                    : "null")
        );
      }

      // 2. CancelDefinition 조회 (null 가능)
      CancelDefinition cancelDefinition = null;
      if (cancelReasonDto.getCancelDefinition().getCancelDefinitionId() != null) {
        cancelDefinition = cancelDefinitionRepository.findById(
            cancelReasonDto.getCancelDefinition().getCancelDefinitionId()
        ).orElse(null);
      }

      // 3. CancelStatus 조회 (필수)
      if (cancelReasonDto.getCancelStatus() == null ||
          cancelReasonDto.getCancelStatus().getCancelStatusId() == null) {
        throw new IllegalArgumentException("취소 상태 아이디가 제공되지 않았습니다.");
      }

      CancelStatus cancelStatus = cancelStatusRepository.findById(
          cancelReasonDto.getCancelStatus().getCancelStatusId()
      ).orElseThrow(() -> new IllegalArgumentException("유효한 취소 상태가 존재하지 않습니다."));

      // 4. ModelMapper로 기본 필드 매핑
      CancelReason cancelReason = modelMapper.map(cancelReasonDto, CancelReason.class);

      // 5. 엔티티 관계 필드 수동 할당
      cancelReason.setOrderItem(orderItem);
      cancelReason.setCancelDefinition(cancelDefinition);
      cancelReason.setCancelStatus(cancelStatus);

      // 6. 저장
      cancelReasonRepository.save(cancelReason);
    }
  }

  /**
   * 주문 상태 목록을 조회하는 메서드.
   * 모든 OrderStatus 엔티티를 조회한 후, OrderStatusDto 리스트로 매핑하여 반환합니다.
   *
   * @return 주문 상태 정보를 포함하는 Map 객체
   */
  @Transactional(readOnly = true)
  @Override
  public Map<String, Object> getOrderStatusList() {
    // 1. 모든 주문 상태(OrderStatus) 엔티티를 조회합니다.
    List<OrderStatus> findOrderStatusList = orderStatusRepository.findAll();

    // 2. 조회된 엔티티를 OrderStatusDto로 변환합니다.
    List<OrderStatusDto> orderStatusList = findOrderStatusList.stream()
        .map(orderStatus -> modelMapper.map(orderStatus, OrderStatusDto.class))
        .toList();

    // 3. 변환된 주문 상태 리스트를 Map 형태로 반환합니다.
    return Map.of("orderStatusList", orderStatusList);
  }

  /**
   * 전체 주문 목록을 페이징 처리하여 조회하는 메서드.
   *
   * @param  pageable 페이징 정보를 담은 객체
   * 
   * @return          주문 목록, 페이지 번호 리스트, 페이징 정보를 포함하는 Map 객체
   */
  @Transactional(readOnly = true)
  @Override
  public Map<String, Object> getOrderList(Pageable pageable) {
    // 1. 전체 주문 건수를 기준으로 PageDto를 업데이트합니다.
    pageDto.setPaging(
        pageable.getPageNumber(), pageable.getPageSize(), (int) orderRepository.count()
    );
    // 2. 음수 페이지 방지를 위해 페이지 번호를 조정합니다.
    pageable = pageable.withPage(pageable.getPageNumber() - 1);
    // 3. Pageable 객체를 이용하여 주문 목록을 조회합니다.
    Page<Order> orderList = orderRepository.findAll(pageable);

    // 4. 조회된 주문 엔티티를 OrderDto로 매핑하고, 각 주문의 주문 항목 리스트를 순회하며 취소 사유 리스트도 함께 DTO로 변환합니다.
    List<OrderDto> orderDtoList = orderList.stream()
        .map(order -> {
          OrderDto orderDto = modelMapper.map(order, OrderDto.class);

          // 주문 항목 리스트를 순회하며, 각 항목의 취소 사유 목록을 DTO로 변환
          List<OrderItemDto> orderItemsDtoList = order.getOrderItems()
              .stream()
              .map(orderItem -> {
                OrderItemDto  orderItemDto        = modelMapper.map(orderItem, OrderItemDto.class);
                List<CancelReasonDto> cancelReasonDtoList = orderItem.getCancelReason()
                    .stream()
                    .map(cancelReason -> modelMapper.map(cancelReason, CancelReasonDto.class))
                    .collect(Collectors.toList());
                orderItemDto.setCancelReasons(cancelReasonDtoList);
                return orderItemDto;
              })
              .collect(Collectors.toList());
          orderDto.setOrderItems(orderItemsDtoList);
          return orderDto;
        }).collect(Collectors.toList());

    // 5. 현재 페이지부터 마지막 페이지까지의 페이지 번호 리스트를 생성합니다.
    List<Integer> pageList = IntStream.rangeClosed(pageDto.getBeginPage(), pageDto.getEndPage())
        .boxed()
        .collect(Collectors.toList());

    // 6. 주문 목록, 페이지 번호 리스트, 페이징 정보를 Map에 담아 반환합니다.
    return Map.of("orderList", orderDtoList, "pageList", pageList, "pageDto", pageDto);
  }

  /**
   * 특정 주문의 상세 정보를 조회하는 메서드.
   * orderId를 기준으로 주문 정보를 조회하고, 해당 주문 항목 및 취소 사유를 DTO로 매핑하여 반환합니다.
   *
   * @param  orderId                  조회할 주문의 식별자
   * 
   * @return                          주문 상세 정보를 담은 OrderDto 객체
   * 
   * @throws IllegalArgumentException 주문이 존재하지 않을 경우 예외 발생
   */
  @Transactional(readOnly = true)
  @Override
  public OrderDto getOrderDetail(Integer orderId) {
    // 1. orderId를 기준으로 주문 엔티티를 조회합니다.
    Order findOrder = orderRepository.findById(orderId)
        .orElseThrow(IllegalArgumentException::new);
    // 2. 조회된 주문 엔티티를 DTO로 변환합니다.
    OrderDto orderDto = modelMapper.map(findOrder, OrderDto.class);

    // 3. 주문 항목 리스트를 순회하며, 각 항목에 대해 취소 사유 리스트도 함께 DTO로 변환합니다.
    List<OrderItemDto> orderItemsDtoList = findOrder.getOrderItems()
        .stream()
        .map(orderItem -> {
          OrderItemDto orderItemDto = modelMapper.map(orderItem, OrderItemDto.class);

          List<CancelReasonDto> cancelReasonDtoList = orderItem.getCancelReason()
              .stream()
              .map(cancelReason -> modelMapper.map(cancelReason, CancelReasonDto.class))
              .collect(Collectors.toList());

          // 변환된 취소 사유 리스트를 주문 항목 DTO에 설정
          orderItemDto.setCancelReasons(cancelReasonDtoList);
          return orderItemDto;
        })
        .collect(Collectors.toList());

    // 4. 주문 항목 DTO 리스트를 주문 DTO에 설정 후 반환합니다.
    orderDto.setOrderItems(orderItemsDtoList);
    return orderDto;
  }

  /**
   * 주문 항목의 주문 상태를 수정하는 메서드.
   * 전달받은 OrderDto 내의 주문 항목(OrderItem)의 주문 상태(OrderStatus)를 업데이트합니다.
   *
   * @param  orderDto                 수정할 주문 정보를 담은 DTO 객체
   * 
   * @return                          수정된 주문 정보를 담은 OrderDto 객체
   * 
   * @throws IllegalArgumentException 해당 주문 또는 주문 항목이 존재하지 않을 경우 예외 발생
   */
  @Override
  public OrderDto modifyByOrderId(OrderDto orderDto) {
    // 1. 수정할 주문의 첫 번째 주문 항목의 orderId를 기준으로, 해당 주문 항목 리스트를 조회합니다.
    // (주문 내 모든 주문 항목의 orderId는 동일하므로 첫 번째 항목의 orderId를 사용)
    List<OrderItem> orderItem = orderItemRepository
        .findByOrder_OrderId(orderDto.getOrderItems().get(0).getOrder().getOrderId())
        .orElseThrow(IllegalArgumentException::new);

    // 2. 전달받은 주문 DTO 내의 각 주문 항목에 대해 주문 상태(OrderStatus)를 업데이트합니다.
    for (int i = 0, size = orderDto.getOrderItems().size(); i < size; i++) {
      orderItem.get(i).setOrderStatus(
          OrderStatus.builder()
              .orderStatusId(orderDto.getOrderItems().get(i).getOrderStatus().getOrderStatusId())
              .build()
      );
    }

    // 3. 전체 주문 정보를 조회하여, 수정된 주문 상태를 반영한 후 DTO로 매핑하여 반환합니다.
    Order findOrder = orderRepository.findById(orderDto.getOrderId())
        .orElseThrow(IllegalArgumentException::new);

    return modelMapper.map(findOrder, OrderDto.class);
  }

  @Override
  public CancelReasonDto modifyCancelReason(CancelReasonDto cancelReasonDto) {
    // 1. 취소 사유 ID를 기준으로 취소 사유 엔티티를 조회합니다.
    CancelReason findCancelReason =
        cancelReasonRepository.findById(cancelReasonDto.getCancelReasonId())
            .orElseThrow(IllegalArgumentException::new);

    // 2. 전달받은 DTO로부터 엔티티의 필드를 업데이트합니다.
    // findCancelReason.setCancelDefinition(cancelReasonDto.getCancelDefinition());

    // ※ cancelStatus는 연관 엔티티이므로, DTO에 담긴 cancelStatus가 올바른 관리 상태(managed state)여야 합니다.
    CancelStatus newCancelStatus = cancelReasonDto.getCancelStatus();
    // 필요하다면, 새 cancelStatus 엔티티가 영속성 컨텍스트에 존재하는지 확인 후 할당할 수 있습니다.
    findCancelReason.setCancelStatus(newCancelStatus);

    return modelMapper.map(findCancelReason, CancelReasonDto.class);
  }

  //@formatter:off
  /**
   * (6) 주문 취소 수정 요청 API  
   * 프론트엔드에서 수정된 취소 요청 정보를 CancelReasonDto 형태로 전달받아 처리합니다.
   * 예시 payload:
        {
          "order": {orderId": 4}
          "orderItem": {
            "orderItemId": 4,
            "orderStatus": {
              "orderStatusId": 1,
              "statusName": "결제완료"
            }
          },
          "cancelReason": {
            "cancelReasonId": 7,
            "cancelDefinition": {
              "cancelDefinitionId": 1,
              "cancelReasonDefinition": "취소요청"
            },
            "quantity": 1,
            "returnReason": "관리자 답변을 여기에",
            "cancelStatus": {
              "cancelStatusId": 2,
              "statusName": "취소요청"
            }
          }
        }
   */  
  //@formatter:on
  @Override
  public Integer modifyOrderCancelStatus(Map<String, Object> payload) {
    // 1. payload에서 "order", "orderItem", "cancelReason" 파트를 추출합니다.
    Object orderPart        = payload.get("order");
    Object orderItemPart    = payload.get("orderItem");
    Object cancelReasonPart = payload.get("cancelReason");

    // 2. order와 orderItem DTO로 변환 (반드시 제공되어야 합니다)
    OrderDto     orderDto     = objectMapper.convertValue(orderPart, OrderDto.class);
    OrderItemDto orderItemDto = objectMapper.convertValue(orderItemPart, OrderItemDto.class);

    // 3. 주문(Order)과 주문 항목(OrderItem) 영속 엔티티 조회
    Order     orderEntity     = orderRepository.findById(orderDto.getOrderId())
        .orElseThrow(() -> new IllegalArgumentException("해당 주문이 존재하지 않습니다."));
    OrderItem orderItemEntity = orderItemRepository.findById(orderItemDto.getOrderItemId())
        .orElseThrow(() -> new IllegalArgumentException("해당 주문상품이 존재하지 않습니다."));

    // 3-1. 프론트엔드에서 전달된 orderItem.orderStatus 정보를 반영하여 업데이트
    if (orderItemDto.getOrderStatus() != null) {
      OrderStatus updatedStatus = modelMapper.map(orderItemDto.getOrderStatus(), OrderStatus.class);
      orderItemEntity.setOrderStatus(updatedStatus);
    }

    // 4. cancelReason 파트가 존재하는 경우와 그렇지 않은 경우 분기 처리
    if (cancelReasonPart != null) {
      // 전달받은 JSON 구조에 따라 cancelReason 안에 cancelDefinition 객체가 포함되어 있음
      CancelReasonDto cancelReasonDto =
          objectMapper.convertValue(cancelReasonPart, CancelReasonDto.class);

      // cancelStatus가 전달되지 않았다면 단순히 주문 항목만 업데이트
      if (cancelReasonDto.getCancelStatus() == null ||
          cancelReasonDto.getCancelStatus().getCancelStatusId() == null) {
        if (orderItemDto.getQuantity() != null) {
          orderItemEntity.setQuantity(orderItemDto.getQuantity());
        }
      }
      else {
        // 취소 상태 엔티티 조회
        CancelStatus cancelStatus = cancelStatusRepository.findById(
            cancelReasonDto.getCancelStatus().getCancelStatusId()
        )
            .orElseThrow(() -> new IllegalArgumentException("유효한 취소 상태가 존재하지 않습니다."));
        // "취소완료" 여부 확인
        boolean isCancelComplete = "취소완료".equals(cancelStatus.getStatusName());

        // (A) cancelReasonId가 존재하면 기존 취소 요청 업데이트
        if (cancelReasonDto.getCancelReasonId() != null) {
          CancelReason existingCancelReason =
              cancelReasonRepository.findById(cancelReasonDto.getCancelReasonId())
                  .orElseThrow(() -> new IllegalArgumentException("해당 취소요청이 존재하지 않습니다."));
          // DTO의 기본 필드 매핑 (연관관계 필드는 별도 처리)
          modelMapper.map(cancelReasonDto, existingCancelReason);
          // 주문 항목과의 연관관계 설정
          existingCancelReason.setOrderItem(orderItemEntity);

          // cancelDefinition 처리: DTO 내 cancelDefinition 객체의 식별자를 이용해 persistent 객체 조회
          if (cancelReasonDto.getCancelDefinition() != null &&
              cancelReasonDto.getCancelDefinition().getCancelDefinitionId() != null) {
            CancelDefinition persistentCancelDefinition = cancelDefinitionRepository.findById(
                cancelReasonDto.getCancelDefinition().getCancelDefinitionId()
            )
                .orElseThrow(() -> new IllegalArgumentException("유효한 취소 사유 정의가 존재하지 않습니다."));
            existingCancelReason.setCancelDefinition(persistentCancelDefinition);
          }
          else {
            existingCancelReason.setCancelDefinition(null);
          }
          // 취소 상태 세팅
          existingCancelReason.setCancelStatus(cancelStatus);

          // "취소완료" 상태인 경우에만 결제 취소 및 금액 업데이트 진행
          if (isCancelComplete) {
            if (orderItemEntity.getQuantity() < cancelReasonDto.getQuantity()) {
              throw new IllegalArgumentException("주문 항목 수량이 취소 요청 수량보다 작습니다.");
            }
            int reduction = orderItemEntity.getPrice() * cancelReasonDto.getQuantity();
            // 1대1 매핑된 Pay 엔티티 조회 (order와 연결)
            Pay payEntity = payRepository.findByOrderOrderId(orderEntity.getOrderId())
                .orElseThrow(() -> new IllegalArgumentException("결제 정보가 존재하지 않습니다."));
            // 결제 취소 호출: 결제 취소가 먼저 수행되어야 함 (동기 처리 위해 block() 사용)
            paymentServiceImpl.cancelPayment(
                payEntity.getImpUid(),
                cancelReasonDto.getCancelDefinition().getCancelReasonDefinition(),
                (long) reduction
            ).block();
            // 결제 취소 성공 후 업데이트 진행
            orderItemEntity
                .setQuantity(orderItemEntity.getQuantity() - cancelReasonDto.getQuantity());
            orderEntity.setTotalPrice(orderEntity.getTotalPrice() - reduction);
            payEntity.setAmount(payEntity.getAmount() - reduction);
            payRepository.save(payEntity);
          }
          else {
            // "취소완료"가 아닌 경우, 주문 항목은 orderItemDto 기준으로 업데이트 (필요 시)
            if (orderItemDto.getQuantity() != null) {
              orderItemEntity.setQuantity(orderItemDto.getQuantity());
            }
          }
          cancelReasonRepository.save(existingCancelReason);

          // (B) cancelReasonId가 없으면 신규 인서트
        }
        else {
          CancelReason newCancelReason = modelMapper.map(cancelReasonDto, CancelReason.class);
          newCancelReason.setOrderItem(orderItemEntity);
          if (cancelReasonDto.getCancelDefinition() != null &&
              cancelReasonDto.getCancelDefinition().getCancelDefinitionId() != null) {
            CancelDefinition persistentCancelDefinition = cancelDefinitionRepository.findById(
                cancelReasonDto.getCancelDefinition().getCancelDefinitionId()
            )
                .orElseThrow(() -> new IllegalArgumentException("유효한 취소 사유 정의가 존재하지 않습니다."));
            newCancelReason.setCancelDefinition(persistentCancelDefinition);
          }
          newCancelReason.setCancelStatus(cancelStatus);
          if (isCancelComplete) {
            if (orderItemEntity.getQuantity() < cancelReasonDto.getQuantity()) {
              throw new IllegalArgumentException("주문 항목 수량이 취소 요청 수량보다 작습니다.");
            }
            int reduction = orderItemEntity.getPrice() * cancelReasonDto.getQuantity();
            Pay payEntity = payRepository.findByOrderOrderId(orderEntity.getOrderId())
                .orElseThrow(() -> new IllegalArgumentException("결제 정보가 존재하지 않습니다."));
            paymentServiceImpl.cancelPayment(
                payEntity.getImpUid(),
                cancelReasonDto.getCancelDefinition().getCancelReasonDefinition(),
                (long) reduction
            ).block();
            orderItemEntity
                .setQuantity(orderItemEntity.getQuantity() - cancelReasonDto.getQuantity());
            orderEntity.setTotalPrice(orderEntity.getTotalPrice() - reduction);
            payEntity.setAmount(payEntity.getAmount() - reduction);
            payRepository.save(payEntity);
          }
          else {
            if (orderItemDto.getQuantity() != null) {
              orderItemEntity.setQuantity(orderItemDto.getQuantity());
            }
          }
          cancelReasonRepository.save(newCancelReason);
        }
      }
    }
    else {
      // (C) cancelReason 정보가 전혀 없는 경우: 주문 항목만 orderItemDto 기준으로 업데이트
      if (orderItemDto.getQuantity() != null) {
        orderItemEntity.setQuantity(orderItemDto.getQuantity());
      }
    }

    // 5. 변경된 주문 항목과 주문 엔티티 저장
    orderItemRepository.save(orderItemEntity);
    orderRepository.save(orderEntity);

    return orderEntity.getOrderId();
  }

}
