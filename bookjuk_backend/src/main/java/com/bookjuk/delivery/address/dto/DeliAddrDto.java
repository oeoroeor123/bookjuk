package com.bookjuk.delivery.address.dto;

import com.bookjuk.delivery.address.domain.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class DeliAddrDto {

  // 배송지 고유 ID
  private Integer addrId;
  // 배송지 소유 회원의 ID
  private User user;
//  private Integer userId;
  // 도로명 주소
  private String roadAddress;
  // 지번 주소
  private String jibunAddress;
  // 상세 주소
  private String detailAddress;
  // 추가 주소 정보 (예: 동/층/호 등) 
  private String extraAddress;
  // 우편번호
  private String postcode;
  // 배송지(수취인) 이름
  private String addrName;
  // 수취인 전화번호
  private String receiverPhone;
  // 대표 배송지 여부
  private Boolean primaryAddr;
  // 배송요청사항
  private String deliveryRequest;
  

}
