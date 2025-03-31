package com.bookjuk.admin.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.bookjuk.admin.domain.Product;

public interface AdminProductRepository extends JpaRepository<Product, Integer> {

  
}
