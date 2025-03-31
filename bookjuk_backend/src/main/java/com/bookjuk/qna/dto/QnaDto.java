package com.bookjuk.qna.dto;

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
public class QnaDto {
  private Integer qnaId;
  private UserDto user;
  private String qnaTitle;
  private String qnaContent;
  private LocalDateTime qnaCreateDt;
  private LocalDateTime qnaUpdateDt;
  private String qnaReplyYn;
}
