package com.bookjuk.order.dto;

import java.time.LocalDateTime;
import com.bookjuk.order.domain.CancelDefinition;
import com.bookjuk.order.domain.CancelStatus;
import com.bookjuk.order.domain.OrderItem;
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
public class CancelReasonDto {
    // 취소 사유 고유 ID
    private Integer cancelReasonId;
    // 취소 정의 고유 ID (tbl_cancel_definition과 연계)
    private CancelDefinition cancelDefinition;
    // 취소 요청이 발생한 주문 상세 항목 ID
    private OrderItem orderItem;
    // 취소 요청 상품 수량
    private Integer quantity;
    // 취소 사유 상세 설명
    private String cancelReason;
    // 거부, 반려에 대한 상세 설명
    private String returnReason;
    // 취소상태 (요청, 승인, 거절, 환불완료)
    private CancelStatus cancelStatus;
    // 취소 신청 일시
    private LocalDateTime createDt;
    // 취소 수정 일시 (취소완료, 취소거부 등)
    private LocalDateTime modifyDt;
}
