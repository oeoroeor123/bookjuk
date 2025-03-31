package com.bookjuk.order.repository;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import com.bookjuk.order.domain.Order;

public interface OrderRepository extends JpaRepository<Order, Integer> {
  
  // 사용자 ID로 주문 내역을 조회 (한 사용자가 여러 주문을 가질 수 있음)
  Page<Order> findByUserUserId(Integer userId, Pageable pageable);

}
