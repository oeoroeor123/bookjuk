package com.bookjuk.product.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bookjuk.product.domain.Product;


public interface ProductListRepository extends JpaRepository<Product, Integer>{  
  /*
   * 최신 상품
   * 발매일 기준 내림차순 정렬
   * 발매일(시작~끝) 필터링
   * 장르 별 필터링
   */
	@Query("SELECT p FROM product p "
	     + "WHERE (:startDate IS NULL OR p.publicationDate >= :startDate) "
	     + "AND (:endDate IS NULL OR p.publicationDate <= :endDate) "
	     + "AND (:genreId IS NULL OR p.genre.id = :genreId) "
	     + "AND p.salesYn = 'y'")
//	     + "ORDER BY p.publicationDate DESC")
	Page<Product> findNewProducts (
	    @Param("startDate") LocalDate startDate,
	    @Param("endDate") LocalDate endDate,
	    @Param("genreId") Integer genreId,
	    Pageable pageable);
	
	//도서 검색 구현
	@Query("SELECT p FROM product p "
	        + "WHERE (p.productName LIKE %:query% "
	        + "OR p.genre.genreName LIKE %:query% "
	        + "OR p.author.authorName LIKE %:query% "
	        + "OR p.publisher.publisherName LIKE %:query%) "
	        + "AND p.salesYn = 'Y'")
	List<Product> findProductsBySearch(@Param("query") String query);
	
}



