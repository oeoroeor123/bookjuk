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
import jakarta.persistence.OneToOne;
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
@Entity(name = "adminQna")
@Table(name = "tbl_qna")
public class AdminQna {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "qna_id")
  private Integer qnaId;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "user_id", nullable = false, table = "tbl_qna")
  @ToString.Exclude
  private AdminUser user;

  @Column(name = "qna_title")
  private String qnaTitle;

  @Column(name = "qna_content")
  private String qnaContent;

  @Column(name = "qna_create_dt", columnDefinition = "DATETIME DEFAULT NOW()", insertable = false)
  private LocalDateTime qnaCreateDt;

  @Column(name = "qna_update_dt")
  private LocalDateTime qnaUpdateDt;

  @Column(name = "qna_reply_yn")
  private Character qnaReplyYn;

  @OneToOne(mappedBy = "qna", fetch = FetchType.EAGER)
  @ToString.Exclude
  private AdminQnaReply qnaReply;

}
