package com.bookjuk.admin.domain;

import java.time.LocalDateTime;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@ToString
@Entity(name = "adminReview")
@Table(name = "tbl_review")
public class AdminReview {

  @Id
  @Column(name = "review_id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer reviewId;

  @ManyToOne
  @JoinColumn(name = "user_id", nullable = true) // nullable = true : user_id 가 없어도 조회 되게
  private AdminUser user;

  @ManyToOne
  @JoinColumn(name = "product_id", nullable = false)
  private AdminProduct product;

  @Column(name = "order_item_id", nullable = false)
  private Integer orderItemId;

  @Column(name = "review_rating")
  private Integer reviewRating;

  @Column(name = "review_comment")
  private String reviewComment;

  @Column(name = "create_dt", columnDefinition = "DATETIME DEFAULT NOW()", insertable = false)
  private LocalDateTime createDt;

}
