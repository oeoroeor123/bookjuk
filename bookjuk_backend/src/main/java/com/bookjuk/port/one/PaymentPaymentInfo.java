package com.bookjuk.port.one;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

//각 결제 항목 정보는 paymentInfo 객체로 구성됨 
@JsonIgnoreProperties(ignoreUnknown = true) //JSON에 다른 필드가 포함되어 있어도 파싱 오류가 발생하지 않고, 오직 paymentInfo만을 추출
public record PaymentPaymentInfo(PaymentInfo paymentInfo) {

}
