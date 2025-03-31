package com.bookjuk.order.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import java.time.LocalDateTime;
import java.util.List;
import com.bookjuk.order.domain.CancelReason;
import com.bookjuk.order.domain.CancelStatus;
import com.bookjuk.order.domain.Order;
import com.bookjuk.order.domain.OrderStatus;
import com.bookjuk.order.domain.Product;
import com.bookjuk.order.domain.Review;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class OrderItemDto {
    // 주문 상세 항목 고유 ID
    private Integer orderItemId;
    // 연계된 주문 ID
    private Order order;
    // 주문한 상품의 ID
    private Product product;
    // 주문 상태 고유 ID (tbl_order_status와 연계)
    private OrderStatus orderStatus;
    // 주문한 상품 개수
    private Integer quantity;
    // 개별 상품 가격
    private Integer price;
    // 주문 상세 수정 날짜
    private LocalDateTime modifyDt;
    // 구매후기
    private Review review;
    // 취소여부
    private List<CancelReasonDto> cancelReasons;    
}
