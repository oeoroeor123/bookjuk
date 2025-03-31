package com.bookjuk.secondhand.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookjuk.secondhand.domain.SecondhandAttatch;

public interface SecondhandAttatchRepository extends JpaRepository<SecondhandAttatch, Integer> {

  List<SecondhandAttatch> findBySecondhandId(Integer secondhandId);
  void deleteBySecondhandId(Integer secondhandId);
  
}
