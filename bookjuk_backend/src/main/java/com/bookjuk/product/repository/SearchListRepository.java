package com.bookjuk.product.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bookjuk.product.domain.Search;

public interface SearchListRepository extends JpaRepository<Search, Integer>{

	// 유저 별 최근 검색어 조회
	@Query("SELECT s FROM search s WHERE s.userId = :userId ORDER BY s.searchDt DESC")
	List<Search> findRecentSearchesByUser(@Param("userId") Integer userId);
	
	// 최근 검색어 추가
	Optional<Search> findBySearch(String search);
	
	// 검색어 별 검색 수량 (인기 검색어) 조회
	@Query("SELECT s FROM search s ORDER BY s.searchCount DESC")
	List<Search> findPopularSearchBySearch();

}
