package com.bookjuk.notice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookjuk.notice.domain.Notice;

public interface NoticeRepository extends JpaRepository<Notice, Integer> {

}
