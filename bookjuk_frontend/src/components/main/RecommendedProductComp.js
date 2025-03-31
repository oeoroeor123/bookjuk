/**
 * 메인 - 추천 도서 목록
 *
 * Developer : 김리예
 */

import React from 'react';
import { useEffect, useState } from 'react';
import { getMainRecommendedProductList } from '../../api/mainAPI';
import ProductNavigate from '../../hooks/ProductNavigate';
import { useSearchParams } from 'react-router-dom';
import '../../css/main/main.css';

const RecommendedProductComp = () => {
  // 페이지 이동 함수
  const { goToProductDetailPage } = ProductNavigate();

  // serverData
  const [serverData, setServerData] = useState({
    status: 0,
    message: '',
    results: {
      productList: [
        {
          genre: {},
          author: {},
          publisher: {},
        },
      ],
      pageList: [],
      pageDto: {},
    },
  });
  const [queryParams] = useSearchParams();
  const page = !queryParams.get('page') ? 1 : parseInt(queryParams.get('page'));
  const size = !queryParams.get('size') ? 10 : parseInt(queryParams.get('size'));
  const sort = !queryParams.get('sort') ? 'productId,desc' : queryParams.get('sort');

  useEffect(() => {
    getMainRecommendedProductList().then((jsonData) => {
      setServerData(jsonData);
    });
  }, []);

  return serverData?.results?.productList[0]?.productName === undefined ? null : (
    <>
      <span className="main-sub-title">추천 도서</span>
      <div className="main-product-list">
        <div id="carousel" className="carousel carousel-dark slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            {serverData?.results?.productList?.map((product, idx) => (
              <div className="row" key={product?.productId}>
                <div
                  className={`carousel-item ${idx === 0 ? 'active' : ''} `} // 첫 번째 요소에만 active 추가
                  key={product?.productId}>
                  <img
                    src={product?.productImage}
                    className="d-block main-product-left"
                    alt={product?.productName}
                    onClick={() => {
                      goToProductDetailPage(product?.productId, queryParams);
                    }}
                  />
                  <div className="d-block main-product-right">
                    <span className="main-product-name">{product?.productName}</span>
                    <span className="main-product-author-name">{product?.author?.authorName}</span>
                    <span className="main-product-description" dangerouslySetInnerHTML={{__html: product?.description}}></span>
                    <span className="main-product-info">{product?.publisher?.publisherName} | {product?.genre?.genreName}</span>
                    <span className="main-product-publication-date">{product?.publicationDate}</span>
                    <span className="main-product-price">{product?.productPrice?.toLocaleString('ko-KR')}원</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default RecommendedProductComp;
