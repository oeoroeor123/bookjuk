package com.bookjuk.model.message;

import io.swagger.v3.oas.annotations.media.Schema;
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
@Schema(description = "API 실패 응답 메시지")
public class ResponseErrorMessage {

  @Schema(description = "응답 에러 코드", nullable = false)
  private int code;

  @Schema(description = "응답 예외 메시지", nullable = false)
  private String message;

  @Schema(description = "응답 예외 메시지 설명", nullable = false)
  private String describe;

}
