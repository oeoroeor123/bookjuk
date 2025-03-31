package com.bookjuk.config;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
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

  @Bean
  ModelMapper modelMapper() {
    return new ModelMapper();
  }

  @Bean
  ObjectMapper objectMapper() {
    ObjectMapper   mapper = new ObjectMapper();
    JavaTimeModule module = new JavaTimeModule();

    // LocalDateTime 직렬화/역직렬화 설정
    module.addSerializer(
        LocalDateTime.class,
        new LocalDateTimeSerializer(DATE_TIME_FORMATTER)
    );
    module.addDeserializer(
        LocalDateTime.class,
        new LocalDateTimeDeserializer(DATE_TIME_FORMATTER)
    );

    // LocalDate 직렬화/역직렬화 설정
    module.addSerializer(LocalDate.class, new LocalDateSerializer(DateTimeFormatter.ISO_DATE));
    module.addDeserializer(LocalDate.class, new LocalDateDeserializer(DateTimeFormatter.ISO_DATE));

    mapper.registerModule(module);
    return mapper;
  }

}
