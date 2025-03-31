package com.bookjuk.product.domain;


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

@Entity(name = "product_genre")
@Table(name = "tbl_genre")
public class Genre {
  
  @Id
  @Column(name = "genre_id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer genreId;
  
  @Column(name = "genre_name")
  private String genreName;
  

}
