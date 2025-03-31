import { useEffect, useState } from 'react';
import { alert, confirm } from '../../common/settings';
import { getQnaDetail, getQnaModify } from '../../api/qnaAPI';
import CustomNavigate from '../../hooks/CustomNavigate';

import QuillEditor from '../secondhand/QuillEditor';

import { Container, Card, Form, Row, Col, Button, Modal, ModalFooter, Table } from 'react-bootstrap';
import { FaPlusCircle } from 'react-icons/fa';


const QnaModifyComp = ({ id }) => {

  const { goToQnaListPage, goToQnaDetailPage } = CustomNavigate();

  const [editorValue, setEditorValue] = useState("");
  const [qna, setQna] = useState({
    qnaId: 0, 
    user: {
      userId: 0, 
      userName: '', 
      userNickname: '',
      userRoles: '',
    },
    qnaTitle: '', 
    qnaContent: '', 
    qnaCreateDt: '', 
    qnaUpdateDt: '',
  })

  useEffect(() => {
    getQnaDetail(id)
      .then(jsonData => {
        //console.log(jsonData);
        setQna(jsonData.results.qna);
      })

  }, [id]);

  const onChangeHandler = e => {
    setQna({
      ...qna,
      [e.target.name]: e.target.value,
    })
  }

  const onClickModify = () => {    
    //console.log(qna);
    confirm('게시물을 수정하시겠습니까?', async ()=>{
      qna.qnaContent = editorValue; // 에디터 내용 저장
      qna.user.userRoles = null;

      await getQnaModify(qna)
        .then(jsonData => {
          alert(jsonData.message);
          //console.log(qna.qnaId);
          goToQnaDetailPage(qna.qnaId);
        })
    }, ()=>{});
  };


  return (
    <>
      <Container className="my-5">
        <Card>
          <Card.Header as="h3" className="text-center">📝 Q&A 수정</Card.Header>
          <Card.Body>
            <Form>
              <Row className="mb-3 align-items-center">
                <Col md={4}>
                  <Form.Group controlId="formQnaId">
                    <Form.Label className="fw-bold text-primary">번호</Form.Label>
                    <Form.Control
                      type="text"
                      name="qnaId"
                      value={qna.qnaId}
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
                      value={qna.user.userNickname}
                      disabled
                      className="text-center border-0 bg-light fw-semibold"
                    />
                  </Form.Group>
                </Col>                
                <Col md={4}>
                  <Form.Group controlId="formQnaCreateDt">
                    <Form.Label className="fw-bold text-primary">등록일</Form.Label>
                    <Form.Control
                      type="text"
                      name="qnaCreateDt"
                      value={qna?.qnaCreateDt?.replace('T', ' ')}
                      disabled
                      className="border-0 bg-light text-center fw-semibold"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Group controlId="formQnaTitle">
                    <Form.Label className="fw-bold text-primary">
                      제목
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="qnaTitle"
                      value={qna.qnaTitle}
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
                          setEditorValue={setEditorValue} description={qna.qnaContent} imgFlg={false} 
                        />
                      </Form.Group>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>              
              <Row className="mb-3">
                <Col md={12}>
                  <Button variant="primary" onClick={onClickModify}>Q&A 수정</Button>{' '}
                  <Button variant="secondary" onClick={() => { goToQnaDetailPage(id) }}>Q&A 수정 취소</Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default QnaModifyComp;