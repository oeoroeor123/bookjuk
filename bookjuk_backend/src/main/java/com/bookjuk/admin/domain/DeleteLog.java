package com.bookjuk.admin.domain;

import java.time.LocalDateTime;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
@Entity(name = "deleteLog")
@Table(name = "tbl_delete_user_log")
public class DeleteLog {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "delete_log_id")
  private Integer deleteLogId;

  @Column(name = "user_id")
  private Integer userId;

  @Column(name = "user_name")
  private String userName;

  @Column(name = "user_nickname")
  private String userNickname;

  @Column(name = "user_email")
  private String userEmail;

  @Column(name = "withdrawal_reason")
  private String withdrawalReason;

  @Column(name = "delete_dt", columnDefinition = "DATETIME DEFAULT NOW()", insertable = false)
  private LocalDateTime deleteDt;

}
