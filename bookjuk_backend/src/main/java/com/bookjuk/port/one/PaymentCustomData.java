package com.bookjuk.port.one;

import java.util.List;

//프론트엔드에서 전달받은 결제 항목 정보를 담은 데이터 구조`
public record PaymentCustomData(List<PaymentPaymentInfo> item) {
}
