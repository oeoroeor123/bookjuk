package com.bookjuk.product.domain;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder

@Entity(name = "product_author")
@Table(name = "tbl_author")
public class Author {
  
  @Id
  @Column(name = "author_id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer authorId;
  
  @Column(name = "author_name")
  private String authorName;
  
  @Column(name = "author_birth")
  private LocalDate authorBirth;
  
  @Column(name = "biography")
  private String biography;
  
  @Column(name = "major_works")
  private String majorWorks; 

 
  
  
}
