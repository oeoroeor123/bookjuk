package com.bookjuk.delivery.address.service;

import java.util.List;
import com.bookjuk.delivery.address.dto.DeliAddrDto;

public interface IDeliAddrService {

  // (1) 특정 userId의 배송지 조회
  List<DeliAddrDto> findDeliAddrByUserId(Integer userId);

  // (2) 배송지 추가
  DeliAddrDto insertDeliAddr(DeliAddrDto deliAddrDto);

  // (3) 배송지 수정
  DeliAddrDto updateDeliAddr(DeliAddrDto deliAddrDto);

  // (4) 배송지 삭제
  void deleteDeliAddr(Integer deliAddrId);

}
