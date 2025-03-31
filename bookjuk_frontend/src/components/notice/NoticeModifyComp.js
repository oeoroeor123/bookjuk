/**
 * 공지사항
 * 
 * Developer : 김민희
 */

import { useEffect, useState } from 'react';
import { alert, confirm } from '../../common/settings';
import { getNoticeDetail, getNoticeModify } from '../../api/noticeAPI';
import CustomNavigate from '../../hooks/CustomNavigate';

import QuillEditor from '../secondhand/QuillEditor';

import { Container, Card, Form, Row, Col, Button, Modal, ModalFooter, Table } from 'react-bootstrap';
import { FaPlusCircle } from 'react-icons/fa';


const NoticeModifyComp = ({ id }) => {

  const { goToNoticeListPage, goToNoticeDetailPage } = CustomNavigate();

  const [editorValue, setEditorValue] = useState("");
  const [notice, setNotice] = useState({
    noticeId: 0, 
    user: {
      userId: 0, 
      userName: '', 
      userNickname: '',
      userRoles: '',
    },
    noticeTitle: '', 
    noticeContent: '', 
    noticeCreateDt: '', 
    noticeUpdateDt: '',
  })

  useEffect(() => {
    getNoticeDetail(id)
      .then(jsonData => {
        //console.log(jsonData);
        setNotice(jsonData.results.notice);
      })

  }, [id]);

  const onChangeHandler = e => {
    setNotice({
      ...notice,
      [e.target.name]: e.target.value,
    })
  }

  const onClickModify = () => {    
    //console.log(notice);
    confirm('게시물을 수정하시겠습니까?', async ()=>{
      notice.noticeContent = editorValue; // 에디터 내용 저장
      notice.user.userRoles = null;

      await getNoticeModify(notice)
        .then(jsonData => {
          alert(jsonData.message);
          //console.log(notice.noticeId);
          goToNoticeDetailPage(notice.noticeId);
        })
    }, ()=>{});
  };


  return (
    <>
      <Container className="my-5">
        <Card>
          <Card.Header as="h3" className="text-center">📝 공지사항 수정</Card.Header>
          <Card.Body>
            <Form>
              <Row className="mb-3 align-items-center">
                <Col md={4}>
                  <Form.Group controlId="formNoticeId">
                    <Form.Label className="fw-bold text-primary">번호</Form.Label>
                    <Form.Control
                      type="text"
                      name="noticeId"
                      value={notice.noticeId}
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
                      value={notice.user.userNickname}
                      disabled
                      className="text-center border-0 bg-light fw-semibold"
                    />
                  </Form.Group>
                </Col>                
                <Col md={4}>
                  <Form.Group controlId="formNoticeCreateDt">
                    <Form.Label className="fw-bold text-primary">등록일</Form.Label>
                    <Form.Control
                      type="text"
                      name="noticeCreateDt"
                      value={notice?.noticeCreateDt?.replace('T', ' ')}
                      disabled
                      className="border-0 bg-light text-center fw-semibold"
                    />
                  </Form.Group>
                </Col>
              </Row>
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
                  <Button variant="primary" onClick={onClickModify}>공지사항 수정</Button>{' '}
                  <Button variant="secondary" onClick={() => { goToNoticeDetailPage(id) }}>공지사항 수정 취소</Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default NoticeModifyComp;