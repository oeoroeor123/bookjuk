package com.bookjuk.admin.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.bookjuk.admin.dto.AuthorDto;
import com.bookjuk.admin.dto.PublisherDto;
import com.bookjuk.admin.service.IProductService;
import com.bookjuk.model.message.ResponseMessage;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor 
@RestController
@Tag(name = "상품관리자", description = "상품관리자 메뉴 API")
public class ProductController {
  
  private final IProductService productService;
  
  @Operation(summary = "상품 리스트 조회", description = "관리자 상품관리 - 상품 리스트를 확인하는 기능입니다.")
  @GetMapping(value = "/admin/products", produces = "application/json")
  public ResponseMessage findAll(Pageable pageable) {
    return ResponseMessage.builder()
        .status(200)
        .message("상품 목록 조회 성공")
        .results(productService.findProductList(pageable))
        .build();
  }     
      
  @Operation(summary = "상품 상세 조회", description = "관리자 상품관리 - 상품 상세 내용을 확인하는 기능입니다.")
  @GetMapping(value = "/admin/products/detail/{productId}", produces = "application/json")
  public ResponseMessage findByProductId(@PathVariable(name = "productId") Integer productId) {
    return ResponseMessage.builder()
        .status(200)
        .message("상품 상세 조회 성공")
        .results(Map.of("product", productService.findProductById(productId)))
        .build();
  }

  @Operation(summary = "상품 등록", description = "관리자 상품관리 - 상품을 등록하는 기능입니다.")
  @PostMapping(value = "/admin/products/regist", produces = "application/json", consumes = "multipart/form-data")
  public ResponseMessage regist(MultipartHttpServletRequest multipartFile
                              , @RequestParam("product") String productRequestDtoJson
                              , @RequestParam("imageUrls") String imageUrlsJson) {            
    return ResponseMessage.builder()
                          .status(200)
                          .message("상품 등록 성공")
                          .results(Map.of("product", productService.registProduct(productRequestDtoJson, multipartFile, imageUrlsJson)))
                          .build();
  }
  
  @Operation(summary = "상품 수정", description = "관리자 상품관리 - 상품정보를 수정하는 기능입니다.")
  @PutMapping(value = "/admin/products/edit", produces = "application/json", consumes = "multipart/form-data")
  public ResponseMessage modify(MultipartHttpServletRequest multipartFile
                              , @RequestParam("product") String productDtoJson
                              , @RequestParam("imageUrls") String imageUrlsJson) {           
    return ResponseMessage.builder()
        .status(200)
        .message("상품 수정 성공")
        .results(Map.of("product", productService.modifyProduct(productDtoJson, multipartFile, imageUrlsJson)))
        .build();
  }
    
  @Operation(summary = "상품 삭제", description = "관리자 상품관리 - 상품을 삭제하는 기능입니다.")
  @DeleteMapping(value = "/admin/products/delete/{productId}", produces = "application/json")
  public ResponseMessage delete(@PathVariable(name = "productId") Integer productId) {
    productService.deleteProductById(productId);
    return ResponseMessage.builder()
        .status(200)
        .message("상품 삭제 성공")
        .results(null)
        .build();
  }
    
  @Operation(summary = "상품 검색", description = "상품 목록을 검색하는 기능입니다.")
  @GetMapping(value = "/admin/products/search", produces = "application/json")
  public ResponseMessage getProductSearchList(
      Pageable pageable, @RequestParam(required = false) String search,
      @RequestParam(required = false) String keyword,
      @RequestParam(required = false, defaultValue = "1") String page,
      @RequestParam(required = false, defaultValue = "10") String display,
      @RequestParam(required = false, defaultValue = "productId,DESC") String sort
      ) {
    return ResponseMessage.builder()
        .status(200)
        .message("상품 리스트 검색 성공")
        .results(
            productService.getProductSearchList(
                pageable, search, keyword, page, display, sort.split(",")[1]
                )
            )
        .build();
  }
  
  @Operation(summary = "상품 장르 목록 조회", description = "상품 장르 목록을 확인하는 기능입니다.")
  @GetMapping(value = "/admin/products/genre", produces = "application/json")
  public ResponseMessage genreList() {
    return ResponseMessage.builder()
        .status(200)
        .message("장르 목록 조회 성공")
        .results(Map.of("genreList", productService.findGenreList()))
        .build();
  }
  
  
  @Operation(summary = "상품 작가 목록 조회", description = "상품 작가 목록을 확인하는 기능입니다.")
  @GetMapping(value = "/admin/products/authors", produces = "application/json")
  public ResponseMessage findAuthors() {
    return ResponseMessage.builder()
        .status(200)
        .message("작가 목록 조회 성공")
        .results(Map.of("authorList", productService.findAuthorList()))
        .build();
  }
  
