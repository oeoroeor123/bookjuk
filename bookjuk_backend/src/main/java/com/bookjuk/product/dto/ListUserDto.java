package com.bookjuk.product.dto;

import java.time.LocalDateTime;
import com.bookjuk.model.dto.UserRole;
import com.bookjuk.product.domain.ListUser;

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
public class ListUserDto {

  private Integer userId;

  private String        userEmail;
  private String        userPw;
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
	public static ListUserDto fromEntity(ListUser user) {
		return null;
	}

}
