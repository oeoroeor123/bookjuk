package com.bookjuk.admin.mapper;

import java.util.List;
import java.util.Map;
import org.apache.ibatis.annotations.Mapper;
import com.bookjuk.admin.dto.DeleteLogDto;

@Mapper
public interface IDeleteLogMapper {

  /**
   * 관리자 - 탈퇴 기록 검색 결과
   * 
   * @param  param
   * 
   * @return
   */
  List<DeleteLogDto> selectDeleteLogSearchList(Map<String, Object> param);

  /**
   * 관리자 - 탈퇴 기록 검색 결과 갯수
   * 
   * @param  param
   * 
   * @return
   */
  int selectDeleteLogSearchListCount(Map<String, Object> param);

}
