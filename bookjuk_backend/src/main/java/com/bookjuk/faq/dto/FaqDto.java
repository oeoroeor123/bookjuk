package com.bookjuk.faq.dto;

import java.time.LocalDateTime;

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
public class FaqDto {
  private Integer faqId;
  private UserDto user;
  private String faqTitle;
  private String faqContent;
  private LocalDateTime faqCreateDt;
  private LocalDateTime faqUpdateDt;
}
