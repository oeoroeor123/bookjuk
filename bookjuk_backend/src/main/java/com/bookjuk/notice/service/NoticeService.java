package com.bookjuk.notice.service;

import java.util.Map;

import org.springframework.data.domain.Pageable;

import com.bookjuk.notice.dto.NoticeDto;

public interface NoticeService {
  Map<String, Object> findNoticeList(Pageable pageable);
  NoticeDto registNotice(NoticeDto noticeDto);
  NoticeDto findNoticeById(Integer id);
  NoticeDto modifyNotice(NoticeDto noticeDto);
  void deleteNoticeById(Integer id);
}
