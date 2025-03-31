package com.bookjuk.secondhand.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.bookjuk.admin.dto.AuthorDto;
import com.bookjuk.admin.dto.GenreDto;
import com.bookjuk.admin.dto.PublisherDto;
import com.bookjuk.user.dto.UserDto;

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
public class SecondhandDto {
  private Integer secondhandId;  
  private String secondhandName;
  private String secondhandImage;
  private String secondhandDescription;
  private Integer secondhandPrice;
  private LocalDate secondhandDate;
  private String salesYn;
  private LocalDateTime createDt;
  
  private UserDto user; 
  private GenreDto genre;
  private PublisherDto publisher;
  private AuthorDto author;  
}
