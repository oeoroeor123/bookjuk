package com.bookjuk.admin.dto;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class AdminReviewDto {

  private Integer         reviewId;
  private AdminUserDto    user;
  private AdminProductDto product;
  private Integer         orderItemId;
  private Integer         reviewRating;
  private String          reviewComment;
  private LocalDateTime   createDt;

}
