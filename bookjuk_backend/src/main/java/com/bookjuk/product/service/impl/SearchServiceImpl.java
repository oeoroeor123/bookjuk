package com.bookjuk.product.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.stereotype.Service;

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

    if (existingSearchOptional.isPresent()) {
      Search existingSearch = existingSearchOptional.get();
      existingSearch.setSearchCount(existingSearch.getSearchCount() + 1);
      searchListRepository.save(existingSearch);
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
    return Map.of("products", productListRepository.findProductsBySearch(query));
  }

}
