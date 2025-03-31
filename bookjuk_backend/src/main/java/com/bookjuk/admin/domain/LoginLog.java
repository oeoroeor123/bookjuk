package com.bookjuk.admin.domain;

import java.time.LocalDateTime;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Entity(name = "loginLog")
@Table(name = "tbl_login_log")
public class LoginLog {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "login_log_id")
  private Integer loginLogId;

  @Column(name = "user_id")
  private Integer userId;

  @Column(name = "login_dt", columnDefinition = "DATETIME DEFAULT NOW()", insertable = false)
  private LocalDateTime loginDt;

  @Column(name = "login_browser")
  private String loginBrowser;

  @Column(name = "ip_addr")
  private String ipAddr;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "user_id", nullable = false, table = "tbl_login_log",
      insertable = false, updatable = false)
  @ToString.Exclude
  private AdminUser user;

}
