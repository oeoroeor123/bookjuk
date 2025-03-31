package com.bookjuk.secondhand.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookjuk.secondhand.domain.SecondhandInsert;

public interface SecondhandInsertRepository extends JpaRepository<SecondhandInsert, Integer> {
  
}

