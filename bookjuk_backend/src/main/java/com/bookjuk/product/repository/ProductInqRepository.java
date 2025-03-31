package com.bookjuk.product.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bookjuk.product.domain.ProductInq;

public interface ProductInqRepository extends JpaRepository<ProductInq, Integer>{
	
	// 상품 id 별 문의글 조회하기
	@Query("SELECT pi FROM productInq pi " + 
				 "JOIN FETCH pi.product p " +
			     "JOIN FETCH pi.user u " +
				 "WHERE p.productId = :productId")
	List<ProductInq> findByProduct_ProductId(@Param("productId") Integer productId);
}
