package com.bookjuk.cart.service;

import com.bookjuk.cart.dto.CartDto;
import com.bookjuk.cart.dto.CartItemDto;

public interface ICartService {
  
  // (1) 특정 userId의 장바구니 조회
  CartDto findCartByUserId(Integer userId);

  // (2) 장바구니 아이템 추가
  CartItemDto insertCartItem(Integer userId, CartItemDto cartItemDto);

  // (3) 장바구니 아이템 수정 (수량 변경)
  CartItemDto updateCartItem(CartItemDto cartItemDto);

  // (4) 장바구니 아이템 삭제
  void deleteCartItem(Integer cartItemId);

  
}
