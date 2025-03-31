package com.bookjuk.secondhand.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookjuk.secondhand.domain.Secondhand;

public interface SecondhandRepository extends JpaRepository<Secondhand, Integer> {

}

