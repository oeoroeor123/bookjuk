package com.bookjuk.product.service;

import java.util.List;

import com.bookjuk.product.dto.LikeDto;

public interface LikeService {
	
	// 특정 유저 찜 목록 조회
	List<LikeDto> findLikeByUserId(Integer userId);
	
	// 찜 목록 아이템 추가
	LikeDto insertLike(Integer userId, Integer productId);
	
	// 찜 목록 아이템 삭제
	void deleteLike(Integer likeId);
	
}
