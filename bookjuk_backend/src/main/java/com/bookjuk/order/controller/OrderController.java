package com.bookjuk.order.controller;

import java.util.List;
import java.util.Map;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.bookjuk.model.message.ResponseMessage;
import com.bookjuk.order.dto.CancelDefinitionDto;
import com.bookjuk.order.dto.CancelReasonDto;
import com.bookjuk.order.dto.CancelStatusDto;
import com.bookjuk.order.dto.OrderDto;
import com.bookjuk.order.dto.OrderItemDto;
import com.bookjuk.order.service.IOrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@Tag(name = "주문", description = "주문 API")
public class OrderController {
  
  private final IOrderService orderService;


  /**
   * (1) 상세 주문(orderId) 조회 API
   * 특정 주문 ID에 해당하는 주문 상세 정보를 조회합니다.
   */
  @Operation(summary = "상세주문 조회", description = "상세 주문 내역을 조회하는 기능입니다.")
  @GetMapping(value = "/order/detail/{orderId}", produces = "application/json")
  public ResponseMessage getOrderByOrderId(@PathVariable("orderId") Integer orderId) {
    OrderDto orderDto = orderService.findOrderId(orderId);
    return ResponseMessage.builder()
        .status(200)
        .message("order 조회 성공")
        .results(Map.of("order", orderDto))
        .build();
  }
  
  /**
   * (2) 특정 사용자(userId) 주문내역 조회 API
   * 사용자 ID에 해당하는 모든 주문 내역을 조회합니다.
   * 경로 충돌을 방지하기 위해 별도의 URI(/order/myOrder/{userId})로 설정합니다.
   */
  @Operation(summary = "사용자 주문내역 조회", description = "특정 사용자 ID에 해당하는 모든 주문 내역과 페이징 정보를 조회하는 기능입니다.")
  @GetMapping(value = "/order/myOrder/{userId}", produces = "application/json")
  public ResponseMessage getOrderByUserId(@PathVariable("userId") Integer userId, Pageable pageable) {
    Map<String, Object> result = orderService.findOrderByUserId(userId, pageable);
    return ResponseMessage.builder()
        .status(200)
        .message("orderList 조회 성공")
        .results(result)
        .build();
  }

  /**
   * 전체 취소 정의 조회 API
   * 모든 취소 사유 정보를 조회하여 응답합니다.
   */
  @Operation(summary = "전체 취소 정의 조회", description = "전체 취소 정의 정보를 조회하는 기능입니다.")
  @GetMapping(value = "/order/cancelDefinitions", produces = "application/json")
  public ResponseMessage getAllCancelDefinitions() {
      // 인스턴스를 통해 메서드를 호출합니다.
      List<CancelDefinitionDto> cancelDefinitions = orderService.getAllCancelDefinitions();
      return ResponseMessage.builder()
          .status(200)
          .message("취소 정의 조회 성공")
          .results(Map.of("cancelDefinitions", cancelDefinitions))
          .build();
  }

  /**
   * 전체 취소 상태카테고리 조회 API
   * 모든 취소 상태카테고리 정보를 조회하여 응답합니다.
   */
  @Operation(summary = "전체 취소 상태카테고리 조회", description = "전체 취소 상태카테고리 정보를 조회하는 기능입니다.")
  @GetMapping(value = "/order/CancelStatus", produces = "application/json")
  public ResponseMessage getAllCancelStatus() {
      // 인스턴스를 통해 메서드를 호출합니다.
      List<CancelStatusDto> cancelStatus = orderService.getAllCancelStatus();
      return ResponseMessage.builder()
          .status(200)
          .message("취소 상태카테고리 조회 성공")
          .results(Map.of("cancelStatus", cancelStatus))
          .build();
  }
  
  /**
   * (5) 주문 취소 요청 처리 API  
   * 프론트엔드에서 CancelReasonDto에 관한 리스트를 전달받아,  
   * 한 번에 여러 주문 항목의 취소 요청을 처리합니다.
   */
  @Operation(summary = "주문 취소 요청", description = "여러 주문 항목에 대해 취소 요청을 처리하는 기능입니다. 프론트엔드에서는 CancelReasonDto 리스트로 한 번에 여러 건의 취소 요청이 전달됩니다.")
  @PostMapping(value = "/order/cancel", produces = "application/json")
  public ResponseMessage cancelOrderRequests(@RequestBody List<CancelReasonDto> cancelReasonDtoList) {
      orderService.processCancelRequests(cancelReasonDtoList);
      return ResponseMessage.builder()
              .status(200)
              .message("주문 취소 요청이 성공적으로 처리되었습니다.")
              .build();
  }
  
  /**
   * (6) 주문 취소 수정 요청 처리 API  
   * 프론트엔드에서 CancelReasonDto에 관한 리스트를 전달받아,  
   * 한 번에 여러 주문 항목의 취소 요청을 처리합니다.
   */
  @Operation(summary = "주문취소 수정 요청", description = "주문 항목에 대해 취소요청 수정을 처리하는 기능입니다.")
  @PutMapping(value = "/order/modifyCancelReason", produces = "application/json")
  public ResponseMessage modifyCancelReason(@RequestBody CancelReasonDto cancelReasonDto) {
      CancelReasonDto modifiedCancelReason = orderService.modifyCancelReason(cancelReasonDto);
      return ResponseMessage.builder()
          .status(200)
          .message("주문 취소 수정이 성공적으로 처리되었습니다.")
          .results(Map.of("CancelReason", modifiedCancelReason))
          .build();
  }

  
  
}
