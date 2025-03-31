package com.bookjuk.admin.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookjuk.admin.domain.ProductRequest;

public interface AdminProductRequestRepository extends JpaRepository<ProductRequest, Integer>{

}
