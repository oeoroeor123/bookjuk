package com.bookjuk.secondhand.domain;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.bookjuk.admin.domain.Author;
import com.bookjuk.admin.domain.Genre;
import com.bookjuk.admin.domain.Publisher;
import com.bookjuk.user.domain.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Builder
@ToString

@Entity(name = "secondhand")
@Table(name = "tbl_secondhand")             // 중고상품 테이블
public class Secondhand {
  
  @Id
  @Column(name = "secondhand_id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer secondhandId;             // 중고상품 ID
    
  @ManyToOne
  @JoinColumn(name = "genre_id")
  private Genre genre;                      // 장르 ID
  
  @ManyToOne
  @JoinColumn(name = "publisher_id")
  private Publisher publisher;              // 출판사 ID
  
  @ManyToOne
  @JoinColumn(name = "author_id")
  private Author author;                    // 작사 ID
  
  @ManyToOne
  @JoinColumn(name = "user_id")
  private User user;                      // 유저 ID  
  
  @Column(name = "secondhand_name")
  private String secondhandName;            // 중고상품 이름
  
  @Column(name = "secondhand_image")
  private String secondhandImage;           // 중고상품 이미지
  
  @Column(name = "secondhand_description")
  private String secondhandDescription;     // 중고상품 설명
  
  @Column(name = "secondhand_price")
  private Integer secondhandPrice;          // 중고상품 가격
  
  @Column(name = "secondhand_date")
  private LocalDate secondhandDate;         // 중고상품 발행일
  
  @Column(name = "sales_yn")
  private String salesYn;                   // 판매여부
  
  @Column(name = "create_dt")
  private LocalDateTime createDt;           // 중고상품 등록일
    
  @PrePersist                               //엔티티가 persist 되기 전에 createDt 값을 자동으로 설정
  public void prePersist() {
    if (createDt == null) 
      createDt = LocalDateTime.now();
  }
  
}
