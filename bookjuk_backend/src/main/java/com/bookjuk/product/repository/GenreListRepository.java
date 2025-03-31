package com.bookjuk.product.repository;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.bookjuk.product.domain.Genre;

public interface GenreListRepository extends JpaRepository<Genre, Integer> {
	
	// 도서 검색 구현
	@Query("SELECT g FROM product_genre g WHERE g.genreName LIKE %:search%")
	List<Genre> findGenreBySearch(@Param("search") String search);
	
}
