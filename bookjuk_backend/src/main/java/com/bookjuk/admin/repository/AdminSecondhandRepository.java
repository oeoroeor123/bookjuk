package com.bookjuk.admin.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.bookjuk.admin.domain.AdminSecondhand;
import com.bookjuk.admin.dto.LoginLogDto;

public interface AdminSecondhandRepository extends JpaRepository<AdminSecondhand, Integer> {

}
