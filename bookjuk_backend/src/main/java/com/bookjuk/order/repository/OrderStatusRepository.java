package com.bookjuk.order.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.bookjuk.order.domain.OrderStatus;

public interface OrderStatusRepository extends JpaRepository<OrderStatus, Integer> {

}
