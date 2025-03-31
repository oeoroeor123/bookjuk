package com.bookjuk.order.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;
import lombok.Data;

@Data
@Component
@ConfigurationProperties(prefix = "portone.secret")
public class PortOneSecretProperties {

//  @Value("${portone.secret.api}")
  private String api ="pWw5BI1fPoncJnEuZ6PF5ILF9Svx3hLEu2UaAg72S5XJbJa5yEHgQFAT5eYVXJRjUnhypozpWzhHvGeg";
//  @Value("${portone.secret.webhook}")
  private String webhook ="whsec_+wCY1q64BB0Mm2BzrPr4UXIIA3UDowwJu6SIE4e8S14=";

}
