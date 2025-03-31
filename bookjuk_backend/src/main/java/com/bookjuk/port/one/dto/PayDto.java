package com.bookjuk.port.one.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import java.time.LocalDateTime;
import com.bookjuk.order.domain.Order;

/**
 * PaymentDto는 결제와 관련된 정보를 클라이언트와의 데이터 교환 및 DB 저장용으로 사용합니다.
 * 필요한 정보(결제 고유 ID, 주문 ID, 회원 ID, 아임포트 식별자, 주문별 식별자, 결제 금액, 결제 상태, 생성 및 수정 일시)를 포함합니다.
 * 필요에 따라 필드를 추가하거나 수정할 수 있습니다.
 */
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class PayDto {
    // 결제 정보 고유 ID (DB PK, 자동생성 시 null로 입력받고 저장 후 채워짐)
    private Integer payId;
    // 연계된 주문 ID
    private Order order;
    // 아임포트 결제 식별 ID (아임포트와 연동 시 전달되는 값)
    private String impUid;
    // 실제 결제 금액
    private Integer amount;
    // 결제 상태 (예: "결제완료", "결제취소" 등)
    private String payStatus;
    // 결제 발생 날짜 (DB에 저장 시 생성 시간 기록)
    private LocalDateTime createDt;
    // 결제 상태 변경 날짜 (상태 업데이트 시 기록)
    private LocalDateTime modifyDt;
}
