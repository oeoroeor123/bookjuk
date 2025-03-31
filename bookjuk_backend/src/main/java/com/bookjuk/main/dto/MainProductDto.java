package com.bookjuk.main.dto;

import java.time.LocalDate;
import com.bookjuk.admin.dto.AdminAuthorDto;
import com.bookjuk.admin.dto.AdminGenreDto;
import com.bookjuk.admin.dto.AdminPublisherDto;
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
public class MainProductDto {

  private Integer           productId;
  private String            productName;
  private String            productImage;
  private String            description;
  private Integer           productPrice;
  private Integer           stock;
  private LocalDate         createDt;
  private LocalDate         publicationDate;
  private Integer           totalPages;
  private Character         salesYn;
  private AdminGenreDto     genre;
  private AdminAuthorDto    author;
  private AdminPublisherDto publisher;

}
