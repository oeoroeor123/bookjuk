package com.bookjuk.secondhand.domain;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.bookjuk.model.dto.UserRole;
import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
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
@Entity(name = "SecondhandUser")
@Table(name = "tbl_user")
public class SecondhandUser {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "user_id")
  private Integer userId;
  
  @Column(name = "user_email", unique = true)
  private String  userEmail;

  @Column(name = "user_pw")
  private String userPw;

  @Column(name = "user_name")
  private String userName;

  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
  @Column(name = "user_birthdate")
  private LocalDate userBirthdate;

  @Column(name = "user_phone")
  private String userPhone;

  @Column(name = "user_nickname")
  private String userNickname;

  @Column(name = "profile_img")
  private String profileImg;

  @Column(name = "profile_img_ori_name")
  private String profileImgOriName;

  @Column(name = "profile_img_sys_name")
  private String profileImgSysName;

  @Column(name = "session_id")
  private String sessionId;

  @Column(name = "user_role")
  @Enumerated(EnumType.STRING)
  private UserRole userRole;

  @Column(name = "create_dt", columnDefinition = "DATETIME DEFAULT NOW()", insertable = false)
  private LocalDateTime createDt;

  @JsonFormat(shape = JsonFormat.Shape.STRING,pattern = "yyyy-MM-dd HH:mm:ss")
  @Column(name = "change_dt")
  private LocalDateTime changeDt;
  
  // 회원 가입 시 자동으로 현재 시간 저장
  @PrePersist
  protected void onCreate() {
      this.createDt = LocalDateTime.now();
  }

  @PreUpdate
  protected void onUpdate() {
      this.changeDt = LocalDateTime.now();
  }
  
}
