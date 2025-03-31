package com.bookjuk.product.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bookjuk.product.domain.ProductReview;

public interface ProductReviewRepository extends JpaRepository<ProductReview, Integer> {
	
	// 상품 id 별 문의글 조회하기
	@Query("SELECT pr FROM productReview pr " + 
				 "JOIN FETCH pr.product p " +
			   "JOIN FETCH pr.user u " +
				 "WHERE p.productId = :productId")
	List<ProductReview> findByProductReview_ProductId(@Param("productId") Integer productId);

}
