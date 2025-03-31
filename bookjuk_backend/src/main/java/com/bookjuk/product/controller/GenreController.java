package com.bookjuk.product.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookjuk.product.domain.Genre;
import com.bookjuk.product.service.GenreService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@Tag(name = "장르", description = "장르 API")
public class GenreController {

	private final GenreService genreService;
	
  @Operation(summary = "장르 목록 조회", description = "장르 목록 조회")
	@GetMapping(value = "/product/genres", produces = "application/json")
	public List<Genre> getAllGenres() {
		return genreService.getAllGenres();
	}
}
