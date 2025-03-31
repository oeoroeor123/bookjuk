package com.bookjuk.port.one.domain;


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

@Entity(name = "portOneProduct")
@Table(name = "tbl_product")
public class Product {

  @Id
  @Column(name = "product_id") // 도서 고유 ID
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer productId;
  
//  @Column(name = "product_name") // 도서 이름
//  private String productName;
//  
//  @Column(name = "product_image") // 도서 이미지
//  private String productImage;
  
  @Column(name = "sales_yn")
  private Character salesYn;
  
//  // 첨부 파일(Attach) 리스트 (연관 관계의 주인이 아님)
//  @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
//  private List<Attatch> attatchList = new ArrayList<>(); // 초기화
//  
//  @Column(name = "description") // 도서 설명
//  private String description;
//  
  @Column(name = "product_price") // 도서 가격
  private Integer productPrice;
  
  @Column(name = "stock") // 도서 재고
  private Integer stock;
  
//  @Column(name = "create_dt") // 도서 등록일
//  private LocalDate createDt;
  
//  @Column(name = "publication_date") // 도서 발매일
//  private LocalDate publicationDate;
  
//  @Column(name = "total_pages") // 전체 페이지 수
//  private int totalPages;
  
//  // 장르(Genre) 조인 (ManyToOne, 연관 관계 주인)
//  @ManyToOne
//  @JoinColumn(name = "genre_id") // 장르 ID
//  private Genre genre;

//  // 작가(Author) 조인 (ManyToOne, 연관 관계 주인)
//  @ManyToOne
//  @JoinColumn(name = "author_id") // 작가 ID
//  @ToString.Exclude
//  private Author author;
//
//  // 출판사(Publisher) 조인 (ManyToOne, 연관 관계 주인)
//  @ManyToOne
//  @JoinColumn(name = "publisher_id") // 출판사 ID
//  @ToString.Exclude
//  private Publisher publisher;
}
