package com.bookjuk.order.domain;

import java.time.LocalDateTime;
import java.util.List;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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
@Entity(name = "order")
@Table(name = "tbl_order")
public class Order {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "order_id")
  private Integer orderId;

  // 회원과 다대일 관계 (한 회원이 여러 주문을 할 수 있음)
  // 결제 정보와 n:1 관계 (Payment 테이블의 order_id를 참조)
  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "user_id", nullable = false)
  private User user;

  // 배송지 정보와 일대일 관계
  // 결제 정보와 1:1 관계 (tbl_delivery_address 테이블의 addr_id를 참조)
  @OneToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "addr_id", nullable = true)
  private DeliAddr deliAddr;

  @Column(name = "total_price")
  private Integer totalPrice;

  @CreationTimestamp
  @Column(name = "create_dt", updatable = false)
  private LocalDateTime createDt;

  @UpdateTimestamp
  @Column(name = "modify_dt")
  private LocalDateTime modifyDt;

  /**
   * 주문 내의 orderItem 목록
   * - mappedBy="order" (OrderItem에서 order 필드로 매핑)
   * - cascade 설정은 예시로 추가 (order와 OrderItem을 함께 관리하고 싶을 때)
   */
  // 주문에 속한 주문상세 목록
  @OneToMany(mappedBy = "order", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
//  @JsonIgnore
  private List<OrderItem> orderItems;

}
