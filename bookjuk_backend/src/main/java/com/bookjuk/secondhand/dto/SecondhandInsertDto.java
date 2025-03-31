package com.bookjuk.secondhand.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

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
@Builder
@ToString
public class SecondhandInsertDto {
  private Integer secondhandId;
  private Integer userId;
  private String secondhandName;
  private String secondhandImage;
  private String secondhandDescription;
  private Integer secondhandPrice;
  private LocalDate secondhandDate;
  private LocalDateTime createDt;
  private String salesYn;
  
  private Integer genreId;
  
  private Integer publisherId;
  private String publisherName;
  
  private Integer authorId;
  private String authorName;  
}
