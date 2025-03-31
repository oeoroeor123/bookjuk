package com.bookjuk.qna.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookjuk.qna.domain.Qna;

public interface QnaRepository extends JpaRepository<Qna, Integer> {

}
