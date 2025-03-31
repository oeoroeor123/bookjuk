package com.bookjuk.admin.domain;


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

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder

@Entity(name = "publisher")
@Table(name = "tbl_publisher")
public class Publisher {
  
  @Id
  @Column(name = "publisher_id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer publisherId;
  
  @Column(name = "publisher_name")
  private String publisherName;
  
  @Column(name = "website")
  private String website;
  
  @OneToMany(mappedBy = "publisher", fetch = FetchType.LAZY)
  private List<Product> products; 
  

  @Override
  public String toString() {
    return "Publisher [publisherId=" + publisherId + ", publisherName=" + publisherName + ", website=" + website
        + "]";
  }
  
  

}
