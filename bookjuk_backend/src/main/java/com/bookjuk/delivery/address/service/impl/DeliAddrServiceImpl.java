package com.bookjuk.delivery.address.service.impl;

import java.util.List;
import java.util.stream.Collectors;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.bookjuk.delivery.address.domain.DeliAddr;
import com.bookjuk.delivery.address.dto.DeliAddrDto;
import com.bookjuk.delivery.address.repository.DeliAddrRepository;
import com.bookjuk.delivery.address.service.IDeliAddrService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class DeliAddrServiceImpl implements IDeliAddrService {

  private final DeliAddrRepository deliAddrRepository;
  private final ModelMapper        modelMapper;

  @Override
  @Transactional(readOnly = true)
  public List<DeliAddrDto> findDeliAddrByUserId(Integer userId) {
    // userId를 기반으로 배송지 리스트 조회
    List<DeliAddr> deliAddrList = deliAddrRepository.findByUserUserId(userId);

    // 배송지가 없을 경우 예외 발생
    if (deliAddrList.isEmpty()) {
      throw new IllegalArgumentException("해당 userId의 배송지가 존재하지 않습니다.");
    }

    // List<DeliAddr> -> List<DeliAddrDto> 변환
    return deliAddrList.stream()
        .map(deliAddr -> modelMapper.map(deliAddr, DeliAddrDto.class))
        .collect(Collectors.toList());
  }

  @Override
  public DeliAddrDto insertDeliAddr(DeliAddrDto deliAddrDto) {

    DeliAddr newDeliAddr = modelMapper.map(deliAddrDto, DeliAddr.class);

    // primaryAddr이 true이면 기존의 primaryAddr을 false로 변경
    if (Boolean.TRUE.equals(newDeliAddr.getPrimaryAddr())) {
      deliAddrRepository.resetPrimaryAddress(newDeliAddr.getUser().getUserId());
    }

    deliAddrRepository.save(newDeliAddr);

    // 저장할 cartItem 엔티티 생성
    return deliAddrDto;
  }

  @Override
  public DeliAddrDto updateDeliAddr(DeliAddrDto deliAddrDto) {
    // 기존 배송지 찾기
    DeliAddr existingDeliAddr = deliAddrRepository.findById(deliAddrDto.getAddrId())
        .orElseThrow(() -> new IllegalArgumentException("배송지가 존재하지 않습니다."));

    // primaryAddr이 true이면 기존의 primaryAddr을 false로 변경
    if (Boolean.TRUE.equals(deliAddrDto.getPrimaryAddr())) {
      deliAddrRepository.resetPrimaryAddress(deliAddrDto.getUser().getUserId());
    }

    // 변경 사항 적용
    existingDeliAddr = modelMapper.map(deliAddrDto, DeliAddr.class);

    deliAddrRepository.save(existingDeliAddr);
    return modelMapper.map(existingDeliAddr, DeliAddrDto.class);
  }

  @Override
  public void deleteDeliAddr(Integer addrId) {
    deliAddrRepository.deleteById(addrId);
  }

}
