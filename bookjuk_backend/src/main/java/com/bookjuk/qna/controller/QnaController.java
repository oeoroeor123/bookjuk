package com.bookjuk.qna.controller;

import java.util.Map;

import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.bookjuk.model.message.ResponseMessage;
import com.bookjuk.qna.dto.QnaDto;
import com.bookjuk.qna.service.QnaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@Tag(name = "Q&A", description = "Q&A API")
public class QnaController { 
  
  private final QnaService qnaService;
  
  @Operation(summary = "Q&A 목록 조회", description = "Q&A 목록을 확인하는 기능입니다.")
  @GetMapping(value = "/qna", produces = "application/json")
  public ResponseMessage list(Pageable pageable) {
    return ResponseMessage.builder()
                          .status(200)
                          .message("QnA 목록 조회 성공")
                          .results(qnaService.findQnaList(pageable))
                          .build(); 
  }
  
  @Operation(summary = "Q&A 등록", description = "Q&A를 등록하는 기능입니다.")
  @PostMapping(value = "/qna/regist", produces = "application/json")
  public ResponseMessage regist(@RequestBody QnaDto qnaDto) {
    return ResponseMessage.builder()
                          .status(200)
                          .message("QnA 등록 성공")
                          .results(Map.of("qna", qnaService.registQna(qnaDto)))
                          .build();
  }

  @Operation(summary = "Q&A 상세 조회", description = "Q&A 상세 내용을 조회하는 기능입니다.")
  @GetMapping(value = "/qna/detail/{id}", produces = "application/json")
  public ResponseMessage detail(@PathVariable(name = "id") Integer id) {
    return ResponseMessage.builder()
                          .status(200)
                          .message("Q&A 상세 조회 성공")
                          .results(Map.of("qna", qnaService.findQnaById(id)))
                          .build();
  }  
  
  @Operation(summary = "Q&A 수정", description = "Q&A를 수정하는 기능입니다.")
  @PutMapping(value = "/qna/modify", produces = "application/json")
  public ResponseMessage modify(@RequestBody QnaDto qnaDto) {
    return ResponseMessage.builder()
                          .status(200)
                          .message("Q&A 수정 성공")
                          .results(Map.of("blog", qnaService.modifyQna(qnaDto)))
                          .build();
  }
  
  @Operation(summary = "Q&A 삭제", description = "Q&A를 삭제하는 기능입니다.")
  @DeleteMapping(value = "/qna/delete/{id}", produces = "application/json")
  public ResponseMessage delete(@PathVariable(name = "id") Integer id) {
    qnaService.deleteQnaById(id);
    return ResponseMessage.builder()
                          .status(200)
                          .message("Q&A 삭제 성공")
                          .results(null)
                          .build();
  } 
  
  @Operation(summary = "Q&A Reply 상세 조회", description = "Q&A 문의 상세 내용 + 답변을 확인하는 기능입니다.")
  @GetMapping(value = "/qna/reply/{qnaId}", produces = "application/json")
  public ResponseMessage getQnaReplyDetail(@PathVariable(name = "qnaId") Integer qnaId) {
    return ResponseMessage.builder()
        .status(200)
        .message("Q&A 목록 조회 성공")
        .results(qnaService.getByQnaId(qnaId))
        .build();
  }
}
