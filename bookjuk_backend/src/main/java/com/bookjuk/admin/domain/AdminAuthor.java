package com.bookjuk.admin.domain;

import java.time.LocalDate;
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

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@ToString
@Entity(name = "adminAuthor")
@Table(name = "tbl_author")
public class AdminAuthor {

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
