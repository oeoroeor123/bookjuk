package com.bookjuk.admin.domain;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

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

@Entity(name = "adminProduct")
@Table(name = "tbl_product")
public class Product {

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
  private int totalPages;

  @Column(name = "create_dt")
  private LocalDateTime createDt;

  @Column(name = "publication_date")
  private LocalDate publicationDate;

  @Column(name = "sales_yn", columnDefinition = "CHAR(1) DEFAULT 'Y'", insertable = false)
  private Character salesYn;

  @ManyToOne
  @JoinColumn(name = "user_id", nullable = true)
  @ToString.Exclude
  private AdminUser user;

  // 장르(Genre) 조인 (ManyToOne, 연관 관계 주인)
  @ManyToOne
  @JoinColumn(name = "genre_id", nullable = true)
  private Genre genre;

  // 작가(Author) 조인 (ManyToOne, 연관 관계 주인)
  @ManyToOne
  @JoinColumn(name = "author_id", nullable = true)
  private Author author;

  // 출판사(Publisher) 조인 (ManyToOne, 연관 관계 주인)
  @ManyToOne
  @JoinColumn(name = "publisher_id", nullable = true)
  private Publisher publisher;

  @OneToMany(mappedBy = "productId", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<AdminProductAttach> attachList;
  
 
  @Override
  public String toString() {
    return "Product [productId=" + productId + ", productName=" + productName
        + ", description=" + description + ", productPrice=" + productPrice
        + ", stock=" + stock + ", totalPages=" + totalPages + ", createDt=" + createDt
        + ", salesYn=" + salesYn + ", publicationDate=" + publicationDate + ", genre=" + genre
        + ", author=" + author + ", publisher=" + publisher + ", attachList=" + attachList.toString() + "]";
  }
}
