package com.bookjuk.faq.service.impl;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.stream.IntStream;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bookjuk.faq.domain.Faq;
import com.bookjuk.faq.dto.FaqDto;
import com.bookjuk.faq.repository.FaqRepository;
import com.bookjuk.faq.service.FaqService;
import com.bookjuk.model.dto.PageDto;

import lombok.RequiredArgsConstructor;

@Transactional
@RequiredArgsConstructor
@Service
public class FaqServiceImpl implements FaqService {
  
  private final FaqRepository faqRepository;
  private final ModelMapper modelMapper;
  private final PageDto pageDto;
  
  @Transactional(readOnly = true)
  @Override
  public Map<String, Object> findFaqList(Pageable pageable) {
    pageDto.setPaging(pageable.getPageNumber(), pageable.getPageSize(), (int)faqRepository.count());
    pageable = pageable.withPage(pageable.getPageNumber() - 1);
    Page<Faq> faqList = faqRepository.findAll(pageable);
    return Map.of("faqList", faqList.map(faq -> modelMapper.map(faq, FaqDto.class)).toList()
                , "pageList", IntStream.rangeClosed(pageDto.getBeginPage(), pageDto.getEndPage()).boxed().toList()
                , "pageDto", pageDto);
  }
  
  @Override
  public FaqDto registFaq(FaqDto faqDto) {
    Faq faq = modelMapper.map(faqDto, Faq.class);
    faqRepository.save(faq);
    return faqDto;
  }
  
  @Transactional(readOnly = true)
  @Override
  public FaqDto findFaqById(Integer id) {    
    Faq faq = faqRepository.findById(id).orElseThrow(IllegalArgumentException::new);
    return modelMapper.map(faq, FaqDto.class);
  }
  
  @Override
  public FaqDto modifyFaq(FaqDto faqDto) {
    Faq faq = faqRepository.findById(faqDto.getFaqId()).orElseThrow(IllegalArgumentException::new);    // () -> new IllegalArgumentException() 
    faq.setFaqTitle(faqDto.getFaqTitle());
    faq.setFaqContent(faqDto.getFaqContent());
    faqDto.setFaqUpdateDt(LocalDateTime.now());
    faq.setFaqUpdateDt(faqDto.getFaqUpdateDt());
    return faqDto;
  }
  
  @Override
  public void deleteFaqById(Integer id) {
    faqRepository.deleteById(id);
  }
  
  
}
