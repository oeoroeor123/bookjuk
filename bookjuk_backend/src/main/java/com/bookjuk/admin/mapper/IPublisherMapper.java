package com.bookjuk.admin.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.bookjuk.admin.dto.PublisherDto;

@Mapper
public interface IPublisherMapper {
  
  // 작가 이름으로 검색
  List<PublisherDto> searchPublishersByName(String searchPublisher);


}
