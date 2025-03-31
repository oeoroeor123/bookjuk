package com.bookjuk.product.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ProductLikeCountDto {
	
	/*    jpql 쿼리문에서 처리해 데이터를 가지고 오려면,
	*  1. select에서 참조하는 ProductLikeCountDto에 필드를 추가한다.
	*  2. ProductLikeListRepository > SELECT 절에 추가한 필드를 기입한다.
	*  3. ProductLikeListRepository > GROUP BY 절에 추가한 필드를 기입한다.
	*/ 
	
	private Integer productId;
	private String productName;
  private String description;
  private Integer productPrice;
  private LocalDate publicationDate;
  private String productImage;
  
  private Long likeCount;
	
  private String genreName;  
  private String authorName;  
  private String publisherName;

}
