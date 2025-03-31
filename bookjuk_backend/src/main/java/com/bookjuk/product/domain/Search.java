package com.bookjuk.product.domain;

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

@Entity(name = "search")
@Table(name = "tbl_search")

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class Search {
	
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "search_id")
  private Integer searchId;

  @Column(name = "search")
  private String search;

  @Column(name = "search_count")
  private int searchCount;

  @Column(name = "search_dt")
  private LocalDateTime searchDt;
  
  @Column(name = "user_id")
  private Integer userId;


}
