package com.bookjuk.user.service;

import java.util.Map;

public interface SocialService {

  Map<String, Object> getKakaoUser(String accessToken);

  Map<String, Object> getNaverUser(String accessToken);
  
  Map<String, Object> getNaverToken(String code, String state);

}
