package com.bookjuk.faq.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookjuk.faq.domain.Faq;

public interface FaqRepository extends JpaRepository<Faq, Integer> {

}
