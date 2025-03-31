package com.bookjuk.admin.controller;

import java.util.Map;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.bookjuk.admin.service.AdminService;
import com.bookjuk.model.message.ResponseMessage;
import com.bookjuk.order.dto.CancelReasonDto;
import com.bookjuk.order.dto.OrderDto;
import com.bookjuk.order.dto.OrderItemDto;
import com.bookjuk.order.service.IOrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@Tag(name = "관리자", description = "관리자 메뉴 API")
@RequiredArgsConstructor
@RestController
public class AdminOrderController {

  private final IOrderService orderService;

  @Operation(summary = "주문 목록", description = "주문 목록을 조회하는 기능힙니다.")
  @GetMapping(value = "/admin/order", produces = "application/json")
  public ResponseMessage getOrderList(Pageable pageable) {
    return ResponseMessage.builder()
        .status(200)
        .message("주문 리스트 조회 성공")
        .results(orderService.getOrderList(pageable))
        .build();
  }

  @Operation(summary = "주문 상세", description = "주문 상세를 조회하는 기능힙니다.")
  @GetMapping(value = "/admin/order/{orderId}", produces = "application/json")
  public ResponseMessage getOrderDetail(@PathVariable(name = "orderId") Integer orderId) {
    return ResponseMessage.builder()
        .status(200)
        .message("주문 상세 조회 성공")
        .results(Map.of("order", orderService.getOrderDetail(orderId)))
        .build();
  }

  @Operation(summary = "주문 상품 상태 변경", description = "주문 상품의 상태를 변경하는 기능힙니다.")
  @PutMapping(value = "/admin/order/{orderId}", produces = "application/json")
  public ResponseMessage modifyOrderStatus(
      @PathVariable(name = "orderId") Integer orderId,
      @RequestBody OrderDto orderDto
  ) {
    return ResponseMessage.builder()
        .status(200)
        .message("주문 상품 상태 변경 성공")
        .results(Map.of("order", orderService.modifyByOrderId(orderDto)))
        .build();
  }

  // -----------------------------------------------------------------------------
  //@formatter:off
  /**
   * (6) 주문 취소 수정 요청 API  
   * 프론트엔드에서 수정된 취소 요청 정보를 CancelReasonDto 형태로 전달받아 처리합니다.
   * 예시 payload:
          {
            "orderId": 4,
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
  @Operation(summary = "주문 취소 상태 수정 요청", description = "주문 항목의 취소 상태를 수정하는 기능입니다.")
  @PutMapping(value = "/admin/order/orderItem", produces = "application/json")
  public ResponseMessage modifyOrderCancelStatus(
      @RequestBody Map<String, Object> payload
  ) {

      // (4) 결과 반환
      return ResponseMessage.builder()
              .status(200)
              .message("주문 취소 상태 수정 성공")
              .results(Map.of("orderId", orderService.modifyOrderCancelStatus(payload)))
              .build();
  }


}
