package com.bookjuk.port.one.controller;

import com.bookjuk.port.one.Payment;
import com.bookjuk.port.one.request.CompletePaymentRequest;
import com.bookjuk.port.one.request.SyncPaymentException;
import com.bookjuk.port.one.service.IPaymentService;
import io.swagger.v3.oas.annotations.tags.Tag;
import kotlin.Unit;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

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

  /**
   * 인증 결제(결제창을 이용한 결제)를 위한 엔드포인트입니다.
   * 브라우저에서 결제 완료 후 서버에 결제 완료를 알리는 용도로 사용됩니다.
   * 결제 수단 및 PG사 사정에 따라 결제 완료 후 승인이 지연될 수 있으므로,
   * 결제 정보를 완전히 실시간으로 얻기 위해서는 웹훅을 사용해야 합니다.
   *
   * 인증 결제 연동 가이드: https://developers.portone.io/docs/ko/authpay/guide?v=v2
   *
   * @param completeRequest 결제 완료 요청 정보
   * @return Mono&lt;Payment&gt; 결제 상태를 포함한 비동기 응답
   */
  @PostMapping("/api/payment/complete")
  public Mono<Payment> completePayment(@RequestBody CompletePaymentRequest completeRequest) {
    return paymentService.syncPayment(completeRequest.paymentId);
  }

  /**
   * 결제 정보를 실시간으로 전달받기 위한 웹훅 엔드포인트입니다.
   * 관리자 콘솔에서 웹훅 정보를 등록해야 사용할 수 있습니다.
   *
   * 웹훅 연동 가이드: https://developers.portone.io/docs/ko/v2-payment/webhook?v=v2
   *
   * @param body 웹훅 요청 본문(텍스트)
   * @param webhookId 웹훅 ID
   * @param webhookTimestamp 웹훅 타임스탬프
   * @param webhookSignature 웹훅 서명
   * @return Mono&lt;Unit&gt; 웹훅 처리 결과
   * @throws SyncPaymentException 웹훅 검증 실패 시 발생하는 예외
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
}







