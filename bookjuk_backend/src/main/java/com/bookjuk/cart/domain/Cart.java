package com.bookjuk.cart.domain;

import java.time.LocalDateTime;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString

@Entity(name = "cart")
@Table(name = "tbl_cart")
public class Cart {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)  // AUTO_INCREMENT
  @Column(name = "cart_id")
  private Integer cartId;

  @OneToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "user_id", nullable = false)
  @ToString.Exclude
  private User user;

  // 장바구니 생성일
  @CreationTimestamp
  @Column(name = "cart_created_dt", updatable = false)
  private LocalDateTime cartCreatedDt;

  // 장바구니 수정일
  @UpdateTimestamp
  @Column(name = "cart_updated_dt")
  private LocalDateTime cartUpdatedDt;

  /**
   * 장바구니 내의 cartItem 목록
   * - mappedBy="cart" (CartItem에서 cart 필드로 매핑)
   * - cascade 설정은 예시로 추가 (cart와 cartItem을 함께 관리하고 싶을 때)
   */
  @OneToMany(mappedBy = "cartId", fetch = FetchType.EAGER, cascade = CascadeType.ALL)  //CascadeType.ALL은 모든 종류의 영속성 전이를 포함하는 설정이다. 부모 엔티티의 생명주기가 자식 엔티티에도 그대로 적용된다.

  @ToString.Exclude
  private List<CartItem> cartItems;
}