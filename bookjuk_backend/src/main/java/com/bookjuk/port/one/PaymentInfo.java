package com.bookjuk.port.one;

public record PaymentInfo(
    int cartItemId
  , int productId
  , int quantity
  , int price
  , int total
  , int userId
  , int shippingAddressId
  , String paymentId
    ) {}
