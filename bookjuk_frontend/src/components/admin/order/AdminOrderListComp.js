import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AdminNavigate from '../../../hooks/AdminNavigate';
import { getOrderList } from '../../../api/adminAPI';
import PageComp from '../../common/PageComp';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../../../css/admin/order.css';

const AdminOrderListComp = () => {
  const { goToOrderListPage, goToOrderDetailPage } = AdminNavigate();

  const [serverData, setServerData] = useState({
    status: 0,
    message: '',
    results: {
      orderList: [],
      pageList: [],
      pageDto: {},
    },
  });

  const [queryParams] = useSearchParams();
  const page = !queryParams.get('page') ? 1 : parseInt(queryParams.get('page'));
  const size = !queryParams.get('size') ? 5 : parseInt(queryParams.get('size'));
  const sort = !queryParams.get('sort') ? 'orderId,desc' : queryParams.get('sort');

  // 드롭다운에서 선택한 취소 상태를 저장 (기본은 전체)
  const [selectedCancelStatus, setSelectedCancelStatus] = useState('전체');

  useEffect(() => {
    getOrderList({ page, size, sort }).then((jsonData) => {
      setServerData(jsonData);
    });
  }, [page, size, sort]);

  // 주문 목록 전체에서 취소 사유(cancelReasons)의 cancelStatus.statusName들을 모아서 고유 옵션 배열 생성
  const getUniqueCancelStatuses = () => {
    const statuses = new Set();
    serverData.results.orderList.forEach((order) => {
      order.orderItems.forEach((item) => {
        if (item.cancelReasons && item.cancelReasons.length > 0) {
          item.cancelReasons.forEach((reason) => {
            statuses.add(reason.cancelStatus.statusName);
          });
        }
      });
    });
    return Array.from(statuses);
  };

  // 필터링된 주문 목록 (주문 내의 주문 아이템 중 드롭다운 상태에 해당하는 것만 남김)
  const filteredOrderList = serverData.results.orderList
    .map((order) => {
      const filteredItems = order.orderItems.filter((item) => {
        if (selectedCancelStatus === '전체') return true;
        if (item.cancelReasons && item.cancelReasons.length > 0) {
          return item.cancelReasons.some(
            (reason) => reason.cancelStatus.statusName === selectedCancelStatus
          );
        }
        return false;
      });
      return { ...order, orderItems: filteredItems };
    })
    .filter((order) => order.orderItems.length > 0);

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0">주문 목록</h4>
          {/* 드롭다운 필터: 취소 사유(cancelStatus.statusName) 선택 */}
          <Form.Select
            style={{ width: '200px' }}
            value={selectedCancelStatus}
            onChange={(e) => setSelectedCancelStatus(e.target.value)}
          >
            <option value="전체">전체</option>
            {getUniqueCancelStatuses().map((status, idx) => (
              <option key={idx} value={status}>
                {status}
              </option>
            ))}
          </Form.Select>
        </Card.Header>
        <Card.Body>
          {filteredOrderList.length === 0 ? (
            <div className="text-center py-4">해당 조건에 맞는 주문 내역이 없습니다.</div>
          ) : (
            <Table hover responsive>
              <thead>
                <tr>
                  <th className="text-center" style={{ whiteSpace: 'nowrap' }}>주문번호</th>
                  <th style={{ whiteSpace: 'nowrap' }}>주문상품 및 주문상태</th>
                  <th className="text-center" style={{ whiteSpace: 'nowrap' }}>구매자</th>
                  <th className="text-center" style={{ whiteSpace: 'nowrap' }}>주문일자</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrderList.map((order) => (
                  <tr
                    key={order.orderId}
                    style={{ cursor: 'pointer' }}
                    onClick={() => goToOrderDetailPage(order.orderId, queryParams)}
                  >
                    <td className="text-center align-middle">{order.orderId}</td>
                    <td className="align-middle">
                      {order.orderItems.map((item) => {
                        // 해당 주문상품에 취소요청이 있는지 여부 확인
                        const isCancelRequest = item.cancelReasons
                          ? item.cancelReasons.some(
                              (reason) => reason.cancelStatus.statusName === '취소요청'
                            )
                          : false;
                        return (
                          <Row
                            key={item.orderItemId}
                            className="mb-2 align-items-center"
                            style={isCancelRequest ? { backgroundColor: '#ffe6e6', padding: '5px', borderRadius: '5px' } : {}}
                          >
                            <Col md={2} xs={3}>
                              <img
                                className="img-fluid rounded order-thumbnail"
                                src={item.product.productImage}
                                alt="상품 이미지"
                              />
                            </Col>
                            <Col md={4} xs={9} className="order-detail-product-name">
                              {item.product.productName}
                            </Col>
                            <Col md={1} xs={4} className="text-center">
                              {item.quantity}개
                            </Col>
                            <Col md={2} xs={4} className="text-end">
                              {(item.quantity * item.price).toLocaleString('ko-KR')}원
                            </Col>
                            <Col md={3} xs={4} className="text-center">
                              <span className="badge bg-secondary me-1">
                                {item.orderStatus.statusName}
                              </span>
                              {isCancelRequest && (
                                <span className="badge bg-danger">취소요청</span>
                              )}
                            </Col>
                          </Row>
                        );
                      })}
                    </td>
                    <td className="text-center align-middle">{order.user.userId}</td>
                    <td className="text-center align-middle">
                      {order.createDt.replace('T', ' ')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
      {serverData.results.orderList.length !== 0 && (
        <div className="mt-3">
          <PageComp
            serverData={serverData}
            goToListPage={goToOrderListPage}
            size={size}
            sort={sort}
          />
        </div>
      )}
    </Container>
  );
};

export default AdminOrderListComp;
