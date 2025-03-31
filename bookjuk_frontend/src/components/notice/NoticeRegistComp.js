/**
 * 공지사항
 * 
 * Developer : 김민희
 */

import { useState } from 'react';
import { alert, getIdFromSessionStorage } from '../../common/settings';
import { getNoticeRegist } from '../../api/noticeAPI';
import CustomNavigate from '../../hooks/CustomNavigate';

import QuillEditor from '../secondhand/QuillEditor';

import { Container, Card, Form, Row, Col, Button, Modal, ModalFooter, Table } from 'react-bootstrap';
import { FaPlusCircle } from 'react-icons/fa';


const NoticeRegistComp = () => {

  const { goToNoticeListPage } = CustomNavigate();

  const [editorValue, setEditorValue] = useState("");
  const [notice, setNotice] = useState({
    noticeId: 0, 
    user: {
    userId: 0, 
    },
    noticeTitle: '', 
    noticeContent: '', 
    noticeCreateDt: '', 
    noticeUpdateDt: '',
  })

  const onChangeHandler = e => {
    setNotice({
      ...notice,
      [e.target.name]: e.target.value,
    })
  }

  const onClickRegist = () => {
    if(notice.noticeTitle === '') {
      alert("제목 입력 누락!!");
    } else {
      notice.noticeContent = editorValue; // 에디터 내용 저장
      notice.user.userId = getIdFromSessionStorage();

      getNoticeRegist(notice)
        .then(jsonData => {
          //console.log(jsonData);
          alert(jsonData.message);
          goToNoticeListPage();
        })
    }
  };


  return (
    <>
      <Container className="my-4">
        <Card>
          <Card.Header as="h3" className="text-center">
            <FaPlusCircle className="me-2" />공지사항 등록
          </Card.Header>
          <Card.Body>
            <Form>
              <Row className="mb-3">
                <Col>
                  <Form.Group controlId="formNoticeTitle">
                    <Form.Label className="fw-bold text-primary">
                      제목
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="noticeTitle"
                      value={notice.noticeTitle}
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
                          setEditorValue={setEditorValue} description={notice.noticeContent} imgFlg={false} 
                        />
                      </Form.Group>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>              
              <Row className="mb-3">
                <Col md={12}>
                  <Button variant="primary" onClick={onClickRegist}>Q&A 등록</Button>{' '}
                  <Button variant="secondary" onClick={() => { goToNoticeListPage() }}>Q&A 등록 취소</Button>
                </Col>
              </Row>
            </Form>
          </Card.Body> 
        </Card>
      </Container>
    </>
  );
};

export default NoticeRegistComp;