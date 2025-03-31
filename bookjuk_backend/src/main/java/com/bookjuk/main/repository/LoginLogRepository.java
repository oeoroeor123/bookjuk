package com.bookjuk.main.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.bookjuk.admin.domain.LoginLog;

public interface LoginLogRepository extends JpaRepository<LoginLog, Integer> {

}
