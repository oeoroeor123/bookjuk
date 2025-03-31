package com.bookjuk.order.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.bookjuk.order.domain.OrderItem;

/**
 * 주문 항목(OrderItem) 관련 데이터 처리를 위한 레파지토리 인터페이스입니다.
 * 주문(Order)의 orderId와 주문 항목(orderItemId)를 기준으로 주문 항목을 조회하는 메서드를 포함합니다.
 */
public interface OrderItemRepository extends JpaRepository<OrderItem, Integer> {

    /**
     * 지정된 주문번호와 주문 항목 식별자에 해당하는 OrderItem 엔티티를 조회합니다.
     *
     * @param orderId      주문 번호 (Order 엔티티의 orderId)
     * @param orderItemId  주문 항목 식별자
     * @return 해당 조건에 맞는 OrderItem 엔티티가 존재하면 반환하며, 없으면 null을 반환합니다.
     */
    OrderItem findByOrder_OrderIdAndOrderItemId(Integer orderId, Integer orderItemId);
    
    
    Optional<List<OrderItem>> findByOrder_OrderId(Integer orderId);
}
