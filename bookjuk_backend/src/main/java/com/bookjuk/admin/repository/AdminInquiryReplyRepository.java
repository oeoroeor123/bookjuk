package com.bookjuk.admin.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.bookjuk.admin.domain.AdminInquiryReply;

public interface AdminInquiryReplyRepository extends JpaRepository<AdminInquiryReply, Integer> {

  Optional<AdminInquiryReply> findByInquiry_InquiryId(Integer inquiryId);

}
