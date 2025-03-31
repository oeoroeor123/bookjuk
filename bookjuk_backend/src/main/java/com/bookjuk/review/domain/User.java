package com.bookjuk.review.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@Setter
@Builder
@ToString
@Entity(name = "reviewUser")
@Table(name = "tbl_user")
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "user_id") // 회원 아이디 (고유 ID)
  private Integer userId;
  
//  @Column(name = "user_email") // 이메일
//  private String userEmail;

//  @Column(name = "user_pw") // 비밀번호
//  private String userPw;

//  @Column(name = "user_name") // 회원 이름
//  private String userName;

//  @Column(name = "user_birthdate") // 회원 생년월일
//  private String userBirthdate;

//  @Column(name = "user_phone") // 회원 휴대폰 번호
//  private String userPhone;

//  @Column(name = "user_nickname") // 회원 닉네임
//  private String userNickname;

//  @Column(name = "profile_img") // 프로필 이미지 경로
//  private String profileImg;

//  @Column(name = "profile_img_ori_name") // 프로필 이미지 원본 이름
//  private String profileImgOriName;

//  @Column(name = "profile_img_sys_name") // 프로필 이미지 시스템 저장 이름
//  private String profileImgSysName;

//  @Column(name = "session_id") // 자동 로그인 세션 ID
//  private String sessionId;

//  @Column(name = "user_role") // 사용자 역할 (ADMIN, USER 등)
//  private String userRole;

//  @Column(name = "create_dt") // 회원가입 일자
//  private LocalDateTime createDt;
//
//  @Column(name = "change_dt") // 비밀번호 변경 일자
//  private LocalDateTime changeDt;
}