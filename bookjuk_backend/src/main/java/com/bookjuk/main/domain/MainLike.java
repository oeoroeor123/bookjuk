package com.bookjuk.main.domain;

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
@Entity(name = "mainLike")
@Table(name = "tbl_like")
public class MainLike {

  @Id
  @Column(name = "like_id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer likeId;

  @Column(name = "user_id")
  private Integer userId;

  @Column(name = "product_id")
  private Integer productId;

}
