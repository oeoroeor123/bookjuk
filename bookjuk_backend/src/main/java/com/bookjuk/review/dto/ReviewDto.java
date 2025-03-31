package com.bookjuk.review.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import java.time.LocalDateTime;
import com.bookjuk.order.domain.OrderItem;
import com.bookjuk.order.domain.Product;
import com.bookjuk.order.domain.User;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class ReviewDto {
    // 후기 고유 ID
    private Integer reviewId;
    // 후기 작성자(회원) ID
    private User user;
    // 후기가 등록된 상품
    private Product product;
    // 해당 후기가 연계된 주문 상세 항목
    private OrderItem orderItem;
    // 평점 (1~5점)
    private Integer reviewRating;
    // 후기 상세 내용
    private String reviewComment;
    // 후기 작성 날짜
    private LocalDateTime createDt;
}
