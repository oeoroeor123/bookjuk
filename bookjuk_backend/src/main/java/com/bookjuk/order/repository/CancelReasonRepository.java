package com.bookjuk.order.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.bookjuk.order.domain.CancelReason;

public interface CancelReasonRepository extends JpaRepository<CancelReason, Integer> {
  



}
