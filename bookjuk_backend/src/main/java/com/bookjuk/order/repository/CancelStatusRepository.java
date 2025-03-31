package com.bookjuk.order.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.bookjuk.order.domain.CancelStatus;
import com.bookjuk.order.dto.CancelStatusDto;

public interface CancelStatusRepository extends JpaRepository<CancelStatus, Integer> {
  

  @Query("SELECT new com.bookjuk.order.dto.CancelStatusDto(c.cancelStatusId, c.statusName) FROM cancelStatus c")
  List<CancelStatusDto> findAllCancelStatus();

}
