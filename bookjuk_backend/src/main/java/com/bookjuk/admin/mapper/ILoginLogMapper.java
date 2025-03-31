package com.bookjuk.admin.mapper;

import java.util.List;
import java.util.Map;
import org.apache.ibatis.annotations.Mapper;
import com.bookjuk.admin.dto.LoginLogDto;

@Mapper
public interface ILoginLogMapper {

  /**
   * 관리자 - 로그인 기록 검색 결과
   * 
   * @param  param
   * 
   * @return
   */
  List<LoginLogDto> selectLoginLogSearchList(Map<String, Object> param);

  /**
   * 관리자 - 로그인 기록 검색 결과 갯수
   * 
   * @param  param
   * 
   * @return
   */
  int selectLoginLogSearchListCount(Map<String, Object> param);

}
