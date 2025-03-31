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
@Entity(name = "adminSecondhandAttatch")
@Table(name = "tbl_secondhand_attatch")
public class AdminSecondhandAttach {

  @Id
  @Column(name = "secondhand_attatch_id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer secondhandAttachId;

  @JoinColumn(name = "secondhand_id", nullable = false)
  private Integer secondhandId;

  @Column(name = "secondhand_file_path")
  private String secondhandFilePath;

  @Column(name = "secondhand_org_filename")
  private String secondhandOrgFilename;

  @Column(name = "secondhand_sys_filename")
  private String secondhandSysFilename;

}
