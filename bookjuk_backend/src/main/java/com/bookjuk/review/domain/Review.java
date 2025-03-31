package com.bookjuk.review.domain;

import java.time.LocalDateTime;
import org.hibernate.annotations.CreationTimestamp;
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
@Entity(name = "review")
@Table(name = "tbl_review")
public class Review {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "review_id")
  private Integer reviewId;

  // 회원과 다대일 관계
  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "user_id", nullable = false)
  private User user;
  
  // 상품과 다대일 관계 (Product 엔티티는 별도 정의되어 있다고 가정)
  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "product_id", nullable = true)
  private Product product;

  // 주문상세와 일대일 관계
  @OneToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "order_item_id")
  @JsonIgnore
  private OrderItem orderItem;

  @Column(name = "review_rating")
  private Integer reviewRating;

  @Column(name = "review_comment")
  private String reviewComment;

  @CreationTimestamp
  @Column(name = "create_dt", updatable = false)
  private LocalDateTime createDt;

}