  @Operation(summary = "작가 검색", description = "작가명을 기준으로 작가 목록을 검색합니다.")
  @GetMapping(value = "/admin/products/authors/search", produces = "application/json")
  public ResponseMessage searchAuthors(@RequestParam String searchAuthor) {

      return ResponseMessage.builder()
              .status(200) 
              .message("작가 검색 성공")
              .results(Map.of("authorSearchList", productService.searchAuthors(searchAuthor))) 
              .build();
  }
  
  @Operation(summary = "신규 작가 등록", description = "새로운 작가를 등록합니다.")
  @PostMapping(value = "/admin/products/authors/new", produces = "application/json")
  public ResponseMessage createAuthor(@RequestBody AuthorDto authorDto) {

          return ResponseMessage.builder()
                  .status(200) 
                  .message("신규 작가 등록 성공") 
                  .results(Map.of("newAuthor", productService.createAuthor(authorDto))) 
                  .build();
  }
  
   
  @Operation(summary = "상품 출판사 목록 조회", description = "상품 출판사 목록을 확인하는 기능입니다.")
  @GetMapping(value = "/admin/products/publishers", produces = "application/json")
  public ResponseMessage findPublishers() {
    return ResponseMessage.builder()
        .status(200)
        .message("출판사 목록 조회 성공")
        .results(Map.of("publisherList", productService.findPublisherList()))
        .build();
  }
  
  @Operation(summary = "출판사 검색", description = "출판사명을 기준으로 출판사 목록을 검색합니다.")
  @GetMapping(value = "/admin/products/publishers/search", produces = "application/json")
  public ResponseMessage searchPublisher(@RequestParam String searchPublisher) {

      return ResponseMessage.builder()
              .status(200) 
              .message("출판사 검색 성공")
              .results(Map.of("publisherSearchList", productService.searchPublisher(searchPublisher))) 
              .build();
  }
  
  @Operation(summary = "신규 출판사 등록", description = "새로운 출판사를 등록합니다.")
  @PostMapping(value = "/admin/products/publishers/new", produces = "application/json")
  public ResponseMessage createPublisher(@RequestBody PublisherDto publisherDto) {

          return ResponseMessage.builder()
                  .status(200) 
                  .message("신규 출판사 등록 성공") 
                  .results(Map.of("newPublisher", productService.createPublisher(publisherDto))) 
                  .build();
  }
  
  @Operation(summary = "이미지 경로 조회", description = "상품의 대표이미지 경로를 조회하는 기능입니다.")
  @GetMapping("/image/{year}/{month}/{day}/{imageFileName}")
  public ResponseEntity<Resource> getImage(@PathVariable String year,
      @PathVariable String month,
      @PathVariable String day,
      @PathVariable String imageFileName) {   
    try {
      // 이미지 파일의 실제 경로
      Path imagePath = Paths.get("D:/upload/"+ year + "/" + month + "/" + day + "/" + imageFileName);
      File imageFile = imagePath.toFile();
      
      if (!imageFile.exists()) {
        return ResponseEntity.notFound().build();
      }
      
      // 파일 리소스 반환
      Resource resource = new FileSystemResource(imageFile);
      
      // 확장자에 따라 Content-Type 자동 설정
      String contentType = Files.probeContentType(imagePath);
      if (contentType == null) {
        contentType = "application/octet-stream"; // 기본값
      }
      
      return ResponseEntity.ok()
          .contentType(MediaType.parseMediaType(contentType))  // 동적으로 MIME 타입 설정
          .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + imageFileName + "\"")
          .body(resource);
    } catch (Exception e) {
      return ResponseEntity.internalServerError().build();
    }
  }
  
  @PostMapping("/admin/products/quill/upload")
  public ResponseEntity<?> uploadImage(@RequestParam("file") MultipartFile multipartFile) throws IOException {
    if (multipartFile.isEmpty()) {
        return ResponseEntity.badRequest().body("파일이 비어있습니다.");
    }
            
    String fileUrl = productService.uploadImage(multipartFile);
    System.out.println(fileUrl);
    
    return ResponseEntity.ok()
                         .body("{\"url\":\"" + fileUrl + "\"}");
  }

  @PostMapping("/admin/products/quill/upload/urls")
  public ResponseEntity<String> deleteUploadImageUrls(@RequestBody Map<String, List<String>> requestBody) {
      List<String> imageUrls = requestBody.get("imageUrls");            
      productService.deleteUploadImageUrls(imageUrls);
      
      // 처리 후 응답을 반환
      return ResponseEntity.ok("이미지 URL로 성공적으로 삭제되었습니다.");
  }
  
  
  
}


        
  
    
  

