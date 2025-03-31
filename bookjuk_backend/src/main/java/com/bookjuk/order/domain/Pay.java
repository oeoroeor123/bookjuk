package com.bookjuk.order.domain;

import java.time.LocalDateTime;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Payment 엔티티는 결제 정보를 DB에 저장하기 위한 JPA 엔티티입니다.
 * 결제 완료 시 주문(Order)과 연계하여 결제 상태 및 관련 정보를 기록합니다.
 */
@Entity(name = "orderPayment")
@Table(name = "tbl_pay")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Pay {

  // 결제 정보 고유 ID (Primary Key, 자동 생성)
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "pay_id")
  private Integer payId;

  // 연계된 주문 ID (연관관계를 직접 매핑할 수도 있음)
  @Column(name = "order_id")
  private Integer orderId;
  //
  // // 결제한 회원 ID
  // private Integer userId;

  // 아임포트 결제 식별 ID
  @Column(name = "imp_uid")
  private String impUid;

  // 실제 결제 금액
  @Column(name = "amount")
  private Integer amount;

  // 결제 상태 (예: "결제완료", "결제취소", "결제실패" 등)
  @Column(name = "pay_status")
  private String payStatus;

  // 결제 발생 날짜 (생성 시각)
  @Column(name = "create_dt", columnDefinition = "DATETIME DEFAULT NOW()", insertable = false)
  private LocalDateTime createDt;

  // 결제 상태 변경 날짜 (업데이트 시각)
  @Column(name = "modify_dt")
  private LocalDateTime modifyDt;

}
