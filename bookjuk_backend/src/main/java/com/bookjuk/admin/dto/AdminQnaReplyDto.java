package com.bookjuk.admin.dto;

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
public class AdminQnaReplyDto {

  private Integer       qnaReplyId;
  private Integer       qnaId;
  private AdminUserDto  user;
  private String        qnaReplyContents;
  private LocalDateTime createDt;

}
