/**
 * 관리자 - 상품 상세 확인
 *
 * Developer : 김리예
 */

import { useEffect, useState } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import AdminNavigate from '../../../hooks/AdminNavigate';
import { getReviewDetail } from '../../../api/adminAPI';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import '../../../css/admin/review.css';
import RatingComp from './RatingComp';

const AdminReviewDetailComp = () => {
  // 경로 변수(Path Variable)를 처리하는 useParams()
  const { reviewId } = useParams();

  // 페이지 이동 함수
  const { goToReviewListPage } = AdminNavigate();

  // serverData
  const [serverData, setServerData] = useState({
    status: 0,
    message: '',
    results: {
      review: {
        reviewId: 0,
        user: {},
        product: {
          user: {},
          genre: {},
          author: {},
          publisher: {},
          attachList: [{}],
        },
      },
    },
  });

  const [queryParams] = useSearchParams();
  const page = !queryParams.get('page') ? 1 : parseInt(queryParams.get('page'));
  const size = !queryParams.get('size') ? 10 : parseInt(queryParams.get('size'));
  const sort = !queryParams.get('sort') ? 'reviewId,desc' : queryParams.get('sort');

  useEffect(() => {
    getReviewDetail(reviewId).then((jsonData) => {
      setServerData(jsonData);
    });
  }, [reviewId]);

  return (
    <>
      <Table>
        {serverData?.results?.review?.length === 0 ? (
          <caption>조회된 리뷰가 없습니다.</caption>
        ) : (
          <thead>
            <tr>
              <th nowrap="true">상품번호</th>
              <th nowrap="true">구매상품</th>
              <th nowrap="true">상품 리뷰</th>
              <th nowrap="true">구매자</th>
              <th nowrap="true">평점</th>
              <th nowrap="true">등록일</th>
            </tr>
          </thead>
        )}
        <tbody>
          {
            <tr>
              <td className="center">{serverData?.results?.review?.reviewId}</td>
              <td>
                <div className="row">
                  <img className="col review-thumbnail" src={serverData?.results?.review?.product?.productImage} />
                  <div className="col product-info">
                    <p>{serverData?.results?.review?.product?.productName}</p>
                    <p>{serverData?.results?.review?.product?.genre?.genreName}</p>
                    <p>{serverData?.results?.review?.product?.author?.authorName}</p>
                  </div>
                </div>
              </td>
              <td className="center">{serverData?.results?.review?.reviewComment}</td>
              <td className="center">{serverData?.results?.review?.user?.userNickname}</td>
              <td className="left">
                <RatingComp rating={serverData?.results?.review?.reviewRating} />
              </td>
              <td className="center">{serverData?.results?.review?.createDt?.replace('T', ' ')}</td>
            </tr>
          }
        </tbody>
      </Table>
      <Button onClick={goToReviewListPage} className="listBtn">
        목록
      </Button>
    </>
  );
};

export default AdminReviewDetailComp;
