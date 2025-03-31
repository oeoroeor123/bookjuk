package com.bookjuk.product.service.impl;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.bookjuk.product.domain.Genre;
import com.bookjuk.product.domain.Product;
import com.bookjuk.product.domain.Search;
import com.bookjuk.product.repository.GenreListRepository;
import com.bookjuk.product.repository.ProductListRepository;
import com.bookjuk.product.repository.SearchListRepository;
import com.bookjuk.product.service.SearchService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SearchServiceImpl implements SearchService {
	
	private final SearchListRepository searchListRepository;
	private final ProductListRepository productListRepository;
	private final GenreListRepository genreListRepository;
	
	// 최근 검색 리스트 조회 (유저별)
	@Override
	public List<Search> findRecentSearches(Integer userId) {
		return searchListRepository.findRecentSearchesByUser(userId);
	}
	
	// 최근 검색어 추가
	@Override
	public void insertRecentSearches(Integer userId, String search) {
		Optional<Search> existingSearchOptional = searchListRepository.findBySearch(search);
		
		// 기존에 검색어가 존재하면 검색 카운트 1 증가
		if(existingSearchOptional.isPresent()) {
			Search existingSearch = existingSearchOptional.get();
			existingSearch.setSearchCount(existingSearch.getSearchCount() + 1);
			searchListRepository.save(existingSearch); // 업데이트
		} else {
			Search newSearch = Search.builder()
					.search(search)
					.searchCount(1)
					.searchDt(LocalDateTime.now())
					.userId(userId)
					.build();
			searchListRepository.save(newSearch);
		}		
	}

	// 인기 검색 리스트 조회
	@Override
	public List<Search> findPopularSearches() {
		return searchListRepository.findPopularSearchBySearch();
	}
	
	// 통합 검색
	@Override
	public Map<String, Object> performUnifiedSearch(String query) {
		return Map.of("products", productListRepository.findProductsBySearch(query));  // 상품 검색 결과
	}

}
