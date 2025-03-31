package com.bookjuk.secondhand.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Value;
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
import com.bookjuk.model.message.ResponseMessage;
import com.bookjuk.secondhand.service.SecondhandService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;


@RequiredArgsConstructor
@RestController
@Tag(name = "중고상품", description = "중고상품 API")
public class SecondhandController {

  private final SecondhandService secondhandService;
  
  @Value("${spring.servlet.multipart.location}")
  private String uploadDir;
  
  @Operation(summary = "중고상품 목록 조회", description = "중고상품 목록을 확인하는 기능입니다.")
  @GetMapping(value = "/secondhand", produces = "application/json")
  public ResponseMessage list(Pageable pageable) {
    return ResponseMessage.builder()
                          .status(200)
                          .message("중고상품 목록 조회 성공")
                          .results(secondhandService.findSecondhandList(pageable))
                          .build();
  }
  
  @Operation(summary = "중고상품상품 검색", description = "중고상품 목록을 검색하는 기능입니다.")
  @GetMapping(value = "/secondhand/search", produces = "application/json")
  public ResponseMessage getSecondhandSearchList(
      Pageable pageable, @RequestParam(required = false) String search,
      @RequestParam(required = false) String keyword,
      @RequestParam(required = false, defaultValue = "1") String page,
      @RequestParam(required = false, defaultValue = "10") String display,
      @RequestParam(required = false, defaultValue = "secondhandId,DESC") String sort
      ) {
    return ResponseMessage.builder()
                          .status(200)
                          .message("중고상품 리스트 검색 성공")
                          .results(secondhandService.secondhandSearchList(
                              pageable, search, keyword, page, display, sort.split(",")[1]
                           ))
                          .build();
  }
  
  @Operation(summary = "중고상품 상세 조회", description = "중고상품 상세 내용을 확인하는 기능입니다.")
  @GetMapping(value = "/secondhand/detail/{id}", produces = "application/json")
  public ResponseMessage detail(@PathVariable(name = "id") Integer id) {
    return ResponseMessage.builder()
                          .status(200)
                          .message("중고상품 상세 조회 성공")
                          .results(Map.of("secondhand", secondhandService.findSecondhandById(id)))
                          .build();
  }  
  
  @Operation(summary = "중고상품 등록", description = "중고상품을 등록하는 기능입니다.")
  @PostMapping(value = "/secondhand/regist", produces = "application/json", consumes = "multipart/form-data")
  public ResponseMessage regist(@RequestParam(value = "imgFile", required = false) MultipartFile multipartFile
                              , @RequestParam("secondhand") String secondhandInsertDtoJson 
                              , @RequestParam("imageUrls") String imageUrlsJson) {            
    return ResponseMessage.builder()
                          .status(200)
                          .message("중고상품 등록 성공")
                          .results(Map.of("secondhand", secondhandService.registSecondhand(secondhandInsertDtoJson, multipartFile, imageUrlsJson)))
                          .build();
  }
  
  @Operation(summary = "중고상품 수정", description = "중고상품을 수정하는 기능입니다.")
  @PutMapping(value = "/secondhand/modify", produces = "application/json", consumes = "multipart/form-data")
  public ResponseMessage modify(@RequestParam(value = "imgFile", required = false) MultipartFile multipartFile
                              , @RequestParam("secondhand") String secondhandDtoJson
                              , @RequestParam("imageUrls") String imageUrlsJson) {           
    return ResponseMessage.builder()
                          .status(200)
                          .message("중고상품 수정 성공")
                          .results(Map.of("secondhand", secondhandService.modifySecondhand(secondhandDtoJson, multipartFile, imageUrlsJson)))
                          .build();
  }
  
  @Operation(summary = "중고상품 삭제", description = "중고상품을 삭제하는 기능입니다.")
  @DeleteMapping(value = "/secondhand/delete/{id}", produces = "application/json")
  public ResponseMessage delete(@PathVariable(name = "id") Integer id) { 
    secondhandService.deleteSecondhandById(id);
    return ResponseMessage.builder()
                          .status(200)
                          .message("중고상품 삭제 성공")
                          .results(null)
                          .build();
  }
  
  
  @Operation(summary = "중고상품 장르 목록 조회", description = "중고상품 장르 목록을 확인하는 기능입니다.")
  @GetMapping(value = "/secondhand/genre", produces = "application/json")
  public ResponseMessage genreList() {
    return ResponseMessage.builder()
                          .status(200)
                          .message("장르 목록 조회 성공")
                          .results(Map.of("genreList", secondhandService.findGenreList()))
                          .build();
  }

  @Operation(summary = "중고상품 이미지 경로 조회", description = "중고상품의 대표이미지 경로를 조회하는 기능입니다.")
  @GetMapping("/secondhandimg/{year}/{month}/{day}/{fileName}")
  public ResponseEntity<Resource> getImage(@PathVariable String year,
                                           @PathVariable String month,
                                           @PathVariable String day,
                                           @PathVariable String fileName) {   
      try {
          // 이미지 파일의 실제 경로를 지정합니다.
          Path imagePath = Paths.get(uploadDir + "upload/" + year + "/" + month + "/" + day + "/" + fileName);
          File imageFile = imagePath.toFile();
          //System.out.println(imagePath.toString());
          
          if (!imageFile.exists()) { 
              return ResponseEntity.notFound().build();
          }

          // 파일을 반환합니다.
          Resource resource = new FileSystemResource(imageFile);

          return ResponseEntity.ok()
                  .contentType(MediaType.IMAGE_JPEG)  // 적절한 이미지 MIME 타입으로 설정
                  .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + fileName + "\"")
                  .body(resource);
      } catch (Exception e) {
          return ResponseEntity.internalServerError().build();
      }
  }
  
  @PostMapping("/quill/upload")
  public ResponseEntity<?> uploadImage(@RequestParam("file") MultipartFile multipartFile) throws IOException {
    if (multipartFile.isEmpty()) {
        return ResponseEntity.badRequest().body("파일이 비어있습니다.");
    }
            
    String fileUrl = secondhandService.uploadImage(multipartFile);
    System.out.println(fileUrl);
    
    return ResponseEntity.ok()
                         .body("{\"url\":\"" + fileUrl + "\"}");
  }

  @PostMapping("quill/upload/urls")
  public ResponseEntity<String> deleteUploadImageUrls(@RequestBody Map<String, List<String>> requestBody) {
      List<String> imageUrls = requestBody.get("imageUrls");            
      secondhandService.deleteUploadImageUrls(imageUrls);
      
      // 처리 후 응답을 반환
      return ResponseEntity.ok("이미지 URL로 성공적으로 삭제되었습니다.");
  }
  
  
}
