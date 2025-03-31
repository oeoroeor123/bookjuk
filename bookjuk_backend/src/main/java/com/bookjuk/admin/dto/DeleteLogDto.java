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
public class DeleteLogDto {

  private Integer       deleteLogId;
  private Integer       userId;
  private String        userName;
  private String        userNickname;
  private String        userEmail;
  private String        withdrawalReason;
  private LocalDateTime deleteDt;

}
