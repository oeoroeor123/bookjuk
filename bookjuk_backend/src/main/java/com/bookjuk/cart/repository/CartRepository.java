package com.bookjuk.cart.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookjuk.cart.domain.Cart;


public interface CartRepository extends JpaRepository<Cart, Integer>{
  
  // 유저 아이디로 장바구니 검색
  Optional<Cart> findByUserUserId(Integer userId);
//
//  // 해당 유저가 이미 Cart를 가지고 있는지 체크
//  boolean existsByUserId(Integer userId);
}

