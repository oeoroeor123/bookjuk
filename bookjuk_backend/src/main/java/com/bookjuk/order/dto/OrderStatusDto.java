package com.bookjuk.order.dto;

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
public class OrderStatusDto {
    // 주문 상태 고유 ID
    private Integer orderStatusId;
    // 주문 진행 상태 (예: 결제완료, 배송완료, 취소접수 등)
    private String statusName;
}
