package com.bookjuk.port.one.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.bookjuk.port.one.domain.Pay;

public interface PayRepository extends JpaRepository<Pay, Integer> {
  // Order의 식별자를 기준으로 결제(Pay) 엔티티를 조회하는 메서드
  Optional<Pay> findByOrderOrderId(Integer orderId);
}
