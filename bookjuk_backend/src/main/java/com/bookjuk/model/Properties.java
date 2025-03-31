package com.bookjuk.model;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class Properties {

  public static String portoneSecretApi;
  public static String portoneSecretWebhook;
  public static String naverClientId;
  public static String naverClientSecret;
  public static String imgbbApiKey;

  @Value("${portone.secret.api}")
  public void setPortoneSecretApi(String portoneSecretApi) {
    Properties.portoneSecretApi = portoneSecretApi;
  }

  @Value("${portone.secret.webhook}")
  public void setPortoneSecretWebhook(String portoneSecretWebhook) {
    Properties.portoneSecretWebhook = portoneSecretWebhook;
  }

  @Value("${Naver.client-id}")
  public void setNaverClientId(String naverClientId) {
    Properties.naverClientId = naverClientId;
  }

  @Value("${Naver.client-secret}")
  public void setNaverClientSecret(String naverClientSecret) {
    Properties.naverClientSecret = naverClientSecret;
  }

  @Value("${imgbb.app.key}")
  public void setImgbbApiKey(String imgbbApiKey) {
    Properties.imgbbApiKey = imgbbApiKey;
  }

}
