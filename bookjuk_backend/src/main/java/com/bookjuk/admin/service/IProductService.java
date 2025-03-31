package com.bookjuk.admin.service;

import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.bookjuk.admin.domain.Author;
import com.bookjuk.admin.dto.AuthorDto;
import com.bookjuk.admin.dto.GenreDto;
import com.bookjuk.admin.dto.ProductDto;
import com.bookjuk.admin.dto.ProductRequestDto;
import com.bookjuk.admin.dto.PublisherDto;

public interface IProductService {
  
  /**
   *  상품목록 목록 조회
   * 
   * @param  pageable
   * 
   * @return
   */
  Map<String, Object> findProductList(Pageable pageable); 
  
  /**
   * 특정 상품 상세 조회
   * 
   * @param  productId
   * 
   * @return
   */
  ProductDto findProductById(Integer productId);
  
  /**
   * 상품 등록
   * 
   * @param  productInsertDtoJson
   * @param  multipartFile
   * 
   * @return
   */
  ProductRequestDto registProduct(String productInsertDtoJson, MultipartHttpServletRequest multipartFile, String imageUrlsJson); 
  
  /**
   *  상품 수정
   * 
   * @param  productInsertDtoJson
   * @param  multipartFile
   * 
   * @return
   */
  ProductDto modifyProduct(String productDtoJson, MultipartHttpServletRequest multipartFile, String imageUrlsJson); 
  
  /**
   *  상품 삭제
   * 
   * @param  productId
   * @return
   */
  void deleteProductById(Integer productId); 
 
  /**
   *  상품 검색 조회
   * 
   * @param  pageable
   * @param  value
   * @param  keyword
   * @param  sort
   * @param  display
   * @param  page
   * 
   * @return
   */
  Map<String, Object> getProductSearchList(
      Pageable pageable, String search, String keyword, String page, String display, String sort
  );

  
  // 상품 장르 리스트 조회
  List<GenreDto> findGenreList();
  
  // 상품 작가 리스트 조회
  List<AuthorDto> findAuthorList();
  
  /**
   * 작가 검색
   * 
   * @param searchAuthor 검색어
   * @return 검색된 작가 목록
   */
  List<AuthorDto> searchAuthors(String searchAuthor);
  
  // 상품 출판사 리스트 조회
  List<PublisherDto> findPublisherList();
  
  /**
   * 출판사 검색
   * 
   * @param searchPublisher 검색어
   * @return 검색된 출판사 목록
   */
  List<PublisherDto> searchPublisher(String searchPublisher);
  
  /**
   * 신규 작가 등록
   * 
   * @param authorDto 작가 정보
   * @return 등록된 작가 정보
   */
  AuthorDto createAuthor(AuthorDto authorDto);
  
  /**
   * 신규 출판사 등록
   * 
   * @param authorDto 작가 정보
   * @return 등록된 작가 정보
   */
  PublisherDto createPublisher(PublisherDto publisherDto);
 
  String uploadImage(MultipartFile multipartFile);
  
  void deleteUploadImageUrls(List<String> imageUrls);
}

