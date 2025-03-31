package com.bookjuk.admin.repository;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.bookjuk.admin.domain.AdminQna;

public interface AdminQnARepository extends JpaRepository<AdminQna, Integer> {

  List<AdminQna> findByQnaCreateDtBetween(LocalDateTime start, LocalDateTime end);

  List<AdminQna> findByQnaReplyYn(Character qnaReplyYn);

}
