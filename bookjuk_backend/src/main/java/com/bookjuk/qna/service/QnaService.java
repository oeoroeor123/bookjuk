package com.bookjuk.qna.service;

import java.util.Map;

import org.springframework.data.domain.Pageable;

import com.bookjuk.qna.dto.QnaDto;

public interface QnaService {
  Map<String, Object> findQnaList(Pageable pageable);
  QnaDto registQna(QnaDto qnaDto);
  QnaDto findQnaById(Integer id);
  QnaDto modifyQna(QnaDto qnaDto);
  void deleteQnaById(Integer id);  
  Map<String, Object> getByQnaId(Integer qnaId);
}
