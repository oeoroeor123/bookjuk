package com.bookjuk.product.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bookjuk.product.domain.Like;
import com.bookjuk.product.domain.ListUser;
import com.bookjuk.product.domain.Product;
import com.bookjuk.product.dto.LikeDto;
import com.bookjuk.product.dto.ListUserDto;
import com.bookjuk.product.dto.ProductDto;
import com.bookjuk.product.repository.LikeListRepository;
import com.bookjuk.product.repository.ProductListRepository;
import com.bookjuk.product.service.LikeService;

// import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class LikeServiceImpl implements LikeService {
	
	private final LikeListRepository likeListRepository;
	private final ProductListRepository productListRepository;
	private final ModelMapper modelMapper;
	
	@Override
	@Transactional(readOnly=true)
	public List<LikeDto> findLikeByUserId(Integer userId) {
		
		// userId에 해당하는 찜 목록 조회
    List<Like> likeList = likeListRepository.findByUser_UserId(userId);
    
    return likeList.stream()
                   .map(like -> modelMapper.map(like, LikeDto.class))
                   // Collectors. : map(like) 스트림 아이템들의 평균 값을 구하고 리스트로 만든다.
                   .collect(Collectors.toList());
}
	
	@Override
	public LikeDto insertLike(Integer userId, Integer productId) {
	    
		// 0. 유저 검증 (검증을 위해 userRepository를 따로 만들어 짜거나, 넘어간다.)
		// Like likeUser = likeListRepository.findByUser_UserId(userId)
		//	.orElseThrow(() -> new IllegalArgumentException("존재하지 않는 userId 입니다."));
		
		// 0. 상품 검증
		Product product = productListRepository.findById(productId)
				.orElseThrow(() -> new IllegalArgumentException("존재하지 않는 productId 입니다."));

		// 1. 내가 찜한 제품인지 확인 (userId, productId 모두 조회)
		Optional<Like> like = likeListRepository.findByUser_UserIdAndProduct_productId(userId, productId);
	  
    // 2. 찜한적 없는 상품이면 테이블에 저장 (insert)
	  if (!like.isPresent()) {
	  
	  	Like newLike = new Like();
	  	newLike.setUser(ListUser.builder().userId(userId).build());
	  	newLike.setProduct(product);
	  	
	    // 2-1. 찜 목록 저장(save)
	    likeListRepository.save(newLike);

	    // 찜 목록 추가 성공 시, LikeDto 반환
	    return LikeDto.builder()
          // .likeId(like.getLikeId()) : likeId는 넘기는 값이 아님
          .user(ListUserDto.builder().userId(userId).build())
          .product(ProductDto.builder().productId(productId).build())
          .build();
	    
	  }
	  // 3. 이미 찜했던 상품이면 해당 내역 테이블에서 삭제 (delete)
	  else {
	  	like.ifPresent(l -> likeListRepository.delete(l)); // Optional이 존재하면 삭제
      return null; // 찜 목록 삭제 후 null 반환 (적절한 반환값 설계 필요)
	  }	    
	}
	
	// 찜 상품 삭제 
	@Override
	public void deleteLike(Integer likeId) {
		Optional<Like> likeOptional = likeListRepository.findById(likeId);
		
		if(likeOptional.isPresent()) {
			likeListRepository.delete(likeOptional.get());
		}
	}

}
