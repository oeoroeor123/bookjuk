package com.bookjuk.admin.dto;

import java.time.LocalDate;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class ProductRequestDto {
  
  private Integer productId;
  private String productName;          // 상품 이름
  private String productImage;         // 상품 이미지
  private String description;          // 상품 설명
  private Integer productPrice;        // 상품 가격
  private Integer stock;               // 재고
  private int totalPages;              // 총 페이지 수
  private LocalDate publicationDate;   // 출판일
  private LocalDate createDt;
  
  private Character salesYn;           // 판매 여부
  
  private Integer genreId;             // 장르 ID

  private AuthorDto    author;
  private PublisherDto publisher;

  
  // private List<AttatchRequestDto> attatchList; // 첨부 파일 리스트

}
