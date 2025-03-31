/**
 * FAQ
 *
 * Developer : 김민희
 */

import { useEffect, useState } from 'react';
import { alert, confirm } from '../../common/settings';
import { getFaqDetail, getFaqModify } from '../../api/faqAPI ';
import CustomNavigate from '../../hooks/CustomNavigate';

import QuillEditor from '../secondhand/QuillEditor';

import { Container, Card, Form, Row, Col, Button, Modal, ModalFooter, Table } from 'react-bootstrap';
import { FaPlusCircle } from 'react-icons/fa';


const FAQModifyComp = ({ id }) => {

  const { goToFaqListPage, goToFaqDetailPage } = CustomNavigate();

  const [editorValue, setEditorValue] = useState("");
  const [faq, setFaq] = useState({
    faqId: 0, 
    user: {
      userId: 0, 
      userName: '', 
      userNickname: '',
      userRoles: '',
    },
    faqTitle: '', 
    faqContent: '', 
    faqCreateDt: '', 
    faqUpdateDt: '',
  })

  useEffect(() => {
    getFaqDetail(id)
      .then(jsonData => {
        //console.log(jsonData);
        setFaq(jsonData.results.faq);
      })

  }, [id]);

  const onChangeHandler = e => {
    setFaq({
      ...faq,
      [e.target.name]: e.target.value,
    })
  }

  const onClickModify = () => {    
    //console.log(faq);
    confirm('게시물을 수정하시겠습니까?', async ()=>{
      faq.faqContent = editorValue; // 에디터 내용 저장
      faq.user.userRoles = null;

      await getFaqModify(faq)
        .then(jsonData => {
          alert(jsonData.message);
          //console.log(faq.faqId);
          goToFaqDetailPage(faq.faqId);
        })
    }, ()=>{});
  };


  return (
    <>
      <Container className="my-5">
        <Card>
          <Card.Header as="h3" className="text-center">📝 FAQ 수정</Card.Header>
          <Card.Body>
            <Form>
              <Row className="mb-3 align-items-center">
                <Col md={4}>
                  <Form.Group controlId="formFaqId">
                    <Form.Label className="fw-bold text-primary">번호</Form.Label>
                    <Form.Control
                      type="text"
                      name="faqId"
                      value={faq.faqId}
                      disabled
                      className="text-center border-0 bg-light fw-semibold"
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="formUserNickname">
                    <Form.Label className="fw-bold text-primary">작성자</Form.Label>
                    <Form.Control
                      type="text"
                      name="userNickname"
                      value={faq.user.userNickname}
                      disabled
                      className="text-center border-0 bg-light fw-semibold"
                    />
                  </Form.Group>
                </Col>                
                <Col md={4}>
                  <Form.Group controlId="formFaqCreateDt">
                    <Form.Label className="fw-bold text-primary">등록일</Form.Label>
                    <Form.Control
                      type="text"
                      name="faqCreateDt"
                      value={faq?.faqCreateDt?.replace('T', ' ')}
                      disabled
                      className="border-0 bg-light text-center fw-semibold"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Group controlId="formFaqTitle">
                    <Form.Label className="fw-bold text-primary">
                      제목
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="faqTitle"
                      value={faq.faqTitle}
                      onChange={onChangeHandler}
                      placeholder="상품명을 입력하세요."
                      className="border border-primary"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="my-4">
                <Col>
                  <Card className="p-3 shadow-sm">
                    <Card.Body>
                      <Form.Group controlId="formsecondhandDescription">
                        <Form.Label className="fw-bold text-primary fs-5">
                          내용
                        </Form.Label>
                        <QuillEditor editorValue={editorValue} 
                          setEditorValue={setEditorValue} description={faq.faqContent} imgFlg={false} 
                        />
                      </Form.Group>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>              
              <Row className="mb-3">
                <Col md={12}>
                  <Button variant="primary" onClick={onClickModify}>FAQ 수정</Button>{' '}
                  <Button variant="secondary" onClick={() => { goToFaqDetailPage(id) }}>FAQ 수정 취소</Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default FAQModifyComp;