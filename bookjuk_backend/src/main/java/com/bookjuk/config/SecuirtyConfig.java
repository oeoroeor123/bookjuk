package com.bookjuk.config;

import java.util.Arrays;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
@Configuration
public class SecuirtyConfig {
  
  @Bean
  CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedHeaders(Arrays.asList("Origin", "Cache-Control", "Accept", "X-Requested-With", "Content-Type", "Access-Control-Request-Method", "Access-Control-Request-Headers", "Authorization"));
    configuration.setAllowedMethods(Arrays.asList("HEAD", "OPTIONS", "GET", "POST", "PUT", "DELETE", "PATCH"));
    configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000")); // 리액트 서버
    configuration.setAllowCredentials(true);
    
    return request -> configuration;
  }
  
  
  /*
   *  SecurityFilterChain
   *  Spring Security 의 기본 애플리케이션 보안 구성을 담당합니다.
   *  사용자가 SecurityFilterChain 빈을 등록하면 Spring Security 의 보안 구성을 비활성화하고
   *  사용자가 직접 보안 구성을 정의할 수 있습니다.
   */
  
  @Bean
  SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
    
    // CORS
    httpSecurity.cors(cors -> cors.configurationSource(corsConfigurationSource()));
        
    httpSecurity.authorizeHttpRequests(auth -> {
        auth//.requestMatchers("/admin/**").hasAuthority(UserRole.ADMIN.getUserRole()) // GET "/admin/**" 요청은 ADMIN userRole을 가진 사용자만 접근 가능합니다.
            .requestMatchers("/auth/**").authenticated()                             // GET "/auth/**" 요청은 인가된 사용자만 접근 가능합니다.
            .anyRequest().permitAll();
    });
    
    
        
    // 로그인 설정을 처리합니다.
    httpSecurity.formLogin(login -> {
      login.loginPage("/api/user/login")             // GET "/user/login" 요청 시로그인 페이지로 이동함
           .loginProcessingUrl("/user/login")    // POST "/user/login" 요청 시 로그인을 함
           .usernameParameter("userEmail")       // 로그인 폼에서 input 태그의 name이 userEmail로 설정되어야함
           .passwordParameter("userPw")          // 로그인 폼에서 input 태그의 name이 userPw로 설정되어야함
           .defaultSuccessUrl("/user/loginSuccess", true);       // 로그인 성공시 UserController에 있는 @GetMapping("/loginSuccess") 확인 가능합니다.       
    });
    
    //로그아웃을 관리합니다.
    httpSecurity.logout(logout -> {
      logout.logoutUrl("/user/logout")
            .logoutSuccessUrl("/user/logoutSuccess");
    });
    
    // csrf
    httpSecurity.csrf(csrf -> csrf.disable()); // http.csrf(AbstractHttpConfigurer::disable);
    
    return httpSecurity.build();
    
    
  }
  

  
  /*
   * BCrypt 암호화 메소드
   * 사용자 인증(로그인)시 비밀번호에 대해 단방향 해시 암호화를 진행하여 저장되어 있는 비밀번호와 대조한다.
   * 따라서 회원가입시 비밀번호 항목에 대해서 암호화를 진행해야 한다.
   * 
   * 스프링 시큐리티는 암호화를 위해 BCrypt Password Encoder 를 제공하고 권장한다. 
   * 따라서 해당 클래스를 return 하는 메소드를 만들어 @Bean으로 등록하여 사용하면 된다.
   */
  @Bean
  BCryptPasswordEncoder bCryptPasswordEncoder() { 
    return new BCryptPasswordEncoder();
  }
  
}
