package com.bookjuk.product.domain;

import java.time.LocalDate;

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

@Entity(name = "product")
@Table(name = "tbl_product")

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class Product {

	@Id
	@Column(name = "product_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer productId;

	@Column(name = "product_name")
	private String productName;

	@Column(name = "description")
	private String description;

	@Column(name = "product_price")
	private Integer productPrice;
	
  @Column(name = "product_image")
  private String productImage;
  
  @Column(name = "create_dt")
  private LocalDate createDt;

	@Column(name = "publication_date")
	private LocalDate publicationDate;

	@Column(name = "total_pages")
	private Integer totalPages;
	
	@Column(name = "stock")
  private Integer stock;
	
	@Column(name = "sales_yn")
	private String salesYn;
	
  // 장르(Genre)
  @ManyToOne
  @JoinColumn(name = "genre_id")
  private Genre genre;

	// 작가(Author) 
  @ManyToOne
  @JoinColumn(name = "author_id")
  private Author author;

  // 출판사(Publisher) 
  @ManyToOne
  @JoinColumn(name = "publisher_id")
  private Publisher publisher;
  
  // 유저(User) 
  @ManyToOne(optional = true)
  @JoinColumn(name = "user_id")
  private ListUser user;

}
