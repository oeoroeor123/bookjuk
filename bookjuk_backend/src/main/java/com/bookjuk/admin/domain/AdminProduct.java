package com.bookjuk.admin.domain;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@Entity(name = "adminProduct2")
@Table(name = "tbl_product")
public class AdminProduct {

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

  @Column(name = "total_pages")
  private Integer totalPages;

  @Column(name = "create_dt")
  private LocalDateTime createDt;

  @Column(name = "publication_date")
  private LocalDate publicationDate;

  @Column(name = "sales_yn", columnDefinition = "CHAR(1) DEFAULT 'Y'", insertable = false)
  private Character salesYn;

  @ManyToOne
  @JoinColumn(name = "user_id", nullable = true) // nullable = true : user_id 가 없어도 조회 되게
  @ToString.Exclude
  @JsonIgnore
  private AdminUser user;

  @ManyToOne
  @JoinColumn(name = "genre_id", nullable = true)
  private Genre genre;

  @ManyToOne
  @JoinColumn(name = "author_id", nullable = true)
  private Author author;

  @ManyToOne
  @JoinColumn(name = "publisher_id", nullable = true)
  private Publisher publisher;

  @OneToMany(mappedBy = "productId", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<AdminProductAttach> attachList;

}
