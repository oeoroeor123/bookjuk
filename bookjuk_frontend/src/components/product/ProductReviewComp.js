import { useEffect, useState } from 'react';
import { getIdFromSessionStorage } from '../../common/settings';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductDetail } from '../../api/productRestAPI';
import RatingComp from '../admin/review/RatingComp';
import Table from 'react-bootstrap/Table';

const ProductReviewComp = () => {

  // userId 받아와서 상품 문의 구현
  const userId = getIdFromSessionStorage();

  // 페이지 이동 함수
  const navigate = useNavigate();

  // 상품 id 추출
  const {productId} = useParams();

  // serverData
  const [serverData, setServerData] = useState({
    status: 0,
    message: '',
    results: {
      product: {},
      reviews: [],
    },
  });

  useEffect(() => {
    getProductDetail(productId).then((jsonData) => {
      console.log('리뷰데이터 :', jsonData);
      setServerData(jsonData);
    });
  }, [productId]);


  return (
    <>
      <div className="product-detail-header">🔖상품 리뷰</div>
      <Table hover>
        {serverData?.results?.reviews?.length === 0 ? (
          <div>조회된 리뷰가 없습니다.</div>
        ) : (
          <thead>
            {serverData?.results?.reviews?.map((review) => (
            <tr className="detail-th" key={review.reviewId}>
              <th style={{ whiteSpace: 'nowrap' }}>구매상품</th>
              <th style={{ whiteSpace: 'nowrap' }}>상품 리뷰</th>
              <th style={{ whiteSpace: 'nowrap' }}>구매자</th>
              <th style={{ whiteSpace: 'nowrap' }}>평점</th>
              <th style={{ whiteSpace: 'nowrap' }}>등록일</th>
            </tr>
            ))}
          </thead>
        )}
        <tbody>
          {serverData?.results?.reviews?.map((review) => (
            <tr key={review.reviewId}>
              
              <td>
                <div className="detail-row">
                  <div className="col product-info">
                    <p>{review.product.productName}</p>
                    <p>{review.product.genre?.genreName}</p>
                    <p>{review.product.author?.authorName}</p>
                  </div>
                </div>
              </td>
              <td className="center">{review.reviewComment}</td>
              <td className="center">{review.user?.userNickname}</td>
              <td className="left">
                <RatingComp rating={review.reviewRating} />
              </td>
              <td className="center">{review.createDt?.replace('T', ' ')}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default ProductReviewComp;
