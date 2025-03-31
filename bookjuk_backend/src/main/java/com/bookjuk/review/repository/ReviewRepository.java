package com.bookjuk.review.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.bookjuk.review.domain.Review;

public interface ReviewRepository extends JpaRepository<Review, Integer>{

}
