/**
 * 관리자 - 상품 상세 확인
 *
 * Developer : 김성율
 */

import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import { getProductDetail, getProductDelete } from '../../../api/adminProductAPI';

import { Button, Card, Col, Table, Row } from 'react-bootstrap';

import { alert, confirm } from '../../../common/settings';

import AdminProductNavigate from '../../../hooks/AdminProductNavigate';

import QuillViewer from '../../secondhand/QuillViewer';
import { FaAlignLeft } from 'react-icons/fa';

const AdminProductDetailComp = () => {

  // 경로 변수(productId) 받기
  const { productId } = useParams();

  // 페이지 이동 함수
  const { goToProductListPage, goToProductEditPage } = AdminProductNavigate();

  // 상품 정보 상태 관리
  const [serverData, setServerData] = useState({
    status: 0,
    message: '',
    results: {
      product: {
        productId: 0,
        productImage: '',
        productName: '',
        description: '',
        productPrice: 0,
        stock: 0,
        createDt: '',
        publicationDate: '',
        totalPages: 0,
        genre: { genreName: '' },
        author: { authorName: '' },
        publisher: { publisherName: '' },
      }
    }
  });

  const [queryParams] = useSearchParams();
  const page = !queryParams.get('page') ? 1 : parseInt(queryParams.get('page'));
  const size = !queryParams.get('size') ? 10 : parseInt(queryParams.get('size'));
  const sort = !queryParams.get('sort') ? 'productId,desc' : queryParams.get('sort');

  // 상품 정보 가져오기
  useEffect(() => {
    getProductDetail(productId)
      .then(jsonData => {
        console.log(jsonData);

        setServerData(jsonData);
      })
  }, [productId]);

  // 상품 수정
  const onClickEditHandler = async () => {
    goToProductEditPage(productId);
  }

  // 상품 삭제
  const onClickDeleteHandler = async () => {
    confirm("정말로 삭제하시겠습니까?", () => {
      getProductDelete(productId)
        .then(jsonData => {
          alert(jsonData.message);
          goToProductListPage();
        })
    }, () => { });
  }




  return (
    <div className="my-5">
      <Card style={{ borderRadius: '10px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <Card.Header as="h3" className="text-center" style={{ backgroundColor: '#f8f9fa', padding: '20px' }}>
          📖 상품 상세 정보
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={4}>
              <div className="text-center">
                <img src={`${serverData.results.product.productImage}`}
                  alt={serverData.results.product.productImage}
                  style={{ width: '100%', height: 'auto', borderRadius: '8px', border: '1px solid #ddd' }}
                />
              </div>
            </Col>
            <Col md={8}>
              <Table bordered hover>
                <tbody>
                  <tr>
                    <th>상품 번호</th>
                    <td>{serverData.results.product.productId}</td>
                  </tr>
                  <tr>
                    <th>도서명</th>
                    <td>{serverData.results.product.productName}</td>
                  </tr>
                  <tr>
                    <th>작가</th>
                    <td>{serverData.results.product.author.authorName}</td>
                  </tr>
                  <tr>
                    <th>장르</th>
                    <td>{serverData.results.product.genre.genreName}</td>
                  </tr>
                  <tr>
                    <th>출판사</th>
                    <td>{serverData.results.product.publisher.publisherName}</td>
                  </tr>
                  <tr>
                    <th>가격</th>
                    <td>{serverData.results.product.productPrice.toLocaleString('ko-KR')}원</td>
                  </tr>
                  <tr>
                    <th>재고</th>
                    <td>{serverData.results.product.stock}</td>
                  </tr>
                  <tr>
                    <th>총 페이지 수</th>
                    <td>{serverData.results.product.totalPages}</td>
                  </tr>
                  <tr>
                    <th>발행일</th>
                    <td>{serverData.results.product.publicationDate}</td>
                  </tr>
                  <tr>
                    <th>등록일</th>
                    <td>{serverData.results.product.createDt.replace('T', ' ')}</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col md={12}>
              <h5 className="fw-boldqu"><FaAlignLeft className="me-2" /> 상품정보</h5>
              <br/>
              {serverData.results.product.description && (
                <div className="quill-content">
                <QuillViewer description={serverData.results.product.description} />
                </div>
              )}
              
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer className="text-center" style={{ backgroundColor: '#f8f9fa' }}>
          <Button variant="warning" onClick={onClickEditHandler} className="me-2" style={{ minWidth: '120px' }}>
            수정
          </Button>
          <Button variant="danger" onClick={onClickDeleteHandler} className="me-2" style={{ minWidth: '120px' }}>
            삭제
          </Button>
          <Button variant="secondary" onClick={goToProductListPage} style={{ minWidth: '120px' }}>
            목록
          </Button>
        </Card.Footer>
      </Card>

    </div>
  );
};

export default AdminProductDetailComp;
















