package com.bookjuk.cart.dto;

import java.time.LocalDateTime;
import java.util.List;
import com.bookjuk.cart.domain.User;
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
public class CartDto {
  
  private Integer cartId;
  private User user;
//  private Integer userId;
  private LocalDateTime cartCreatedDt;
  private LocalDateTime cartUpdatedDt;

  // 장바구니에 담긴 item 목록
  // 필요에 따라 CartItemDto로 변환해서 사용 가능
  private List<CartItemDto> cartItems;

}