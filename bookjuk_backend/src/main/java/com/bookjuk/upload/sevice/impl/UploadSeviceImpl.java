package com.bookjuk.upload.sevice.impl;

import java.util.UUID;
import java.util.concurrent.CompletableFuture;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import com.bookjuk.api.imgbb.ImgbbUploadClient;
import com.bookjuk.api.imgbb.parameter.UploadParameters;
import com.bookjuk.api.imgbb.response.OptionalResponse;
import com.bookjuk.model.Properties;
import com.bookjuk.upload.sevice.UploadService;
import lombok.RequiredArgsConstructor;

@Transactional
@RequiredArgsConstructor
@Service
public class UploadSeviceImpl implements UploadService {

  /**
   * 이미지 업로드
   * 
   * @param  multipartRequest name : base64Image, base64 형식의 이미지를 받아서 서버에 업로드
   * 
   * @return                  이미지 URL
   */
  @Async
  @Override
  public CompletableFuture<String> imgUpload(MultipartHttpServletRequest multipartRequest) {
    String imgUrl      = "";
    String base64Image = multipartRequest.getParameter("base64Image");

    return CompletableFuture.supplyAsync(() -> {
      try {
        if (base64Image == null || base64Image.trim().isEmpty()) {
          return imgUrl;
        }

        // Base64 헤더 제거
        String cleanBase64 = base64Image.replaceFirst("^data:image/\\w+;base64,", "");
        
        // 이미지 업로드 처리
        UploadParameters parameters = new UploadParameters.Builder()
            .apiKey(Properties.imgbbApiKey)
            .imageName(UUID.randomUUID().toString())
            .imageBase64(cleanBase64)
            .build();

        OptionalResponse response = ImgbbUploadClient.upload(parameters);

        if (response.get().isUploadedSuccess()) {
          return response.get().getResponseData().getImageUrl();
        }
        else {
          throw new RuntimeException("Upload failed: " + response.get().getRequestStatus());
        }
      }
      catch (Exception e) {
        throw new RuntimeException("Image upload error", e);
      }
    });
  }

}
