package com.bookjuk.admin.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.bookjuk.admin.dto.AuthorDto;

@Mapper
public interface IAuthorMapper {
  
  // 작가 이름으로 검색
  List<AuthorDto> searchAuthorsByName(String searchAuthor);


}
