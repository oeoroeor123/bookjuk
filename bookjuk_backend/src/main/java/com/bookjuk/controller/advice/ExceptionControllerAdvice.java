package com.bookjuk.controller.advice;

import org.springframework.dao.DuplicateKeyException;
import org.springframework.data.mapping.PropertyReferenceException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.BadSqlGrammarException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.resource.NoResourceFoundException;
import com.bookjuk.model.message.ResponseErrorMessage;
import io.swagger.v3.oas.annotations.tags.Tag;

@ControllerAdvice
@Tag(name = "오류 예외 처리 컨트롤러", description = "일반 오류 및 사용자 오류 예외 처리를 하는 컨트롤러 입니다")
public class ExceptionControllerAdvice {

  @ExceptionHandler(IllegalArgumentException.class)
  public ResponseEntity<ResponseErrorMessage> handleIllegalArgumentException(
      IllegalArgumentException e
  ) {
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
        ResponseErrorMessage.builder()
            .code(0)
            .message(e.getMessage())
            .describe("조회된 데이터가 없습니다.")
            .build()
    );
  }

  @ExceptionHandler(DuplicateKeyException.class) // DataIntegrityViolationException 의 자식 클래스로 없으면 DataIntegrityViolationException 처리가 적용된다.
  public ResponseEntity<ResponseErrorMessage> handleDuplicateKeyException(DuplicateKeyException e) {
    return ResponseEntity.badRequest().body(
        ResponseErrorMessage.builder()
            .code(1)
            .message(e.getMessage())
            .describe("중복된 데이터가 있습니다.")
            .build()
    );
  }

  @ExceptionHandler(MethodArgumentTypeMismatchException.class)
  public ResponseEntity<ResponseErrorMessage> handleMethodArgumentTypeMismatchException(
      MethodArgumentTypeMismatchException e
  ) {
    return ResponseEntity.badRequest().body(
        ResponseErrorMessage.builder()
            .code(3)
            .message("경로 변수 오류")
            .describe("잘못된 타입의 데이터가 입력되었습니다.")
            .build()
    );
  }

  @ExceptionHandler(value = NoResourceFoundException.class)
  public ResponseEntity<ResponseErrorMessage> handleNoResourceFoundException(
      NoResourceFoundException e
  ) {
    return ResponseEntity.badRequest().body(
        ResponseErrorMessage.builder()
            .code(4)
            .message("경로 변수 누락")
            .describe("필요한 정보가 누락되었습니다.")
            .build()
    );
  }

  @ExceptionHandler(value = NumberFormatException.class)
  public ResponseEntity<ResponseErrorMessage> handleNumberFormatException(NumberFormatException e) {
    return ResponseEntity.badRequest().body(
        ResponseErrorMessage.builder()
            .code(5)
            .message(e.getMessage())
            .describe("잘못된 요청 파라미터입니다.")
            .build()
    );
  }

  @ExceptionHandler(value = BadSqlGrammarException.class)
  public ResponseEntity<ResponseErrorMessage> handleBadSqlGrammarException(
      BadSqlGrammarException e
  ) {
    return ResponseEntity.badRequest().body(
        ResponseErrorMessage.builder()
            .code(6)
            .message("잘못된 쿼리문 실행")
            .describe("파라미터 값이 잘못 전달되었거나, SQL 문법에 오류가 있습니다.")
            .build()
    );
  }

  @ExceptionHandler(NullPointerException.class)
  public ResponseEntity<ResponseErrorMessage> handleNullPointerException(
      NullPointerException e
  ) {
    return ResponseEntity.badRequest().body(
        ResponseErrorMessage.builder()
            .code(7)
            .message(e.getMessage())
            .describe("전달된 데이터가 없습니다.")
            .build()
    );
  }

  @ExceptionHandler(value = PropertyReferenceException.class)
  public ResponseEntity<ResponseErrorMessage> handlePropertyReferenceException(
      PropertyReferenceException e
  ) {
    return ResponseEntity.badRequest().body(
        ResponseErrorMessage.builder()
            .code(8)
            .message(e.getMessage())
            .describe("컬럼 및 타입이 잘못 매핑 되었습니다.")
            .build()
    );
  }

}
