package com.bookjuk.port.one.service;

import com.bookjuk.order.dto.OrderDto;
import com.bookjuk.port.one.Payment;
import com.bookjuk.port.one.request.SyncPaymentException;
import kotlin.Unit;
import reactor.core.publisher.Mono;

/**
 * IPaymentService 인터페이스는 결제 관련 비즈니스 로직의 계약을 정의합니다.
 * 결제 상태 동기화 및 웹훅 처리를 위한 메서드를 선언합니다.
 */
public interface IPaymentService {
  
  /**
   * 결제 상태를 동기화합니다.
   * 브라우저의 결제 완료 호출이나 웹훅 호출 시 사용됩니다.
   *
   * @param paymentId 결제 고유 식별자
   * @return Mono&lt;Payment&gt; 동기화된 결제 상태
   */
  Mono<Payment> syncPayment(String paymentId);

  /**
   * 웹훅 요청을 처리하여 결제 상태를 동기화합니다.
   *
   * @param body 웹훅 요청의 본문
   * @param webhookId 웹훅 ID
   * @param webhookTimestamp 웹훅 타임스탬프
   * @param webhookSignature 웹훅 서명
   * @return Mono&lt;Unit&gt; 웹훅 처리 결과
   * @throws SyncPaymentException 웹훅 검증 실패 시 발생하는 예외
   */
  Mono<Unit> handleWebhook(String body, String webhookId, String webhookTimestamp, String webhookSignature) throws SyncPaymentException;
  
  OrderDto insertOrder(Integer userId, OrderDto orderDto);
}
