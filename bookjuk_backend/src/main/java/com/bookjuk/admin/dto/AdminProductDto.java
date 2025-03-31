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
public class AdminProductDto {

  private Integer                     productId;
  private String                      productImage;
  private String                      productName;
  private String                      description;
  private Integer                     productPrice;
  private Integer                     stock;
  private LocalDateTime               createDt;
  private LocalDate                   publicationDate;
  private Integer                     totalPages;
  private Character                   salesYn;
  private AdminUserDto                user;
  private AdminGenreDto               genre;
  private AdminAuthorDto              author;
  private AdminPublisherDto           publisher;
  private List<AdminProductAttachDto> attachList;

}
