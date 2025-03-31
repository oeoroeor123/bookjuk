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
public class CancelStatusDto {
    // 주문 상태 고유 ID
    private Integer cancelStatusId;
    // 주문 진행 상태 (예: 취소완료, 취소거부, 취소요청 등)
    private String statusName;
}
