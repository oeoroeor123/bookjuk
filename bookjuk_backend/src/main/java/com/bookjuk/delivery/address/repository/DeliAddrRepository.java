package com.bookjuk.delivery.address.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.bookjuk.delivery.address.domain.DeliAddr;
import jakarta.persistence.LockModeType;

public interface DeliAddrRepository extends JpaRepository<DeliAddr, Integer>{
  
  // 유저 아이디로 배송지 리스트 검색
  List<DeliAddr> findByUserUserId(Integer userId);
  
  // 특정 유저의 대표 배송지를 가져오면서 PESSIMISTIC_WRITE 락을 걸기 (동시성 문제 해결)
  @Lock(LockModeType.PESSIMISTIC_WRITE)
  @Query("SELECT d FROM deliveryAddress d WHERE d.user.userId = :userId AND d.primaryAddr = true")
  Optional<DeliAddr> findPrimaryAddressForUpdate(@Param("userId") Integer userId);

  // 기존 primaryAddr을 false로 변경하는 쿼리
  @Modifying
  @Query("UPDATE deliveryAddress d SET d.primaryAddr = false WHERE d.primaryAddr = true AND d.user.userId = :userId")
  void resetPrimaryAddress(@Param("userId") Integer userId);
}