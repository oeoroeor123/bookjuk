package com.bookjuk.admin.domain;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
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
@ToString
@Builder

@Entity(name = "productRequest")
@Table(name = "tbl_product")
public class ProductRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private Integer productId; // 상품 ID (자동 증가)

    @Column(name = "genre_id")
    private Integer genreId;                      // 장르 ID
    
    @Column(name = "publisher_id")
    private Integer publisherId;              // 출판사 ID
    
    @Column(name = "author_id")
    private Integer authorId;                    // 작사 ID
    
    @Column(name = "product_name")
    private String productName; // 상품 이름

    @Column(name = "product_image")
    private String productImage; // 상품 이미지

    @Column(name = "description")
    private String description; // 상품 설명

    @Column(name = "product_price")
    private Integer productPrice; // 상품 가격

    @Column(name = "stock")
    private Integer stock; // 재고

    @Column(name = "total_pages")
    private int totalPages; // 총 페이지 수

    @Column(name = "publication_date")
    private LocalDate publicationDate; // 출판일

    @Column(name = "sales_yn", nullable = false, columnDefinition = "CHAR(1) DEFAULT 'Y'", insertable = false)
    private Character salesYn; // 판매 여부 (Y/N)
    
    @Column(name = "create_dt")
    private LocalDate createDt;
    
    @PrePersist                               //엔티티가 persist 되기 전에 createDt 값을 자동으로 설정
    public void prePersist() {
      if (createDt == null) 
        createDt = LocalDate.now();
    }
}
