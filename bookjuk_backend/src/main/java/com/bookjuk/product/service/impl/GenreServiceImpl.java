package com.bookjuk.product.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.bookjuk.product.domain.Genre;
import com.bookjuk.product.repository.GenreListRepository;
import com.bookjuk.product.service.GenreService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GenreServiceImpl implements GenreService {

	private final GenreListRepository genreListRepository;
	
	@Override
	public List<Genre> getAllGenres() {
		return genreListRepository.findAll();
	}

}
