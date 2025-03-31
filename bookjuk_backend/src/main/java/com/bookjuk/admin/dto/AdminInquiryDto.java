package com.bookjuk.admin.dto;

import java.time.LocalDateTime;
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
public class AdminInquiryDto {

  private Integer              inquiryId;
  private ProductDto           product;
  private AdminUserDto         user;
  private AdminInquiryReplyDto inquiryReply;
  private String               inquiryTitle;
  private String               inquiryContent;
  private String               inquiryImage;
  private LocalDateTime        createDt;
  private LocalDateTime        modifyDt;
  private Character            inquiryReplyYn;

}
