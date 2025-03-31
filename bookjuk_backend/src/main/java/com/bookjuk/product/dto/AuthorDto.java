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
public class AuthorDto {
  
  private int authorId;
  private String authorName;
  private LocalDate authorBirth;
  private String biography;
  private String majorWorks; 

}
