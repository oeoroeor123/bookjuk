package com.bookjuk.admin.domain;

import java.time.LocalDateTime;
import com.bookjuk.model.dto.UserRole;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
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
@Entity(name = "adminUser")
@Table(name = "tbl_user")
public class AdminUser {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "user_id")
  private Integer userId;

  @Column(name = "user_email")
  private String userEmail;

  // @Column(name = "user_pw")
  // private String userPw;

  @Column(name = "user_name")
  private String userName;

  @Column(name = "user_birthdate")
  private String userBirthdate;

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

  @Column(name = "create_dt")
  private LocalDateTime createDt;

  @Column(name = "change_dt")
  private LocalDateTime changeDt;

}
