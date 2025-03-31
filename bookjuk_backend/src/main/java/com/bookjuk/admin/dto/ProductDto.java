package com.bookjuk.admin.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
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
public class ProductDto {

  private Integer   productId;    
  private String    productName;
  private String    productImage;
  private String    description;
  private Integer   productPrice;
  private Integer   stock;
  private LocalDateTime createDt;
  private LocalDate publicationDate;
  private int       totalPages;
  private Character salesYn;

  private AdminUserDto user;

  // Genre, Author, Publisher 관련 추가
  private GenreDto     genre;
  private AuthorDto    author;
  private PublisherDto publisher;

  // 첨부 파일 리스트 추가
  private List<AttatchDto> attachList;

}
