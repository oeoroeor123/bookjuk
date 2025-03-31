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
@Entity(name = "adminInq")
@Table(name = "tbl_product_inq")
public class AdminInquiry {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "inquiry_id")
  private Integer inquiryId;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "user_id", nullable = false, table = "tbl_product_inq")
  @ToString.Exclude
  private AdminUser user;

  // @OneToOne(mappedBy = "inquiry", fetch = FetchType.EAGER)
  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "product_id", nullable = false, table = "tbl_product_inq")
  @ToString.Exclude
  private Product product;

  @OneToOne(mappedBy = "inquiry", fetch = FetchType.EAGER)
  @ToString.Exclude
  private AdminInquiryReply inquiryReply;

  @Column(name = "inquiry_title")
  private String inquiryTitle;

  @Column(name = "inquiry_content")
  private String inquiryContent;

  @Column(name = "inquiry_image")
  private String inquiryImage;

  @Column(name = "create_dt", columnDefinition = "DATETIME DEFAULT NOW()", insertable = false)
  private LocalDateTime createDt;

  @Column(name = "modify_dt")
  private LocalDateTime modifyDt;

  @Column(name = "inquiry_reply_yn")
  private Character inquiryReplyYn;

}
