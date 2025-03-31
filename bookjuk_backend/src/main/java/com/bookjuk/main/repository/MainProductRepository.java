package com.bookjuk.main.repository;

import java.util.List;
import org.springframework.data.domain.Limit;
import org.springframework.data.jpa.repository.JpaRepository;
import com.bookjuk.main.domain.MainProduct;

/**
 * 메인에서 출력할 도서 리스트 조회에 사용할 Repository (리예)
 */
public interface MainProductRepository extends JpaRepository<MainProduct, Integer> {

  /**
   * 신간 도서 리스트 조회
   * 
   * @param  limit 조회할 도서 갯수
   * 
   * @return
   */
  List<MainProduct> findBySalesYnOrderByPublicationDateDesc(Limit limit, Character salesYn);

}
