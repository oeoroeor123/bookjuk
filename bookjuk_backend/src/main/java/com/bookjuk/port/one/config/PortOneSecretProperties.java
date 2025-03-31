package com.bookjuk.port.one.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("portone.secret")
public record PortOneSecretProperties(String api, String webhook) {
}