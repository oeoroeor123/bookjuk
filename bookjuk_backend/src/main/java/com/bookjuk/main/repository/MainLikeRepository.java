package com.bookjuk.main.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.bookjuk.main.domain.MainLike;
import com.bookjuk.main.dto.MainProductLikeCountDto;

public interface MainLikeRepository extends JpaRepository<MainLike, Integer> {

  /**
   * 좋아요 순으로 count 개수만큼 조회
   * 
   * @param  count 조회할 상품 개수
   * 
   * @return
   */
  @Query("SELECT l.productId AS productId, COUNT(l.productId) AS likeCount " +
      "FROM mainLike l " +
      "JOIN mainProduct p ON l.productId = p.productId " +
      "WHERE p.salesYn = 'Y' " +
      "GROUP BY l.productId " +
      "ORDER BY likeCount DESC " +
      "LIMIT :count")
  List<MainProductLikeCountDto> findProductLikeCountOrderByLikeCountDesc(int count);

}
