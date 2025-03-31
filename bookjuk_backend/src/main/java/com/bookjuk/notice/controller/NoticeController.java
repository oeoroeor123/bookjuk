package com.bookjuk.notice.controller;

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
import com.bookjuk.notice.dto.NoticeDto;
import com.bookjuk.notice.service.NoticeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@Tag(name = "공지사항", description = "공지사항 API")
public class NoticeController {

  private final NoticeService noticeService;
  
  @Operation(summary = "공지사항 목록 조회", description = "공지사항 목록을 확인하는 기능입니다.")
  @GetMapping(value = "/notice", produces = "application/json")
  public ResponseMessage list(Pageable pageable) {
    return ResponseMessage.builder()
                          .status(200)
                          .message("공지사항 목록 조회 성공")
                          .results(noticeService.findNoticeList(pageable))
                          .build(); 
  }

  @Operation(summary = "공지사항 등록", description = "공지사항을 등록하는 기능입니다. (관리자만 등록 가능)")
  @PostMapping(value = "/notice/regist", produces = "application/json")
  public ResponseMessage regist(@RequestBody NoticeDto noticeDto) {
    return ResponseMessage.builder()
                          .status(200)
                          .message("공지사항 등록 성공")
                          .results(Map.of("notice", noticeService.registNotice(noticeDto)))
                          .build();
  }
  
  @Operation(summary = "공지사항 상세 조회", description = "공지사항 상세 내용을 확인하는 기능입니다.")
  @GetMapping(value = "/notice/detail/{id}", produces = "application/json")
  public ResponseMessage detail(@PathVariable(name = "id") Integer id) {
    return ResponseMessage.builder()
                          .status(200)
                          .message("공지사항 상세 조회 성공")
                          .results(Map.of("notice", noticeService.findNoticeById(id)))
                          .build();
  }  
  
  @Operation(summary = "공지사항 수정", description = "공지사항을 수정하는 기능입니다. (관리자만 수정 가능)")
  @PutMapping(value = "/notice/modify", produces = "application/json")
  public ResponseMessage modify(@RequestBody NoticeDto noticeDto) {
    return ResponseMessage.builder()
                          .status(200)
                          .message("공지사항 수정 성공")
                          .results(Map.of("blog", noticeService.modifyNotice(noticeDto)))
                          .build();
  }
  
  @Operation(summary = "공지사항 삭제", description = "공지사항을 삭제하는 기능입니다. (관리자만 삭제 가능)")
  @DeleteMapping(value = "/notice/delete/{id}", produces = "application/json")
  public ResponseMessage delete(@PathVariable(name = "id") Integer id) {
    noticeService.deleteNoticeById(id);
    return ResponseMessage.builder()
                          .status(200)
                          .message("공지사항 삭제 성공")
                          .results(null)
                          .build();
  }  
  
  
}
