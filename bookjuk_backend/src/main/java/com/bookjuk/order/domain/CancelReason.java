package com.bookjuk.order.domain;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
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
@Entity(name = "cancelReason")
@Table(name = "tbl_cancel_reason")
public class CancelReason {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cancel_reason_id")
    private Integer cancelReasonId;

    // 취소정의와 다대일 관계
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "cancel_definition_id", nullable = false, updatable = false)
    private CancelDefinition cancelDefinition;

    // 주문상세와 다대일 관계
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "order_item_id", nullable = false)
    @JsonIgnore
    private OrderItem orderItem;
    
    // 취소 신청 상품 수량
    @Column(name = "quantity")
    private int quantity;

    // 취소 사유에 대한 상세 설명
    @Column(name = "cancel_reason")
    private String cancelReason;

    // 거부, 반려에 대한 상세 설명(판매자 답변)
    @Column(name = "return_reason")
    private String returnReason;
    
    // 취소상태(취소요청, 취소승인, 취소거절, 환불완료)
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "cancel_Status_id", nullable = false)
    private CancelStatus cancelStatus;
    
    @CreationTimestamp
    @Column(name = "create_dt", updatable = false)
    private LocalDateTime createDt;

    @UpdateTimestamp
    @Column(name = "modify_dt")
    private LocalDateTime modifyDt;
}