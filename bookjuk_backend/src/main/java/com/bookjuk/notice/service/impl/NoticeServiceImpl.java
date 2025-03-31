package com.bookjuk.notice.service.impl;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.stream.IntStream;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bookjuk.model.dto.PageDto;
import com.bookjuk.notice.domain.Notice;
import com.bookjuk.notice.dto.NoticeDto;
import com.bookjuk.notice.repository.NoticeRepository;
import com.bookjuk.notice.service.NoticeService;

import lombok.RequiredArgsConstructor;

@Transactional
@RequiredArgsConstructor
@Service
public class NoticeServiceImpl implements NoticeService {
  
  private final NoticeRepository noticeRepository;
  private final ModelMapper modelMapper;
  private final PageDto pageDto;

  @Transactional(readOnly = true)
  @Override
  public Map<String, Object> findNoticeList(Pageable pageable) {
    pageDto.setPaging(pageable.getPageNumber(), pageable.getPageSize(), (int)noticeRepository.count());
    pageable = pageable.withPage(pageable.getPageNumber() - 1);
    Page<Notice> noticeList = noticeRepository.findAll(pageable);
    return Map.of("noticeList", noticeList.map(notice -> modelMapper.map(notice, NoticeDto.class)).toList()
                , "pageList", IntStream.rangeClosed(pageDto.getBeginPage(), pageDto.getEndPage()).boxed().toList()
                , "pageDto", pageDto);
  }
  
  @Override
  public NoticeDto registNotice(NoticeDto noticeDto) {
    System.out.println(noticeDto);
    Notice notice = modelMapper.map(noticeDto, Notice.class);
    noticeRepository.save(notice);
    return noticeDto;
  }
  
  @Transactional(readOnly = true)
  @Override
  public NoticeDto findNoticeById(Integer id) {    
    Notice notice = noticeRepository.findById(id).orElseThrow(IllegalArgumentException::new);
    return modelMapper.map(notice, NoticeDto.class);
  }
  
  @Override
  public NoticeDto modifyNotice(NoticeDto noticeDto) {
    Notice notice = noticeRepository.findById(noticeDto.getNoticeId()).orElseThrow(IllegalArgumentException::new);    // () -> new IllegalArgumentException() 
    notice.setNoticeTitle(noticeDto.getNoticeTitle());
    notice.setNoticeContent(noticeDto.getNoticeContent());
    noticeDto.setNoticeUpdateDt(LocalDateTime.now());
    notice.setNoticeUpdateDt(noticeDto.getNoticeUpdateDt());
    return noticeDto;
  }
  
  @Override
  public void deleteNoticeById(Integer id) {
    noticeRepository.deleteById(id);
  }
  
  
}
