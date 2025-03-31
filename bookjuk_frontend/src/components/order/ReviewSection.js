// ************************************************
// *****MyOrderComp.jsx 에서 사용되는 컴포넌트*****
// ************************************************
// ReviewSection.jsx
// 이 컴포넌트는 주문 아이템에 대한 리뷰 작성 및 삭제 기능을 제공합니다.
// 사용자가 별점과 코멘트를 입력하여 리뷰를 등록하거나, 기존 리뷰를 삭제할 수 있습니다.
import React, { useState, useEffect } from "react";
import { alert } from "../../common/settings";
import { getReviewInsert, getReviewDelete } from "../../api/reviewAPI";
import RatingComp from "./RatingComp"; // 별점 컴포넌트 import

const ReviewSection = ({ orderItem, onReviewUpdated }) => {
  // 기존 리뷰가 있다면 이를 초기값으로 사용
  const [review, setReview] = useState(orderItem.review || null);
  const [rating, setRating] = useState(review ? review.reviewRating : 5);
  const [comment, setComment] = useState(review ? review.reviewComment : "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reviewId, setReviewId] = useState(null);

  // 부모의 orderItem.review가 변경될 때 로컬 상태를 업데이트
  useEffect(() => {
    if (orderItem.review) {
      setReview(orderItem.review);
      setRating(orderItem.review.reviewRating);
      setComment(orderItem.review.reviewComment);
      setReviewId(orderItem.review.reviewId);
    }
  }, [orderItem.review]);

  // 리뷰 등록 함수
  const handleReviewSubmit = async () => {
    if (!rating || !comment.trim()) {
      alert("별점과 리뷰 내용을 입력해주세요.");
      return;
    }
    setIsSubmitting(true);
    const reviewPayload = {
      orderItem: { orderItemId: orderItem.orderItemId },
      user: orderItem.order.user,
      product: orderItem.product,
      reviewRating: rating,
      reviewComment: comment.trim(),
    };
    try {
      const response = await getReviewInsert(reviewPayload);
      // 새로 등록된 리뷰 데이터를 로컬 상태에 저장
      setReview(response.results);
      alert("리뷰가 성공적으로 등록되었습니다.", "success");
      // 🔄 페이지 새로고침
      window.location.reload();
    } catch (error) {
      console.error("리뷰 등록 실패:", error);
      alert("리뷰 등록 처리 중 오류가 발생했습니다.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 리뷰 삭제 함수
  const handleReviewDelete = async () => {
    if (!review) return;
    setIsSubmitting(true);
    try {
      await getReviewDelete(reviewId);
      alert("리뷰가 삭제되었습니다.", "success");
      // 리뷰 삭제 후 로컬 상태 초기화
      setReview(null);
      setRating(5);
      setComment("");
      // 부모 컴포넌트에도 삭제됨(null) 상태 전달
      onReviewUpdated && onReviewUpdated(null);
    } catch (error) {
      console.error("리뷰 삭제 실패:", error);
      alert("리뷰 삭제 처리 중 오류가 발생했습니다.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card mt-3">
      <div className="card-header">
        <h5 className="mb-0">리뷰 {review ? "보기" : "작성"}</h5>
      </div>
      <div className="card-body">
        {review ? (
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <p className="mb-1">
                <div className="d-flex align-items-center">
                  <strong>별점:</strong>{" "}
                  <RatingComp rating={rating} clickable={false} />
                </div>
              </p>
              <p className="mb-0">
                <strong>리뷰:</strong> {comment}
              </p>
            </div>
            <div>
              <button
                className="btn btn-danger"
                onClick={handleReviewDelete}
                disabled={isSubmitting}
              >
                삭제
              </button>
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col-md-8">
              <div className="mb-3">
                <div className="d-flex align-items-center">
                  <label className="form-label me-2 mb-0">별점:</label>
                  <RatingComp
                    rating={rating}
                    onRatingChange={setRating}
                    clickable={true}
                  />
                </div>
              </div>
              <div className="mb-3">
                <textarea
                  placeholder="리뷰 내용을 입력하세요"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows="1"
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-md-4 d-flex align-items-start justify-content-end">
              <button
                className="btn btn-primary"
                onClick={handleReviewSubmit}
                disabled={isSubmitting}
              >
                등록
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewSection;
