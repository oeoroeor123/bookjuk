package com.bookjuk.admin.dto;

import java.time.LocalDate;
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
public class AdminAuthorDto {

  private Integer   authorId;
  private String    authorName;
  private LocalDate authorBirth;
  private String    biography;
  private String    majorWorks;

}
