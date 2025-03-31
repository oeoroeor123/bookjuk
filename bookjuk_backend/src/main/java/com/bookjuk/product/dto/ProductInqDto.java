package com.bookjuk.product.dto;

import java.time.LocalDateTime;

import com.bookjuk.product.domain.ListUser;
import com.bookjuk.product.domain.Product;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

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
public class ProductInqDto {
	
  private int inquiryId;
  private Product product;
  private ListUser user;
	
  private String inquiryTitle;
  private String inquiryContent;
  private String inquiryImage;
	
  private LocalDateTime createDt;
  private LocalDateTime modifyDt;
	
  private char inquiryReplyYn;

}
