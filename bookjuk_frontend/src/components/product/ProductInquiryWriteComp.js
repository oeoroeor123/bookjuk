import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { postProductInquiry } from '../../api/productRestAPI'; // 상품 문의를 서버에 등록하는 API 호출 함수
import { getIdFromSessionStorage } from '../../common/settings';
import QuillEditor from '../secondhand/QuillEditor';
import { Container, Card, Form, Row, Col, Button } from 'react-bootstrap';
import { FaPlusCircle } from 'react-icons/fa';
import CustomNavigate from '../../hooks/CustomNavigate';

const ProductInquiryWriteComp = () => {

  // userId 사용하기
  const userId = getIdFromSessionStorage();
  
  // productId 사용하기
  const {productId} = useParams();
  const parsedProductId = Number(productId); // 숫자로 변환
  
  // 페이지 이동
  const navigate = useNavigate();

  // 상세 이동 함수
  const { goToProductListDetailPage } = CustomNavigate();


  // 상태 관리
  const [editorValue, setEditorValue] = useState('');
  const [inquiry, setInquiry] = useState({
    inquiryTitle: '',
    inquiryContent: '',
  });

  // 문의글 작성 함수
  const onChangeHandler = (e) => {
    setInquiry({
      ...inquiry,
      [e.target.name]: e.target.value,
    });
  };

  const onClickSubmit = async () => {

    // 제목 미기입 방지
    if (!inquiry.inquiryTitle.trim()) {
      alert("문의글 제목을 입력해주세요.");
      return;
    }

    // 문의 데이터 가져오기
    const inquiryData = {
      product: {
        productId: parsedProductId,
      },
      user: {
        userId: userId,
      },
      inquiryTitle: inquiry.inquiryTitle,
      inquiryContent: editorValue,
    };

    console.log("보내는 데이터:", inquiryData);

    try {
      const response = await postProductInquiry(inquiryData);

      // 문의글 작성 성공 시 해당 상품 상세로 이동
      if (response.status === 200) {
        alert("상품 문의가 성공적으로 등록되었습니다.");
        navigate(`/product/detail/${parsedProductId}`);
      } else {
        alert(response.message || "상품 문의 작성 중 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("서버와의 연결 오류가 발생했습니다.");
    }
  };
  
  return (
      <Container className="my-4">
        <Card>
          <Card.Header as="h3" className="text-center">
            <FaPlusCircle className="me-2" />상품 문의 작성
          </Card.Header>
          <Card.Body>
            <Form>
              <Row className="mb-3">
                <Col>
                  <Form.Group controlId="formInquiryTitle">
                    <Form.Label className="fw-bold text-primary">제목</Form.Label>
                    <Form.Control
                      type="text"
                      name="inquiryTitle"
                      value={inquiry.inquiryTitle}
                      onChange={onChangeHandler}
                      placeholder="상품 문의 제목을 입력하세요."
                      className="border border-primary"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="my-4">
                <Col>
                  <Card className="p-3 shadow-sm">
                    <Card.Body>
                      <Form.Group controlId="formInquiryContent">
                        <Form.Label className="fw-bold text-primary fs-5">내용</Form.Label>
                        <QuillEditor
                          editorValue={editorValue}
                          setEditorValue={setEditorValue}
                          description={inquiry.inquiryContent}
                          imgFlg={false}
                        />
                      </Form.Group>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={12}>
                  <Button variant="primary" onClick={onClickSubmit}>상품 문의 등록</Button>{' '}
                  <Button variant="secondary" onClick={() => goToProductListDetailPage(parsedProductId)}>취소</Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    );
  };

export default ProductInquiryWriteComp;
