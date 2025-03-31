package com.bookjuk.admin.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.bookjuk.admin.domain.AdminQnaReply;

public interface AdminQnAReplyRepository extends JpaRepository<AdminQnaReply, Integer> {

  Optional<AdminQnaReply> findByQna_QnaId(Integer qnaId);

}
