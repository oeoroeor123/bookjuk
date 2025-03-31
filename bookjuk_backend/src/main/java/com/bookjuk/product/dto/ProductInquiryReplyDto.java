package com.bookjuk.product.dto;

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
public class ProductInquiryReplyDto {

  private Integer       inquiryReplyId;
  private ListUserDto   user;
  private String        inquiryReplyContent;
  private LocalDateTime inquiryReplyDt;

}
