package com.bookjuk.admin.dto;

import java.time.LocalDateTime;
import com.bookjuk.admin.domain.AdminQnaReply;
import com.bookjuk.admin.domain.AdminUser;
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
public class AdminQnaDto {

  private Integer          qnaId;
  private String           qnaTitle;
  private String           qnaContent;
  private LocalDateTime    qnaCreateDt;
  private LocalDateTime    qnaUpdateDt;
  private Character        qnaReplyYn;
  private AdminUserDto     user;
  private AdminQnaReplyDto qnaReply;

}
