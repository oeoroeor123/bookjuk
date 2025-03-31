package com.bookjuk.faq.service;

import java.util.Map;

import org.springframework.data.domain.Pageable;

import com.bookjuk.faq.dto.FaqDto;

public interface FaqService {
  Map<String, Object> findFaqList(Pageable pageable);
  FaqDto registFaq(FaqDto faqDto);
  FaqDto findFaqById(Integer id);
  FaqDto modifyFaq(FaqDto faqDto);
  void deleteFaqById(Integer id);  
}
