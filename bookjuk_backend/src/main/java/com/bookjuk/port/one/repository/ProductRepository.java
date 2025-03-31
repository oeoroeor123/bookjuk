package com.bookjuk.port.one.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.bookjuk.port.one.domain.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {
}
