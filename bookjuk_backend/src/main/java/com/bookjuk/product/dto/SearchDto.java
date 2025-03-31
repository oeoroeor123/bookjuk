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
@ToString
@Builder
public class SearchDto {

	private Integer       searchId;
	private String        search;
  private Integer       searchCount;
  private LocalDateTime searchDt;
  private Integer       userId;

}
