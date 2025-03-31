package com.bookjuk.notice.domain;

import java.time.LocalDateTime;

import com.bookjuk.user.domain.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
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

@Entity(name = "notice")
@Table(name = "tbl_notice")
public class Notice {

  @Id
  @Column(name = "notice_id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer noticeId;

  @ManyToOne
  @JoinColumn(name = "user_id")
  private User user;  
  
  @Column(name = "notice_title")
  private String noticeTitle;
  
  @Column(name = "notice_content")
  private String noticeContent;
  
  @Column(name = "notice_create_dt")
  private LocalDateTime noticeCreateDt;
  
  @Column(name = "notice_update_dt")
  private LocalDateTime noticeUpdateDt;
  
  @PrePersist                               //엔티티가 persist 되기 전에 createDt 값을 자동으로 설정
  public void prePersist() {
    if (noticeCreateDt == null) 
      noticeCreateDt = LocalDateTime.now();
    if (noticeUpdateDt == null) 
      noticeUpdateDt = LocalDateTime.now();
  }

}
