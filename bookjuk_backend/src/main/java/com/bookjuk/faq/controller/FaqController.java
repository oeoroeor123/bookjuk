package com.bookjuk.faq.controller;

import java.util.Map;

import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.bookjuk.faq.dto.FaqDto;
import com.bookjuk.faq.service.FaqService;
import com.bookjuk.model.message.ResponseMessage;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@Tag(name = "FAQ", description = "FAQ API")
public class FaqController {
  
  private final FaqService faqService;
  
  @Operation(summary = "FAQ 목록 조회", description = "FAQ 리스트를 조회하는 기능입니다.")
  @GetMapping(value = "/faq", produces = "application/json")
  public ResponseMessage list(Pageable pageable) {
    return ResponseMessage.builder()
                          .status(200)
                          .message("FAQ 목록 조회 성공")
                          .results(faqService.findFaqList(pageable))
                          .build();
  }

  @Operation(summary = "FAQ 등록", description = "FAQ를 등록하는 기능입니다.")
  @PostMapping(value = "/faq/regist", produces = "application/json")
  public ResponseMessage regist(@RequestBody FaqDto faqDto) {
    return ResponseMessage.builder()
                          .status(200)
                          .message("FAQ 등록 성공")
                          .results(Map.of("faq", faqService.registFaq(faqDto)))
                          .build();
  }
  
  @Operation(summary = "FAQ 상세 조회", description = "FAQ 상세 내용을 확인하는 기능입니다.")
  @GetMapping(value = "/faq/detail/{id}", produces = "application/json")
  public ResponseMessage detail(@PathVariable(name = "id") Integer id) {
    return ResponseMessage.builder()
                          .status(200)
                          .message("FAQ 상세 조회 성공")
                          .results(Map.of("faq", faqService.findFaqById(id)))
                          .build();
  }  
  
  @Operation(summary = "FAQ 수정", description = "FAQ를 수정하는 기능입니다.")
  @PutMapping(value = "/faq/modify", produces = "application/json")
  public ResponseMessage modify(@RequestBody FaqDto faqDto) {
    return ResponseMessage.builder()
                          .status(200)
                          .message("FAQ 수정 성공")
                          .results(Map.of("blog", faqService.modifyFaq(faqDto)))
                          .build();
  }
  
  @Operation(summary = "FAQ 삭제", description = "FAQ를 삭제하는 기능입니다.")
  @DeleteMapping(value = "/faq/delete/{id}", produces = "application/json")
  public ResponseMessage delete(@PathVariable(name = "id") Integer id) {
    faqService.deleteFaqById(id);
    return ResponseMessage.builder()
                          .status(200)
                          .message("FAQ 삭제 성공")
                          .results(null)
                          .build();
  }  

  
}
