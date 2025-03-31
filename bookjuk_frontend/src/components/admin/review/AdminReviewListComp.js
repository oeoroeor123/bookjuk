/**
 * 관리자 - 상품 목록 확인
 *
 * Developer : 김리예
 */

import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import AdminNavigate from '../../../hooks/AdminNavigate';
import { getReviewList, getReviewSearchList } from '../../../api/adminAPI';
import PageComp from '../../common/PageComp';
import '../../../css/admin/review.css';
import RatingComp from './RatingComp';

const AdminReviewListComp = () => {
  // 페이지 이동 함수
  const { goToReviewListPage, goToReviewDetailPage } = AdminNavigate();

  // serverData
  const [serverData, setServerData] = useState({
    status: 0,
    message: '',
    results: {
      reviewList: [
        {
          user: {},
          product: {},
        },
      ],
      pageList: [],
      pageDto: {},
    },
  });

  const [search, setSearch] = useState('total');
  const [keyword, setKeyword] = useState('');

  const [queryParams] = useSearchParams();
  const page = !queryParams.get('page') ? 1 : parseInt(queryParams.get('page'));
  const size = !queryParams.get('size') ? 10 : parseInt(queryParams.get('size'));
  const sort = !queryParams.get('sort') ? 'reviewId,desc' : queryParams.get('sort');

  useEffect(() => {
    getReviewList({ page, size, sort }).then((jsonData) => {
      setServerData(jsonData);
    });
  }, [page, size, sort]);

  useEffect(() => {
    getReviewSearchList({ page, size, sort, search, keyword }).then((jsonData) => {
      setServerData(jsonData);
    });
  }, [search, keyword]);

  const onChangeSearchHandler = (e) => {
    setSearch(e.target.value);
  };

  const onChangeKeywordHandler = async (e) => {
    setKeyword(e.target.value);
  };

  return (
    <>
      {/* 검색창 */}
      <div class="row g-2 mt-3 input-search">
        <div class="col-md-4">
          <div class="form-floating">
            <select class="form-select" id="floatingSelectGrid" onChange={onChangeSearchHandler}>
              <option selected value="total">
                통합검색
              </option>
              <option value="product">상품명</option>
              <option value="author">작가</option>
              <option value="genre">장르</option>
              <option value="user">구매자</option>
              <option value="content">리뷰내용</option>
            </select>
            <label for="floatingSelectGrid">리뷰 검색</label>
          </div>
        </div>
        <div class="col-md-8">
          <div class="form-floating">
            <input type="text" class="form-control" id="floatingInputGrid" value={keyword} onChange={onChangeKeywordHandler} />
            <label for="floatingInputGrid">검색어를 입력하세요.</label>
          </div>
        </div>
      </div>

      {/* 리뷰 목록 */}
      <table className="table mt-3 list-table">
        {serverData?.results?.reviewList?.length === 0 ? (
          <tr className="center">
            <td>조회된 리뷰가 없습니다.</td>
          </tr>
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
          {serverData?.results?.reviewList?.map((review) => (
            review?.product === null ? '' : // product 정보 없으면 미노출
            <tr
              key={review?.reviewId}
              onClick={() => {
                goToReviewDetailPage(review?.reviewId, queryParams);
              }}>
              <td className="center">{review?.reviewId}</td>
              <td>
                <div className="row">
                  <img className="col review-thumbnail" src={review?.product?.productImage} />
                  <div className="col product-info">
                    <p>{review?.product?.productName}</p>
                    <p>{review?.product?.genre?.genreName}</p>
                    <p>{review?.product?.author?.authorName}</p>
                  </div>
                </div>
              </td>
              <td className="center">{review?.reviewComment}</td>
              <td className="center">{review?.user?.userNickname}</td>
              <td className="left">
                <RatingComp rating={review?.reviewRating} />
              </td>
              <td className="center">{review?.createDt?.replace('T', ' ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* 페이징버튼 */}
      {serverData?.results?.reviewList?.length !== 0 ? <PageComp serverData={serverData} goToListPage={goToReviewListPage} size={size} sort={sort} /> : null}
    </>
  );
};

export default AdminReviewListComp;
