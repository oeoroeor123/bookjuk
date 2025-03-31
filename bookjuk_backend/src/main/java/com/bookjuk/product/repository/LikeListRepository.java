package com.bookjuk.product.repository;

import java.util.	List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookjuk.product.domain.Like;

public interface LikeListRepository extends JpaRepository<Like, Integer> {

	/*
	 	findBy → 데이터를 조회하는 JPA 메서드
		User_UserId → Like 엔티티 내부에서 User 엔티티의 UserId 값을 기준으로 조회
		Product_ProductId → Like 엔티티 내부에서 Product 엔티티의 productId 값을 기준으로 조회
		findByUser_UserIdAndProduct_productId → Like 엔티티 내부에서 User 엔티티, Product 엔티티의 각 Id 값을 기준으로 조회
		userId → 찾고 싶은 사용자의 ID
	 */


	// 한 유저가 여러개의 찜 상품을 가질 수 있음 
	List<Like> findByUser_UserId(Integer userId);
	
	// 한 상품을 찜한 특정 사용자들을 확인함, 상품에 대한 찜 목록을 관리하기 위해 사용
	List<Like> findByProduct_productId(Integer productId);
	
	// 특정 유저가 찜한 상품을 확인함, 찜 목록 추가/삭제 로직을 위해 사용
	Optional<Like> findByUser_UserIdAndProduct_productId(Integer userId, Integer productId);

}
