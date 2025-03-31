package com.bookjuk.cart.service.impl;

import java.util.List;
import java.util.stream.Collectors;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.bookjuk.cart.domain.Cart;
import com.bookjuk.cart.domain.CartItem;
import com.bookjuk.cart.domain.Product;
import com.bookjuk.cart.dto.CartDto;
import com.bookjuk.cart.dto.CartItemDto;
import com.bookjuk.cart.repository.CartItemRepository;
import com.bookjuk.cart.repository.CartProductRepository;
import com.bookjuk.cart.repository.CartRepository;
import com.bookjuk.cart.service.ICartService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class CartServiceImpl implements ICartService {

  private final CartRepository        cartRepository;
  private final CartProductRepository productRepository;
  private final CartItemRepository    cartItemRepository;
  private final ModelMapper           modelMapper;

  @Override
  @Transactional(readOnly = true)
  public CartDto findCartByUserId(Integer userId) {

    // userId를 기반으로 Cart 엔티티를 조회
    // 만약 해당 userId의 장바구니가 존재하지 않으면 예외 발생
    Cart cart = cartRepository.findByUserUserId(userId)
        .orElseThrow(() -> new IllegalArgumentException("해당 userId의 장바구니가 존재하지 않습니다."));

    // Cart -> CartDto 변환
    CartDto cartDto = modelMapper.map(cart, CartDto.class);

    // Cart 엔티티 내의 cartItems 리스트를 개별적으로 매핑하여 CartItemDto 리스트로 변환
    List<CartItemDto> cartItemDtoList = cart.getCartItems()
        .stream()
        .map(cartItem -> modelMapper.map(cartItem, CartItemDto.class))
        .collect(Collectors.toList());

    cartDto.setCartItems(cartItemDtoList);
    return cartDto;
  }

  /**
   * (2) 장바구니 아이템 추가
   */
  @Override
  public CartItemDto insertCartItem(Integer userId, CartItemDto cartItemDto) {

    // (1) 유저의 장바구니가 존재하는지 확인
    Cart cart = cartRepository.findByUserUserId(userId)
        .orElseThrow(() -> new IllegalArgumentException("해당 userId의 장바구니가 존재하지 않습니다."));

    // (2) productId 검증
    Product product = productRepository.findById(cartItemDto.getProduct().getProductId())
        .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 productId입니다."));

    // (3) 동일한 상품이 이미 장바구니에 있는지 확인
    CartItem existingCartItem = cartItemRepository.findByCartIdAndProduct(cart.getCartId(), product)
        .orElse(null);

    if (existingCartItem != null) {
      // 기존 상품이 있으면 수량 증가
      int updatedQuantity =
          existingCartItem.getProductQuantity() + cartItemDto.getProductQuantity();

      // (4) 재고 제한 확인
      if (updatedQuantity > product.getStock()) {
        throw new IllegalArgumentException("선택하신 상품의 재고가 부족하여 장바구니 추가가 어렵습니다.");
      }

      existingCartItem.setProductQuantity(updatedQuantity);
      return modelMapper.map(existingCartItem, CartItemDto.class);
    }
    else {
      // (5) 새로운 장바구니 아이템 생성
      CartItem cartItem = CartItem.builder()
          .cartId(cart.getCartId())
          .product(product)
          .productQuantity(cartItemDto.getProductQuantity())
          .build();

      cartItemRepository.save(cartItem);
      return modelMapper.map(cartItem, CartItemDto.class);
    }
  }

  // /**
  // * (2) 장바구니 아이템 추가
  // */
  // @Override
  // public CartItemDto insertCartItem(CartItemDto cartItemDto) {
  //
  // // productId 검증
  // Product product = productRepository.findById(cartItemDto.getProduct().getProductId())
  // .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 productId입니다."));
  //
  // // 저장할 cartItem 엔티티 생성
  // CartItem cartItem = CartItem.builder()
  // .cartId(cartItemDto.getCartId())
  // .product(product)
  // .productQuantity(cartItemDto.getProductQuantity())
  // .build();
  //
  // cartItemRepository.save(cartItem);
  // // entity -> dto 변환
  // return modelMapper.map(cartItem, CartItemDto.class);
  // }

  /**
   * (3) 장바구니 아이템 수정(수량 변경)
   */
  @Override
  public CartItemDto updateCartItem(CartItemDto cartItemDto) {
    // 1. 기존의 장바구니 아이템 조회
    CartItem cartItem = cartItemRepository.findById(cartItemDto.getCartItemId())
        .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 cartItemId입니다."));

    // 2. 해당 아이템의 상품 정보와 현재 재고 확인
    Product product     = cartItem.getProduct();
    int     newQuantity = cartItemDto.getProductQuantity();

    // 3. 재고 확인: 변경하려는 수량이 상품의 재고보다 많으면 예외 발생
    if (newQuantity > product.getStock()) {
      throw new IllegalArgumentException("선택하신 상품의 재고가 부족하여 최대 " + product.getStock() + "개 주문가능합니다.");
    }

    // 4. 수량 변경 (기타 필요한 필드 업데이트 가능)
    cartItem.setProductQuantity(newQuantity);

    // 5. 변경된 아이템을 DTO로 변환하여 반환 (영속성 컨텍스트에 의해 자동 업데이트됨)
    return modelMapper.map(cartItem, CartItemDto.class);
  }

  /**
   * (4) 장바구니 아이템 삭제
   */
  @Override
  public void deleteCartItem(Integer cartItemId) {
    CartItem cartItem = cartItemRepository.findById(cartItemId)
        .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 cartItemId입니다."));
    cartItemRepository.delete(cartItem);
  }

}
