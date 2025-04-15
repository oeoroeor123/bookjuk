package com.bookjuk.config;

public class KeyStore {

  private final String portoneSecretApi;
  private final String portoneSecretWebhook;

 private final String kakaoClientId;
 private final String kakaoClientSecret;

 private final String naverClientId;
 private final String naverClientSecret;
 private final String naverRedirectUri;
 private final String naverTokenUri;

 private final String imgbbAppKey;

 public KeyStore(
         String portoneSecretApi,
         String portoneSecretWebhook,
         String kakaoClientId,
         String kakaoClientSecret,
         String naverClientId,
         String naverClientSecret,
         String naverRedirectUri,
         String naverTokenUri,
         String imgbbAppKey
) {
  this.portoneSecretApi = portoneSecretApi;
  this.portoneSecretWebhook = portoneSecretWebhook;
  this.kakaoClientId = kakaoClientId;
  this.kakaoClientSecret = kakaoClientSecret;
  this.naverClientId = naverClientId;
  this.naverClientSecret = naverClientSecret;
  this.naverRedirectUri = naverRedirectUri;
  this.naverTokenUri = naverTokenUri;
  this.imgbbAppKey = imgbbAppKey;
}


  public String getPortoneSecretApi() { return portoneSecretApi; }
  public String getPortoneSecretWebhook() { return portoneSecretWebhook; }

  public String getKakaoClientId() { return kakaoClientId; }
  public String getKakaoClientSecret() { return kakaoClientSecret; }

  public String getNaverClientId() { return naverClientId; }
  public String getNaverClientSecret() { return naverClientSecret; }
  public String getNaverRedirectUri() { return naverRedirectUri; }
  public String getNaverTokenUri() { return naverTokenUri; }

  public String getImgbbAppKey() { return imgbbAppKey; }
}
