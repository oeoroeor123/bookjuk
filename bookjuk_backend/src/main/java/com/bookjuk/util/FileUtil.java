package com.bookjuk.util;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.UUID;
import org.springframework.stereotype.Component;

/**
 * 파일 업로드 경로와 저장 이름을 반환하는 클래스
 */
@Component
public class FileUtil {

  /** 현재 날짜 */
  private LocalDate today = LocalDate.now();

  /**
   * 파일 업로드 경로를 반환하는 메소드
   * 
   * @return 현재 날짜를 경로로 사용. ex) /upload/2024/12/12
   */
  public String getFilePath() {
    return "/upload" + DateTimeFormatter.ofPattern("/yyyy/MM/dd").format(today);
  }

  /**
   * 어제 날짜의 경로를 반환하는 메소드
   * 
   * @return
   */
  public String getYesterdayLectureFilePath() {
    return "/upload" + DateTimeFormatter.ofPattern("/yyyy/MM/dd").format(today.minusDays(1));
  }

  /**
   * 파일 저장 이름을 반환하는 메소드
   * 
   * @param  originalFilename 파일의 원래 이름
   * 
   * @return                  파일의 저장 이름. 중복 방지를 위해서 난수 처리된 이름을 사용(UUID). 파일의 원래 확장자를 그대로 사용
   */
  public String getFilesystemName(String originalFilename) {
    String extensionName = "";
    if (originalFilename.endsWith(".tar.gz")) {
      extensionName = "tar.gz";
    }
    else {
      // 마지막 . 표부터 끝까지
      extensionName = originalFilename.substring(originalFilename.lastIndexOf("."));
    }
    return UUID.randomUUID().toString() + extensionName;
  }

}
