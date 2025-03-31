package com.bookjuk.cart.controller;

import java.util.Map;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.bookjuk.cart.dto.CartDto;
import com.bookjuk.cart.dto.CartItemDto;
import com.bookjuk.cart.service.ICartService;
import com.bookjuk.model.message.ResponseMessage;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@Tag(name = "장바구니", description = "장바구니 API")
public class CartController {

  private final ICartService cartService;

  /**
   * (1) 특정 userId의 장바구니 조회
   */
  @Operation(summary = "회원 장바구니 조회", description = "특정 userId의 장바구니 조회")
  @GetMapping(value = "/cart/user/{userId}", produces = "application/json")
  public ResponseMessage getCartByUserId(@PathVariable("userId") Integer userId) {
    CartDto cartDto = cartService.findCartByUserId(userId);
    return ResponseMessage.builder()
        .status(200)
        .message("장바구니 조회 성공")
        .results(Map.of("cart", cartDto))
        .build();
  }

  /**
   * (2) 장바구니 아이템 추가
   * 
      {
        "cartId": 1,
        "product": {
          "productId": 3
        },
        "productQuantity": 5
      }
   */
  @Operation(summary = "장바구니 아이템 추가", description = "장바구니 아이템 추가")
  @PostMapping(value = "/cart/cartItems", produces = "application/json")
  public ResponseMessage addCartItem(
          @RequestBody CartItemDto cartItemDto,
          @RequestParam("userId") Integer userId) {
      
      CartItemDto newItem = cartService.insertCartItem(userId, cartItemDto);
      
      return ResponseMessage.builder()
          .status(200)
          .message("장바구니 아이템 추가 성공")
          .results(Map.of("cartItem", newItem))
          .build();
  }

//  @PostMapping(value = "/cartItems", produces = "application/json")
//  public ResponseMessage addCartItem(@RequestBody CartItemDto cartItemDto) {
//    CartItemDto newItem = cartService.insertCartItem(cartItemDto);
//    return ResponseMessage.builder()
//        .status(200)
//        .message("장바구니 아이템 추가 성공")
//        .results(Map.of("cartItem", newItem))
//        .build();
//  }

  /**
   * (3) 장바구니 아이템 수정(수량 변경 등)
   */
  @Operation(summary = "장바구니 아이템 수정", description = "장바구니 아이템 수정 (수량 변경 등)")
  @PutMapping(value = "/cart/cartItems/{cartItemId}", produces = "application/json")
  public ResponseMessage updateCartItem(
      @PathVariable("cartItemId") Integer cartItemId,
      @RequestBody CartItemDto cartItemDto
  ) {
    cartItemDto.setCartItemId(cartItemId);
    CartItemDto updatedItem = cartService.updateCartItem(cartItemDto);

    return ResponseMessage.builder()
        .status(200)
        .message("장바구니 아이템 수정 성공")
        .results(Map.of("cartItem", updatedItem))
        .build();
  }

  /**
   * (4) 장바구니 아이템 삭제
   */
  @Operation(summary = "장바구니 아이템 삭제", description = "장바구니 아이템 삭제")
  @DeleteMapping(value = "/cart/cartItems/{cartItemId}", produces = "application/json")
  public ResponseMessage deleteCartItem(@PathVariable("cartItemId") Integer cartItemId) {
    cartService.deleteCartItem(cartItemId);
    return ResponseMessage.builder()
        .status(200)
        .message("장바구니 아이템 삭제 성공")
        .build();
  }

}
