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
public class CancelDefinitionDto {
    // 취소 정의 고유 ID
    private Integer cancelDefinitionId;
    // 취소 사유 이름 (예: 고객 변심, 재고 부족 등)
    private String cancelReasonDefinition;
}
