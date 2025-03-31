package com.bookjuk.admin.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookjuk.admin.domain.Publisher;

public interface PublisherRepository extends JpaRepository<Publisher, Integer> {

  Publisher findByPublisherId(Integer publisherId);
  Publisher findByPublisherName(String publisherName);
  
}
