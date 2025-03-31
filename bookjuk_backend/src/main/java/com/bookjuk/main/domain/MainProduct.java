package com.bookjuk.main.domain;

import java.time.LocalDate;
import java.time.LocalDateTime;
import com.bookjuk.admin.domain.Author;
import com.bookjuk.admin.domain.Genre;
import com.bookjuk.admin.domain.Publisher;
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

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@ToString
@Entity(name = "mainProduct")
@Table(name = "tbl_product")
public class MainProduct {

  @Id
  @Column(name = "product_id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer productId;

  @Column(name = "product_name")
  private String productName;

  @Column(name = "product_image")
  private String productImage;

  @Column(name = "description")
  private String description;

  @Column(name = "product_price")
  private Integer productPrice;

  @Column(name = "stock")
  private Integer stock;

  // columnDefinition : SQL에 직접 실행할 DDL 구문
  // insertable : JPA에서 insert 할때 createDt의 값은 등록되지 않도록 false 로 설정, Default 값은 NOW() 로 설정
  @Column(name = "create_dt", columnDefinition = "DATETIME DEFAULT NOW()", insertable = false)
  private LocalDateTime createDt;

  @Column(name = "publication_date")
  private LocalDate publicationDate;

  @Column(name = "total_pages")
  private Integer totalPages;

  @Column(name = "sales_yn")
  private Character salesYn;

  @ManyToOne
  @JoinColumn(name = "genre_id", nullable = true)
  private Genre genre;

  @ManyToOne
  @JoinColumn(name = "author_id", nullable = true)
  private Author author;

  @ManyToOne
  @JoinColumn(name = "publisher_id", nullable = true)
  private Publisher publisher;

}
