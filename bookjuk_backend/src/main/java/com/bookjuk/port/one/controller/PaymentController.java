package com.bookjuk.port.one.controller;

import com.bookjuk.config.KeyStore;
import com.bookjuk.port.one.Payment;
import com.bookjuk.port.one.request.CompletePaymentRequest;
import com.bookjuk.port.one.request.SyncPaymentException;
import com.bookjuk.port.one.service.IPaymentService;
import io.swagger.v3.oas.annotations.tags.Tag;
import kotlin.Unit;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.Map;

/**
 * PaymentController는 결제 완료 요청과 웹훅 요청을 처리합니다.
 * 클라이언트(브라우저 또는 PG사)에서 요청한 결제 결과를 받아 서비스 레이어로 전달합니다.
 */
@RestController
@RequiredArgsConstructor
@Tag(name = "포트원", description = "포트원 API")
public final class PaymentController {

  // 서비스 인터페이스를 통해 결제 관련 비즈니스 로직을 위임합니다.
  private final IPaymentService paymentService;
  
  private final KeyStore keyStore;

  /**
   * 인증 결제(결제창을 이용한 결제)를 위한 엔드포인트입니다.
   * 결제 수단 및 PG사 사정에 따라 결제 완료 후 승인이 지연될 수 있으므로,
   * 결제 정보를 완전히 실시간으로 얻기 위해서는 웹훅을 사용해야 합니다.
   */
  @PostMapping("/api/payment/complete")
  public Mono<Payment> completePayment(@RequestBody CompletePaymentRequest completeRequest) {
    return paymentService.syncPayment(completeRequest.paymentId);
  }

  /**
   * 결제 정보를 실시간으로 전달받기 위한 웹훅 엔드포인트입니다.
   */
  @PostMapping("/api/payment/webhook")
  public Mono<Unit> handleWebhook(
      @RequestBody String body,
      @RequestHeader("webhook-id") String webhookId,
      @RequestHeader("webhook-timestamp") String webhookTimestamp,
      @RequestHeader("webhook-signature") String webhookSignature
  ) throws SyncPaymentException {
    return paymentService.handleWebhook(body, webhookId, webhookTimestamp, webhookSignature);
  }

  /**
   * 포트원 관련 KeyStore 설정값을 프론트엔드로 전달하는 테스트용 API
   */
  @GetMapping("/api/payment/config")
  public ResponseEntity<Map<String, String>> getPortoneConfig() {
    return ResponseEntity.ok(Map.of(
        "portoneSecretApi", keyStore.getPortoneSecretApi(),
        "portoneSecretWebhook", keyStore.getPortoneSecretWebhook()
    ));
  }
}
