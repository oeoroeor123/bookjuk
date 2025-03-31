package com.bookjuk.upload;

import java.util.Map;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import com.bookjuk.model.message.ResponseMessage;
import com.bookjuk.upload.sevice.UploadService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@Tag(name = "이미지 업로드", description = "이미지 업로드 API")
@RequiredArgsConstructor
@RestController
public class UploadController {

  private final UploadService uploadService;

  @Operation(summary = "이미지 업로드", description = "IMGBB 서버에 이미지를 업로드하는 기능입니다.")
  @PostMapping(value = "/upload/image", produces = "application/json")
  public ResponseMessage registQnaReply(MultipartHttpServletRequest multipartRequest) {
    return ResponseMessage.builder()
        .status(200)
        .message("이미지 업로드 성공")
        .results(Map.of("imgUrl", uploadService.imgUpload(multipartRequest)))
        .build();
  }

}
