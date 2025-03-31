package com.bookjuk.admin.dto;

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
@Builder
@ToString
public class AdminSecondhandDto {

  private Integer                        secondhandId;
  private AdminUserDto                   user;
  private AdminGenreDto                  genre;
  private AdminPublisherDto              publisher;
  private AdminAuthorDto                 author;
  private String                         secondhandName;
  private String                         secondhandImage;
  private String                         secondhandDescription;
  private Integer                        secondhandPrice;
  private LocalDateTime                  secondhandDate;
  private LocalDateTime                  createDt;
  private Character                      salesYn;
  private List<AdminSecondhandAttachDto> attachList;

}
