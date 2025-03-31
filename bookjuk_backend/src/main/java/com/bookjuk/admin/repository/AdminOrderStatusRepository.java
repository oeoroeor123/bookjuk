package com.bookjuk.admin.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.bookjuk.admin.domain.AdminOrderStatus;

public interface AdminOrderStatusRepository extends JpaRepository<AdminOrderStatus, Integer> {

}
