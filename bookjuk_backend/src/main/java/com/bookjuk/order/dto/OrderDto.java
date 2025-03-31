package com.bookjuk.order.dto;

import java.time.LocalDateTime;
import java.util.List;
import com.bookjuk.order.domain.DeliAddr;
import com.bookjuk.order.domain.OrderItem;
import com.bookjuk.order.domain.Pay;
import com.bookjuk.order.domain.Review;
import com.bookjuk.order.domain.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class OrderDto {
    // 주문 고유 식별자
    private Integer orderId;
    // 주문한 사용자(회원) ID
    private User user;
    // 배송지 고유 ID (tbl_delivery_address와 연계)
    private DeliAddr deliAddr;
    // 주문 총 금액
    private Integer totalPrice;
    // 주문 생성 날짜
    private LocalDateTime createDt;
    // 주문 상태 변경 날짜
    private LocalDateTime modifyDt;
    // 주문에에 담긴 item 목록
    // 필요에 따라 CartItemDto로 변환해서 사용 가능
    private List<OrderItemDto> orderItems;

}
