package com.bookjuk.product.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.bookjuk.model.message.ResponseMessage;
import com.bookjuk.product.dto.LikeDto;
import com.bookjuk.product.service.LikeService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@Tag(name = "좋아요", description = "좋아요 기능 API")
public class LikeController {

	private final LikeService likeService;
	
	// 특정 유저 좋아요 조회
	@Operation(summary = "좋아요 목록 조회", description = "특정 유저가 좋아요 한 상품 목록 확인")
	@GetMapping(value="/user/wish/{userId}", produces = "application/json")
	public ResponseMessage getLikeByUserId(@PathVariable("userId") Integer userId) {
		return ResponseMessage.builder()
				.status(200)
				.message("찜 목록 조회 성공")
				.results(Map.of("like", likeService.findLikeByUserId(userId)))
				.build();
	}
	
	
	// 좋아요 상품 추가하기
	@Operation(summary = "좋아요 상품 추가", description = "특정 유저가 상품 좋아요 추가했을 때 호출되는 API")
	@PostMapping(value = "/user/wish/add", produces = "application/json")
  public ResponseMessage add(@RequestBody Map<String, Object> map) {

		System.out.println("===controller===");
		System.out.println(map);
		
    try {
    	
      // 유저 체크하기
  	  if(map.get("userId") == null) {
  	  	return ResponseMessage.builder()
  	  					.status(400)
  	  					.message("유효하지 않은 사용자 정보")
  	  					.results(null)
  	  					.build();
  	  }
  	  
  	  // 상품 체크하기
  	  if (map.get("productId") == null) {
  	  	return ResponseMessage.builder()
  	  					.status(400)
  	  					.message("유효하지 않은 상품 정보")
  	  					.results(null)
  	  					.build();
  	  }
  	
  	  // 서비스에서 찜 목록에 상품 추가 Map<String, Object>으로 요청했기 때문에, (Integer)를 넣어준다.
      LikeDto newItem = likeService.insertLike((Integer) map.get("userId"), (Integer) map.get("productId"));
      
      // 성공 응답 반환
      return ResponseMessage.builder()
              .status(200)
              .message("찜 아이템 추가 성공")
              .results(Map.of("likeItem", newItem))
              .build();

    } catch (Exception e) {
    	
        // 예외 발생 시 에러 응답 반환
        return ResponseMessage.builder()
                .status(500)
                .message("찜 아이템 추가 실패: " + e.getMessage())
                .results(null)
                .build();
    }
    
	}
	
	
	// 좋아요 상품 삭제하기
	@Operation(summary = "좋아요 취소", description = "좋아요 한 상품을 취소 할때 호출하는 API")
	@DeleteMapping(value="/user/wish/{likeId}", produces = "application/json")
	public ResponseEntity<ResponseMessage> remove(@PathVariable(name = "likeId") Integer likeId) {
		
		try {
			 likeService.deleteLike(likeId);
			
		return ResponseEntity.ok(
				ResponseMessage.builder()
			 .status(200)
			 .message("좋아요 취소 성공")
			 .results(null)
			 .build()
	  );
		} catch (IllegalArgumentException e) {
			
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
						ResponseMessage.builder()
						.status(404)
						.message("좋아요 기록을 찾을 수 없습니다.")
						.results(null)
						.build()
			);	
	} catch (Exception e) {
		e.printStackTrace();
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
				ResponseMessage.builder()
				.status(500)
				.message("좋아요 취소 중 서버 오류 발생")
				.results(null)
				.build()
	   );
		}
	}	
}