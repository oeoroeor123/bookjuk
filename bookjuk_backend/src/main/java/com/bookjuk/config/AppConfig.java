package com.bookjuk.config;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;

@Configuration
public class AppConfig {

  private static final DateTimeFormatter DATE_TIME_FORMATTER =
          DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

  private final Environment env;

  public AppConfig(Environment env) {
      this.env = env;
  }

  @Bean
  public KeyStore keyStore() {
      return new KeyStore(
          env.getProperty("portone.secret-api"),
          env.getProperty("portone.secret-webhook"),
          env.getProperty("kakao.client-id"),
          env.getProperty("kakao.client-secret"),
          env.getProperty("naver.client-id"),
          env.getProperty("naver.client-secret"),
          env.getProperty("naver.redirect-uri"),
          env.getProperty("naver.token-uri"),
          env.getProperty("imgbb.app-key")
  );
}

  @Bean
  public ModelMapper modelMapper() {
       return new ModelMapper();
  }

  @Bean
  public ObjectMapper objectMapper() {
         ObjectMapper mapper = new ObjectMapper();
         JavaTimeModule module = new JavaTimeModule();

         module.addSerializer(LocalDateTime.class, new LocalDateTimeSerializer(DATE_TIME_FORMATTER));
         module.addDeserializer(LocalDateTime.class, new LocalDateTimeDeserializer(DATE_TIME_FORMATTER));
         module.addSerializer(LocalDate.class, new LocalDateSerializer(DateTimeFormatter.ISO_DATE));
         module.addDeserializer(LocalDate.class, new LocalDateDeserializer(DateTimeFormatter.ISO_DATE));

         mapper.registerModule(module);
          return mapper;
  }
}
