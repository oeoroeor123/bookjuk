package com.bookjuk.order.domain;

import java.time.LocalDateTime;
import java.util.List;
import org.hibernate.annotations.UpdateTimestamp;
import com.bookjuk.cart.domain.User;
import com.bookjuk.order.dto.CancelReasonDto;
import com.fasterxml.jackson.annotation.JsonBackReference;
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

/**
 * 주문 상세 항목(OrderItem) 엔티티 클래스
 * 각 주문 항목에 대한 정보를 저장하는 역할을 합니다.
 */
@NoArgsConstructor  // 기본 생성자 자동 생성
@AllArgsConstructor // 모든 필드를 포함한 생성자 자동 생성
@Getter             // getter 자동 생성
@Setter             // setter 자동 생성
@Builder            // 빌더 패턴 지원
@ToString           // toString 메서드 자동 생성
@Entity(name = "orderItem") // JPA 엔티티 지정
@Table(name = "tbl_order_item") // 매핑할 테이블명 지정
public class OrderItem {

  /**
   * 주문 상세 항목의 고유 식별자 (PK)
   */
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY) // 자동 증가 전략 (MySQL 기준 IDENTITY)
  @Column(name = "order_item_id")
  private Integer orderItemId;

  /**
   * 주문 (Order)과 다대일(ManyToOne) 관계
   * 하나의 주문(Order)은 여러 개의 주문 상세(OrderItem)를 가질 수 있음.
   */
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "order_id", nullable = false)
  @JsonIgnore
  private Order order;
  
  /**
   * 상품 (Product)과 다대일(ManyToOne) 관계
   * 하나의 상품(Product)은 여러 주문 상세(OrderItem)에 포함될 수 있음.
   */
  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "product_id", nullable = true)
  private Product product;

  /**
   * 주문 상태 (OrderStatus)
   * 주문 상세(OrderItem)의 현재 진행 상태를 저장함.
   */
  @OneToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "order_status_id", nullable = true)
  private OrderStatus orderStatus;

  /**
   * 주문한 상품의 개수
   */
  @Column(name = "quantity")
  private Integer quantity;

  /**
   * 개별 상품 가격 (단가)
   */
  @Column(name = "price")
  private Integer price;

  /**
   * 주문 상세 수정 날짜
   * UpdateTimestamp 어노테이션을 사용하여 자동으로 최신 수정 날짜를 갱신함.
   */
  @UpdateTimestamp
  @Column(name = "modify_dt")
  private LocalDateTime modifyDt;
  
  
  /**
   * 구매후기
   */
  @OneToOne(mappedBy = "orderItem", fetch = FetchType.EAGER)
  @JsonIgnore
  private Review review;
  
//  /**
//   * 취소사유(취소신청)
//   */
//  @OneToOne(mappedBy = "orderItem", fetch = FetchType.EAGER, cascade = CascadeType.ALL)  //CascadeType.ALL은 모든 종류의 영속성 전이를 포함하는 설정이다. 부모 엔티티의 생명주기가 자식 엔티티에도 그대로 적용된다.
//  @JsonIgnore
//  private CancelReason cancelReason;
  
  /**
   * 취소사유(취소신청)
   */
  @OneToMany(mappedBy = "orderItem", fetch = FetchType.EAGER, cascade = CascadeType.ALL)  //CascadeType.ALL은 모든 종류의 영속성 전이를 포함하는 설정이다. 부모 엔티티의 생명주기가 자식 엔티티에도 그대로 적용된다.
  @JsonIgnore
  private List<CancelReason> cancelReason;
}
