package com.bookjuk.admin.dto;

import java.time.LocalDateTime;
import com.bookjuk.model.dto.UserRole;
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
public class AdminUserDto {

  private Integer userId;

  // private String userPw;
  private String        userEmail;
  private String        userName;
  private String        userBirthdate;
  private String        userPhone;
  private String        userNickname;
  private String        profileImg;
  private String        profileImgOriName;
  private String        profileImgSysName;
  private String        sessionId;
  private UserRole      userRole;
  private LocalDateTime createDt;
  private LocalDateTime changeDt;

}
