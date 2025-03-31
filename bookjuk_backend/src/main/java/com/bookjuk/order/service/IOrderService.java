package com.bookjuk.order.service;

import java.util.List;
import java.util.Map;
import org.springframework.data.domain.Pageable;
import com.bookjuk.order.dto.CancelDefinitionDto;
import com.bookjuk.order.dto.CancelReasonDto;
import com.bookjuk.order.dto.CancelStatusDto;
import com.bookjuk.order.dto.OrderDto;

public interface IOrderService {

  // (1) 특정 orderId의 주문상세 조회
  OrderDto findOrderId(Integer orderId);

  // (2) 특정 userId의 주문리스트 조회
  Map<String, Object> findOrderByUserId(Integer userId, Pageable pageable);

  // (3) 주문 추가
  OrderDto insertOrder(Integer userId, OrderDto orderDto);

  // (4) 취소정의 조회
  List<CancelDefinitionDto> getAllCancelDefinitions();
  
  // (4) 취소상태 조회
  List<CancelStatusDto> getAllCancelStatus();
  
  
  // (5) 주문 취소 요청 처리 (CancelReasonDto 리스트를 받아 처리)
  void processCancelRequests(List<CancelReasonDto> cancelReasonDtoList);
  
  // 취소요청 수정 처리
  CancelReasonDto modifyCancelReason(CancelReasonDto cancelReasonDto);  
  
  // (6) 주문 취소 상태 수정 처리 (메서드명 변경)
  Integer modifyOrderCancelStatus(Map<String, Object> payload);
  
  /**
   * 주문 상태 목록 조회
   * 
   * @return
   */
  Map<String, Object> getOrderStatusList();

  /**
   * 주문 목록 조회
   * 
   * @param  pageable
   * 
   * @return
   */
  Map<String, Object> getOrderList(Pageable pageable);

  /**
   * 주문 상세
   * 
   * @param  orderId
   * 
   * @return
   */
  OrderDto getOrderDetail(Integer orderId);

  /**
   * 주문 상태 변경
   * 
   * @param  orderDto
   * 
   * @return
   */
  OrderDto modifyByOrderId(OrderDto orderDto);
  
  
}
