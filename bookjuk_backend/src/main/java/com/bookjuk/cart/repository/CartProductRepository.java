package com.bookjuk.cart.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.bookjuk.cart.domain.Product;

public interface CartProductRepository extends JpaRepository<Product, Integer> {
  
 
}
