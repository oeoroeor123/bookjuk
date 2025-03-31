package com.bookjuk.cart.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.bookjuk.cart.domain.CartItem;
import com.bookjuk.cart.domain.Product;


public interface CartItemRepository extends JpaRepository<CartItem, Integer>{
  
  Optional<CartItem> findByCartIdAndProduct(Integer cartId, Product product);


}
