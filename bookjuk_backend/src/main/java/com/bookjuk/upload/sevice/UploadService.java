package com.bookjuk.upload.sevice;

import java.util.concurrent.CompletableFuture;
import org.springframework.web.multipart.MultipartHttpServletRequest;

public interface UploadService {

  /**
   * 이미지 업로드
   * 
   * @param  multipartRequest name : base64Image, base64 형식의 이미지를 받아서 서버에 업로드
   * 
   * @return                  String Image URL
   */
  CompletableFuture<String> imgUpload(MultipartHttpServletRequest multipartRequest);

}
