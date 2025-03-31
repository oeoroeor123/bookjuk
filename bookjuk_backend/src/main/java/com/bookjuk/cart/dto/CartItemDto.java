package com.bookjuk.cart.dto;

import java.time.LocalDateTime;
import com.bookjuk.cart.domain.Product;
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
public class CartItemDto {
  
  private Integer cartItemId;
//  private Cart cart;    // Cart와 연결 (cart_id)
  private Integer cartId;
  private Product product;
  private Integer productQuantity;
  private LocalDateTime cartItemCreatedDt;
  private LocalDateTime cartItemUpdatedDt;
  
}