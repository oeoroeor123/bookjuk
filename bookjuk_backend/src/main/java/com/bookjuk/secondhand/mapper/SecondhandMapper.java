package com.bookjuk.secondhand.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.bookjuk.secondhand.dto.SecondhandDto;

@Mapper
public interface SecondhandMapper {
  List<SecondhandDto> selectSecondhandSearchList(Map<String, Object> param);
  int selectSecondhandSearchListCount(Map<String, Object> param);

}
