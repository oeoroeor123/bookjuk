package com.bookjuk.model.message;

import java.util.Map;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@Tag(name = "REST API 통신 결과", description = "응답 코드/응답 메시지/응답 결과")
public class ResponseMessage {

  private int                 status;
  private String              message;
  private Map<String, Object> results;

}
