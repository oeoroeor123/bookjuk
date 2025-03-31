package com.bookjuk.user.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bookjuk.model.dto.UserRole;

import com.bookjuk.user.dto.UserDto;
import com.bookjuk.user.model.CustomUserDetails;
import com.bookjuk.user.service.SocialService;
import com.bookjuk.user.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
public class SocialController {

  private final UserService userService; 
  private final SocialService socialService;
  private final BCryptPasswordEncoder bCryptPasswordEncoder;
  
  
  @GetMapping("/api/user/kakao")
  public Map<String, Object> kakaoLogin(@RequestParam(name = "accessToken") String accessToken) {
    return socialService.getKakaoUser(accessToken);
  }
  
  
  @PostMapping("/api/user/naver")
  public ResponseEntity<Map<String, Object>> getnaverLogin(@RequestBody Map<String, Object> request) {
    String code = (String) request.get("code");
    String state = (String) request.get("state");
    /*System.out.println("code:" + code);
    System.out.println("state:" + state);*/
    Map<String, Object> response = socialService.getNaverToken(code, state);
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }
  
  
  
  // 카카오 간편 가입
  @PostMapping("/api/user/easySignup") 
  public ResponseEntity<Map<String, Object>> easySignup(@RequestBody Map<String, String> param) {
    String email = param.get("email");
    String nickname = param.get("nickname");
    String password = param.get("password");

    // 회원가입 처리
    UserDto newUser = new UserDto();
    newUser.setUserEmail(email);
    newUser.setUserNickname(nickname);
    newUser.setUserPw(bCryptPasswordEncoder.encode(password)); // 사용자가 설정한 비밀번호 저장
    newUser.setUserRole(UserRole.USER);

    userService.saveUser(newUser);

    // 회원가입 후 로그인 처리
    return ResponseEntity.ok().body(Map.of("message", "회원가입 완료", "user", newUser));
  }
  
  
  // 네이버 간편 가입
  @PostMapping("/api/user/naverSignup") 
  public ResponseEntity<Map<String, Object>> naverSignup(@RequestBody Map<String, String> body) {
    String email = body.get("email");
    String nickname = body.get("nickname");
    String password = body.get("password");
    System.out.println(email);
    System.out.println(nickname);
    System.out.println(password);
    
    // 회원가입 처리
    UserDto newUser = new UserDto();
    newUser.setUserEmail(email);
    newUser.setUserNickname(nickname);
    newUser.setUserPw(bCryptPasswordEncoder.encode(password)); // 사용자가 설정한 비밀번호 저장
    newUser.setUserRole(UserRole.USER);

    userService.saveUser(newUser);
    

    // 회원가입 후 로그인 처리
    return ResponseEntity.ok().body(Map.of("message", "회원가입 완료", "user", newUser));
  }
  
  
}
