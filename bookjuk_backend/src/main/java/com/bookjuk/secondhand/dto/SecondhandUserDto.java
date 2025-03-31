package com.bookjuk.secondhand.dto;

import java.time.LocalDate;
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
public class SecondhandUserDto {

  private Integer       userId;
  private String        userEmail;
  private String        userPw;
  private String        userName;
  private LocalDate     userBirthdate;
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
