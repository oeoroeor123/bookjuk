package com.bookjuk.cart.domain;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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

@Entity(name = "cartItem")
@Table(name = "tbl_cart_item")
public class CartItem {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)   // AUTO_INCREMENT
  @Column(name = "cart_item_id")
  private Integer cartItemId;

  // Cart 와의 관계
//  @ManyToOne(fetch = FetchType.LAZY)
//  @JoinColumn(name = "cart_id", nullable = false)
//  @ToString.Exclude
//  private Cart cart;
  
  @Column(name="cart_id")
  private Integer cartId;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "product_id", nullable = false)
  private Product product; // productId 대신 Product 객체로 참조

  // 장바구니에 담긴 상품 개수
  @Column(name = "product_quantity", nullable = false)
  private Integer productQuantity;

  @CreationTimestamp
  @Column(name = "cart_item_created_dt", updatable = false)
  private LocalDateTime cartItemCreatedDt;

  @UpdateTimestamp
  @Column(name = "cart_item_updated_dt")
  private LocalDateTime cartItemUpdatedDt;

}