package com.bookjuk.product.controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bookjuk.model.message.ResponseMessage;
import com.bookjuk.product.dto.SearchDto;
import com.bookjuk.product.service.SearchService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@Tag(name = "검색", description = "검색 API")
public class SearchController {

	private final SearchService searchService;
	
  // 최근 검색 리스트 조회 (유저별)
	@Operation(summary = "최신 검색 리스트 조회", description = "최신 검색 리스트 조회")
	@GetMapping(value = "/search/recent/{userId}", produces = "application/json")
	public ResponseEntity<ResponseMessage> recentList(@PathVariable(name = "userId", required = true) Integer userId) {
		
		if(userId == null) {
			throw new IllegalArgumentException("userId가 null입니다.");
		}
		
		// 검색 결과 조회
		var recentSearches = searchService.findRecentSearches(userId);

		// HashMap을 사용해 다양한 결과 저장
		Map<String, Object> resultMap = new HashMap<>();
		resultMap.put("recentSearches", recentSearches);
		
		return ResponseEntity.ok(
						ResponseMessage.builder()
						.status(200)
						.message("최근 검색어 조회 성공")
						.results(resultMap)
						.build()
				    );
	}
	
	// 인기 검색 리스트 조회
	@Operation(summary = "인기 검색 리스트 조회", description = "인기 검색 리스트 조회")
	@GetMapping(value="/search/popular", produces = "application/json")
	public ResponseEntity<ResponseMessage> popularList() {
		
		var popularSearches = searchService.findPopularSearches();
		
		Map<String, Object> resultMap2 = new HashMap<>();
		resultMap2.put("popularSearches",popularSearches);
		
		return ResponseEntity.ok(
				ResponseMessage.builder()
							.status(200)
							.message("인기 검색어 조회 성공")
							.results(resultMap2)
							.build()
							);
	}
	
	
	// 최근 검색어 추가
	@Operation(summary = "최근 검색어 추가", description = "최근 검색어 추가")
	@PostMapping(value = "/search/addrecent", produces = "application/json")
	public ResponseEntity<ResponseMessage> saveRecentSearch(@RequestBody SearchDto searchDto) {
		
		String search = searchDto.getSearch();
		Integer userId = searchDto.getUserId();
		
    // 입력 값 검증
    if (search == null || search.isEmpty()) {
      return ResponseEntity.status(400).body(
        ResponseMessage.builder()
          .status(400)
          .message("유효하지 않은 입력 값")
          .build()
      );
    }

    try {

      // 검색어 저장
  	  if (userId != null && userId > 0) {
  	  	searchService.insertRecentSearches(userId, search);	    
  	  	
  	  	// 검색어를 상품 / 장르에서 전체적으로 조회
  	  	Map<String, Object> searchResults = searchService.performUnifiedSearch(search);
  	  	
  	  	return ResponseEntity.ok(
  	  			ResponseMessage.builder()
  	  			.status(200)
  	  			.message("최근 검색어 저장 성공")
  	  			.results(searchResults)
  	  			.build()
  	  			);
  	  } else {
  	  	return ResponseEntity.ok(
  	  			ResponseMessage.builder()
  	  			.status(200)
  	  			.message("사용자 정보 없음 : 최근 검색어 저장 실패")
  	  			.build()
  	  			);
  	  }
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(500).body(
        ResponseMessage.builder()
          .status(500)
          .message("서버 내부 오류: 최근 검색어 저장 실패")
          .build()
      );
    }
	}
	
	
	// 검색 결과 조회
	@Operation(summary = "검색 결과 조회", description = "검색 결과 조회")
	@GetMapping(value = "/search/results", produces = "application/json")
	public ResponseEntity<ResponseMessage> searchResults(@RequestParam String query) {
		
		System.out.println("---------------------파라미터 query---------------------------");
		System.out.println(query);
	   
		// 입력 값 검증
	   if (query == null || query.isEmpty()) {
	       return ResponseEntity.status(400).body(
	           ResponseMessage.builder()
	               .status(400)
	               .message("유효하지 않은 입력 값")
	               .build()
	       );
	   }
	
	   try {
	       // 검색어에 대한 통합 검색 수행
	       Map<String, Object> searchResults = searchService.performUnifiedSearch(query);
	       System.out.println("----------------검색결과--------------------");
	       System.out.println(searchResults);
	 
	       return ResponseEntity.ok(
	           ResponseMessage.builder()
	               .status(200)
	               .message("검색 결과 조회 성공")
	               .results(Map.of("products", searchResults.get("products")))
	               .build()
	       );
	   } catch (Exception e) {
	       e.printStackTrace();
	       return ResponseEntity.status(500).body(
	           ResponseMessage.builder()
	               .status(500)
	               .message("서버 내부 오류: 검색 결과 조회 실패")
	               .build()
	       );
	   }
	}

}
