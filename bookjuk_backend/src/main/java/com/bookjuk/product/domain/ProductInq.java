package com.bookjuk.product.domain;

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

@Entity(name = "productInq")
@Table(name = "tbl_product_inq")

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class ProductInq {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "inquiry_id")
  private int inquiryId;
	
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "product_id", nullable = false)
  private Product product;
	
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id", nullable = false)
  private ListUser user;
  
  @Column(name = "inquiry_title")
  private String inquiryTitle;
	
  @Column(name = "inquiry_content")
  private String inquiryContent;
	
  @Column(name = "inquiry_image")
  private String inquiryImage;
	
  @Column(name = "create_dt", columnDefinition = "DATATIME DEFAULT NOW()", insertable = false)
  private LocalDateTime createDt;
	
  @Column(name = "modify_dt")
  private LocalDateTime modifyDt;
	
  @Column(name = "inquiry_reply_yn", columnDefinition = "CHAR(1) DEFAULT 'N'")
  private char inquiryReplyYn;
  
}
