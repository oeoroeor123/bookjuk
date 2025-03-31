package com.bookjuk.admin.repository;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.bookjuk.admin.domain.AdminReview;

public interface AdminReviewRepository extends JpaRepository<AdminReview, Integer> {

  List<AdminReview> findByCreateDtBetween(LocalDateTime start, LocalDateTime end);

}
