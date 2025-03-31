package com.bookjuk.qna.domain;

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

@Entity(name = "qna")
@Table(name = "tbl_qna")
public class Qna {
  
  @Id
  @Column(name = "qna_id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer qnaId;
  
  @ManyToOne
  @JoinColumn(name = "user_id")
  private User user;  
  
  @Column(name = "qna_title")
  private String qnaTitle;
  
  @Column(name = "qna_content")
  private String qnaContent;
  
  @Column(name = "qna_create_dt")
  private LocalDateTime qnaCreateDt;
  
  @Column(name = "qna_update_dt")
  private LocalDateTime qnaUpdateDt;
  
  @Column(name = "qna_reply_yn")
  private String qnaReplyYn;

  @PrePersist                               //엔티티가 persist 되기 전에 createDt 값을 자동으로 설정
  public void prePersist() {
    if (qnaCreateDt == null) 
      qnaCreateDt = LocalDateTime.now();
    if (qnaUpdateDt == null) 
      qnaUpdateDt = LocalDateTime.now();
  }

}
