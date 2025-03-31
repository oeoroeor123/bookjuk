package com.bookjuk.qna.service.impl;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.stream.IntStream;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bookjuk.admin.domain.AdminQna;
import com.bookjuk.admin.dto.AdminQnaDto;
import com.bookjuk.admin.repository.AdminQnARepository;
import com.bookjuk.model.dto.PageDto;
import com.bookjuk.qna.domain.Qna;
import com.bookjuk.qna.dto.QnaDto;
import com.bookjuk.qna.repository.QnaRepository;
import com.bookjuk.qna.service.QnaService;

import lombok.RequiredArgsConstructor;

@Transactional
@RequiredArgsConstructor
@Service
public class QnaServiceImpl implements QnaService {

  private final QnaRepository qnaRepository;
  private final ModelMapper modelMapper;
  private final PageDto pageDto;
  private final AdminQnARepository adminQnARepository;

  @Transactional(readOnly = true)
  @Override
  public Map<String, Object> findQnaList(Pageable pageable) {
    pageDto.setPaging(pageable.getPageNumber(), pageable.getPageSize(), (int)qnaRepository.count());
    pageable = pageable.withPage(pageable.getPageNumber() - 1);
    Page<Qna> qnaList = qnaRepository.findAll(pageable);
    return Map.of("qnaList", qnaList.map(qna -> modelMapper.map(qna, QnaDto.class)).toList()
                , "pageList", IntStream.rangeClosed(pageDto.getBeginPage(), pageDto.getEndPage()).boxed().toList()
                , "pageDto", pageDto);
  }

  @Override
  public QnaDto registQna(QnaDto qnaDto) {
    Qna qna = modelMapper.map(qnaDto, Qna.class);
    qnaRepository.save(qna);
    return qnaDto;
  }
  
  @Transactional(readOnly = true)
  @Override
  public QnaDto findQnaById(Integer id) {    
    Qna qna = qnaRepository.findById(id).orElseThrow(IllegalArgumentException::new);
    return modelMapper.map(qna, QnaDto.class);
  }
  
  @Override
  public QnaDto modifyQna(QnaDto qnaDto) {
    Qna qna = qnaRepository.findById(qnaDto.getQnaId()).orElseThrow(IllegalArgumentException::new);    // () -> new IllegalArgumentException() 
    qna.setQnaTitle(qnaDto.getQnaTitle());
    qna.setQnaContent(qnaDto.getQnaContent());
    qnaDto.setQnaUpdateDt(LocalDateTime.now());
    qna.setQnaUpdateDt(qnaDto.getQnaUpdateDt());
    return qnaDto;
  }
  
  @Override
  public void deleteQnaById(Integer id) {
    qnaRepository.deleteById(id);
  }
  
  @Transactional(readOnly = true)
  @Override
  public Map<String, Object> getByQnaId(Integer qnaId) {
    AdminQna qna = adminQnARepository.findById(qnaId).orElseThrow(IllegalArgumentException::new);
    return Map.of("qna", modelMapper.map(qna, AdminQnaDto.class));
  }  
}
