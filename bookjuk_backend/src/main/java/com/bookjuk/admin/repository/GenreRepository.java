package com.bookjuk.admin.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookjuk.admin.domain.Genre;

public interface GenreRepository extends JpaRepository<Genre, Integer> {

}
