package com.bookjuk.product.service;

import java.util.List;
import java.util.Map;

import com.bookjuk.product.domain.Search;

public interface SearchService {
	
	// 최근 검색 리스트 조회 (유저별)
	List<Search> findRecentSearches(Integer userId);
	
	// 최근 검색어 추가
	void insertRecentSearches(Integer userId, String search);
	
	// 인기 검색 리스트 조회
	List<Search> findPopularSearches();
	
	// 통합 검색
	Map<String, Object> performUnifiedSearch(String query);
	
	

}
