package com.bookjuk.admin.repository;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.bookjuk.admin.domain.AdminOrder;

public interface AdminOrderRepository extends JpaRepository<AdminOrder, Integer> {

  // @Query("SELECT o FROM adminOrder o WHERE DATE(o.createDt) = :today")
  // List<AdminOrder> findByCreateDtToday(@Param("today") LocalDateTime today);

  List<AdminOrder> findByCreateDtBetween(LocalDateTime start, LocalDateTime end);

}
