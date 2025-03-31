package com.bookjuk.admin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookjuk.admin.domain.AdminProductAttach;


public interface AdminProductAttatchRepository extends JpaRepository<AdminProductAttach, Integer>{

  List<AdminProductAttach> findByProductId(Integer productId);
  void deleteByProductId(Integer productId);
 
  
}
