package com.bookjuk.admin.domain;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.CascadeType;
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

@Entity(name = "author")
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
  
  @OneToMany(mappedBy = "author", fetch = FetchType.LAZY)
  private List<Product> products; 


  @Override
  public String toString() {
    return "Author [authorId=" + authorId + ", authorName=" + authorName + ", authorBirth=" + authorBirth
        + ", biography=" + biography + ", majorWorks=" + majorWorks + "]";
  }

 
  
  
}
