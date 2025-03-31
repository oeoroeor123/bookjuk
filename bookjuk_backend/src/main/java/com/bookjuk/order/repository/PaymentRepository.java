package com.bookjuk.order.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.bookjuk.order.domain.Pay;

public interface PaymentRepository extends JpaRepository<Pay, Integer> {
  Optional<Pay> findByImpUid(String impUid);
}
