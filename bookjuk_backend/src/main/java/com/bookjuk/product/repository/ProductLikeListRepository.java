package com.bookjuk.product.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bookjuk.product.domain.Product;
import com.bookjuk.product.dto.ProductLikeCountDto;

public interface ProductLikeListRepository extends JpaRepository<Product, Integer>{
	
  /*
   * 인기 상품
   * 좋아요 기준 내림차순 정렬
   * count : 각 상품의 좋아요 수 계산 후 내림차순 처리 (pageable > limit과 다름)
  */
	@Query("SELECT new com.bookjuk.product.dto.ProductLikeCountDto( " +
      "p.productId, p.productName, p.description, p.productPrice, p.publicationDate, p.productImage, COUNT(l.likeId), " +
      "g.genreName, a.authorName, pub.publisherName) " +
      "FROM like l " +
      "JOIN l.product p " +
      "LEFT JOIN p.genre g " +
      "LEFT JOIN p.author a " +
      "LEFT JOIN p.publisher pub " +
      "WHERE p.salesYn = 'Y' " +
      "AND (:genreId IS NULL OR g.genreId = :genreId) " +
      "GROUP BY p.productId, p.productName, p.description, p.productPrice, p.publicationDate, p.productImage, " +
      "g.genreName, a.authorName, pub.publisherName " +
      "ORDER BY COUNT(l.likeId) DESC")
	Page<ProductLikeCountDto> findProductLikeListByLikeCountDesc(
			@Param("genreId") Integer genreId,
			Pageable pageable);

}

