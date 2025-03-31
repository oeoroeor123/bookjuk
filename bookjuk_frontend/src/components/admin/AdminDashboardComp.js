/**
 * 관리자 인덱스
 *
 * Developer : 김리예
 */

import React, { useEffect, useState } from 'react';
import '../../css/admin/index.css';
import { getNeedReplyInquiryCount, getNeedReplyQnaCount, getTodayInquiryCount, getTodayOrderCount, getTodayQnaCount, getTodayReviewCount } from '../../api/adminAPI';

const AdminDashboardComp = () => {
  const [orderCount, setOrderCount] = useState(0);
  const [qnaCount, setQnaCount] = useState(0);
  const [needReplyQna, setNeedReplyQna] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [inquiryCount, setInquiryCount] = useState(0);
  const [needReplyInquiry, setNeedReplyInquiry] = useState(0);

  useEffect(() => {
    // 오늘의 주문
    getTodayOrderCount()
      .then((jsonData) => {
        setOrderCount(jsonData?.results?.todayOrder);
      })
      .catch((error) => {
        console.log(error?.message);
      });
    // 오늘의 리뷰
    getTodayReviewCount()
      .then((jsonData) => {
        setReviewCount(jsonData?.results?.todayReview);
      })
      .catch((error) => {
        console.log(error?.message);
      });
    // 오늘의 Q&A
    getTodayQnaCount()
      .then((jsonData) => {
        setQnaCount(jsonData?.results?.todayQna);
      })
      .catch((error) => {
        console.log(error?.message);
      });
    // 미답변 Q&A
    getNeedReplyQnaCount()
      .then((jsonData) => {
        setNeedReplyQna(jsonData?.results?.needReplyQna);
      })
      .catch((error) => {
        console.log(error?.message);
      });
    // 오늘의 문의
    getTodayInquiryCount()
      .then((jsonData) => {
        setInquiryCount(jsonData?.results?.todayInquiry);
      })
      .catch((error) => {
        console.log(error?.message);
      });
    // 미답변 문의
    getNeedReplyInquiryCount()
      .then((jsonData) => {
        setNeedReplyInquiry(jsonData?.results?.needReplyInquiry);
      })
      .catch((error) => {
        console.log(error?.message);
      });
  }, []);

  return (
    <>
      <div className="admin-dashboard">
        <h2>북적북적 대시보드</h2>
        <div className="stats-grid mt-3">
          <div className="stat-card">
            <h3>오늘의 주문</h3>
            <p>{orderCount}</p>
          </div>
          <div className="stat-card">
            <h3>오늘의 리뷰</h3>
            <p>{reviewCount}</p>
          </div>
          <div className="stat-card">
            <h3>신규 Q&A</h3>
            <p>{qnaCount}</p>
          </div>
          <div className="stat-card">
            <h3>미처리 Q&A</h3>
            <p>{needReplyQna}</p>
          </div>
          <div className="stat-card">
            <h3>오늘의 문의</h3>
            <p>{inquiryCount}</p>
          </div>
          <div className="stat-card">
            <h3>미처리 문의</h3>
            <p>{needReplyInquiry}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboardComp;
