package com.bookjuk.admin.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
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
@Entity(name = "adminProductAttatch")
@Table(name = "tbl_attatch")
public class AdminProductAttach {

  @Id
  @Column(name = "attatch_id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer attachId;

  @JoinColumn(name = "product_id", nullable = false)
  private Integer productId;

  @Column(name = "file_path")
  private String filePath;

  @Column(name = "original_filename")
  private String originalFilename;

  @Column(name = "filesystem_name")
  private String filesystemName;

}
