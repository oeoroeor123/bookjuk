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
public class AdminOrderDto {

  private Integer       orderId;
  private Integer       userId;
  private Integer       addrId;
  private Integer       totalPrice;
  private LocalDateTime createDt;
  private LocalDateTime modifyDt;

}
