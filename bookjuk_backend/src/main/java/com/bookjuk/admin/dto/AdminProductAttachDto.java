package com.bookjuk.admin.dto;

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
public class AdminProductAttachDto {

  private Integer attachId;
  private String  filePath;
  private String  originalFilename;
  private String  filesystemName;
  private Integer productId;

}
