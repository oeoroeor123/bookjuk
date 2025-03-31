package com.bookjuk.admin.domain;

import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
@Entity(name = "adminInqReply")
@Table(name = "tbl_product_inq_reply")
public class AdminInquiryReply {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "inquiry_reply_id")
  private Integer inquiryReplyId;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "user_id", nullable = false)
  @ToString.Exclude
  private AdminUser user;

  @OneToOne
  @JoinColumn(name = "inquiry_id", nullable = false)
  @JsonIgnore
  private AdminInquiry inquiry;

  @Column(name = "inquiry_reply_content")
  private String inquiryReplyContent;

  @Column(name = "inquiry_reply_dt", columnDefinition = "DATETIME DEFAULT NOW()",
      insertable = false)
  private LocalDateTime inquiryReplyDt;

}
