package com.bookjuk.secondhand.dto;

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
public class SecondhandAttatchDto {
  private Integer secondhandAttatchId;  
  private Integer secondhandId;  
  private String secondhandFilePath;  
  private String secondhandOrgFilename; 
  private String secondhandSysFilename;
}
