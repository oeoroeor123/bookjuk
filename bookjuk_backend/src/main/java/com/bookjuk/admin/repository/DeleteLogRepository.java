package com.bookjuk.admin.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.bookjuk.admin.domain.DeleteLog;

public interface DeleteLogRepository extends JpaRepository<DeleteLog, Integer> {

}
