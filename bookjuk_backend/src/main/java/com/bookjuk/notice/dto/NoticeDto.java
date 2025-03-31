package com.bookjuk.notice.dto;

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
public class NoticeDto {
  private Integer noticeId;
  private UserDto user;
  private String noticeTitle;
  private String noticeContent;
  private LocalDateTime noticeCreateDt;
  private LocalDateTime noticeUpdateDt;
}
