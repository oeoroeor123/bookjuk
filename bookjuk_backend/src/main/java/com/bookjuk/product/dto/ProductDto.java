package com.bookjuk.product.dto;

import java.time.LocalDate;

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

  private Integer productId;
  private String productName;
  private String description;
  private Integer productPrice;
  private String productImage;
  private LocalDate createDt;
  private LocalDate publicationDate;
  private Integer totalPages; // null 받기
  private Integer stock; // null 받기
  private Character salesYn;
  
  private GenreDto genre;
  private AuthorDto author;
  private PublisherDto publisher;
  private ListUserDto user;
  

}
