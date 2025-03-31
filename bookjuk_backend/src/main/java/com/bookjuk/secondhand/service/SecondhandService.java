package com.bookjuk.secondhand.service;

import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;

import com.bookjuk.admin.dto.GenreDto;
import com.bookjuk.secondhand.dto.SecondhandDto;
import com.bookjuk.secondhand.dto.SecondhandInsertDto;


public interface SecondhandService {
  Map<String, Object> findSecondhandList(Pageable pageable);
  Map<String, Object> secondhandSearchList(Pageable pageable, String search, String keyword, String page, String display, String sort);
  SecondhandDto findSecondhandById(Integer id);
  SecondhandInsertDto registSecondhand(String secondhandInsertDtoJson, MultipartFile multipartFile, String imageUrlsJson);
  SecondhandDto modifySecondhand(String secondhandDtoJson, MultipartFile multipartFile, String imageUrlsJson);
  void deleteSecondhandById(Integer id);
  List<GenreDto> findGenreList();
  String uploadImage(MultipartFile multipartFile);  
  void deleteUploadImageUrls(List<String> imageUrls);
}
