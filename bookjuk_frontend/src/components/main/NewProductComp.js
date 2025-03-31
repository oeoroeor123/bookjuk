/**
 * 메인 - 최신 도서 목록 (발매일순 5개)
 *
 * Developer : 김리예
 */

import React from 'react';
import { useEffect, useState } from 'react';
import { getMainNewProductList } from '../../api/mainAPI';
import ProductNavigate from '../../hooks/ProductNavigate';
import Card from 'react-bootstrap/Card';
import { useSearchParams } from 'react-router-dom';
import '../../css/main/main.css';

const NewProductComp = () => {
  // 페이지 이동 함수
  const { goToProductDetailPage } = ProductNavigate();

  // serverData
  const [serverData, setServerData] = useState({
    status: 0,
    message: '',
    results: {
      productList: [],
      pageList: [],
      pageDto: {},
    },
  });

  const [queryParams] = useSearchParams();
  const page = !queryParams.get('page') ? 1 : parseInt(queryParams.get('page'));
  const size = !queryParams.get('size') ? 10 : parseInt(queryParams.get('size'));
  const sort = !queryParams.get('sort') ? 'productId,desc' : queryParams.get('sort');

  useEffect(() => {
    getMainNewProductList().then((jsonData) => {
      setServerData(jsonData);
    });
  }, []);

  return (
    serverData?.results?.productList.length === 0 ? null :
    <>
      <span className="main-sub-title">신상 도서</span>
      <div className="main-product-list">
        {serverData?.results?.productList?.map((product) => (
          <Card
            key={product.productId}
            style={{ width: '14rem' }}
            className="main-product-item"
            onClick={() => {
              goToProductDetailPage(product?.productId, queryParams);
            }}>
            <Card.Img variant="top" src={product?.productImage} className="main-thumbnail" />
            <Card.Body>
              <Card.Title className="main-book-title">{product?.productName}</Card.Title>
              <Card.Text className="main-desc" dangerouslySetInnerHTML={{__html: product?.description}}></Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </>
  );
};

export default NewProductComp;
