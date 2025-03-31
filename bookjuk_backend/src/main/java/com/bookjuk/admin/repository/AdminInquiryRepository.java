package com.bookjuk.admin.repository;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.bookjuk.admin.domain.AdminInquiry;

public interface AdminInquiryRepository extends JpaRepository<AdminInquiry, Integer> {

  List<AdminInquiry> findByCreateDtBetween(LocalDateTime start, LocalDateTime end);

  List<AdminInquiry> findByInquiryReplyYn(Character inquiryReplyYn);

}
