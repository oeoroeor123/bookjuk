package com.bookjuk.admin.domain;


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

@Entity(name = "genre")
@Table(name = "tbl_genre")
public class Genre {
  
  @Id
  @Column(name = "genre_id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer genreId;
  
  @Column(name = "genre_name")
  private String genreName;
  
  @OneToMany(mappedBy = "genre", fetch = FetchType.LAZY)
  private List<Product> products; 
  
  

  @Override
  public String toString() {
    return "Genre [genreId=" + genreId + ", genreName=" + genreName + "]";
  }

 
   

  
}
