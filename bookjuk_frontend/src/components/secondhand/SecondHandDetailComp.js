/**
 * 중고 상품 상세
 *
 * Developer : 김민희
 */

import { useEffect, useState } from 'react';
import { getSecondHandDetail, getSecondHandDelete } from '../../api/secondHandAPI';
import { alert, confirm, getIdFromSessionStorage, getUserRoleFromSessionStorage } from '../../common/settings';
import CustomNavigate from "../../hooks/CustomNavigate";

import QuillViewer from './QuillViewer';

import { Button, Card, Col, Table, Row } from 'react-bootstrap';


const SecondHandDetailComp = ({ id }) => {

  const { goToSecondhandListPage, goToSecondhandModifyPage } = CustomNavigate();
  const [contentShow, setContentShow] = useState(false);  // 숨김 표시 여부 상태
  const [secondhand, setSecondhand] = useState({
    secondhandId: 0,    
    secondhandName: '',
    secondhandImage: '',
    secondhandDescription: '',
    secondhandPrice: '',
    secondhandDate: '',
    createDt: '',
    salesYn: '',
    user: {
      userId: 0, 
      userName: '', 
      userNickname: '',
    },
    genre: {
      genreName: '',
    },
    publisher: {
      publisher: '',
    },
    author: {
      author: '',
    },
  });

  useEffect(() => {
    getSecondHandDetail(id)
      .then(jsonData => {
        //console.log(jsonData);
        setSecondhand(jsonData.results.secondhand);

        // 수정, 삭제 버튼 보이기
        if(getIdFromSessionStorage() === jsonData.results.secondhand.user.userId || getUserRoleFromSessionStorage() === "ADMIN") {
          setContentShow(!contentShow);
        }
      })
  }, [id]);

  const onClickModify = async () => {
    //console.log(id);
    //console.log(secondhand.user.userId);
    if(getIdFromSessionStorage() === secondhand.user.userId || getUserRoleFromSessionStorage() === "ADMIN") {
      goToSecondhandModifyPage(id);
    } else {
      alert("타인의 게시물을 수정할 수 없습니다.");
    }
  }
  const onClickDelete = async () => {
    //console.log(secondhand.secondhandDescription);
    //console.log(secondhand.user.userId);
    if(getIdFromSessionStorage() === secondhand.user.userId || getUserRoleFromSessionStorage() === "ADMIN") {

      confirm('게시물을 삭제하시겠습니까?', ()=>{
        getSecondHandDelete(id)
        .then(jsonData => {
          alert(jsonData.message);
          goToSecondhandListPage();
        })
      }, ()=>{});
    } else {
      alert("타인의 게시물을 삭제할 수 없습니다.");
    }
  }

  return (
    <>
      <div className="my-5">
        <Card style={{ borderRadius: '10px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>
          <Card.Header as="h3" className="text-center" style={{ backgroundColor: '#f8f9fa', padding: '20px' }}>
            📖 중고상품 상세 정보
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={4}>
                <div className="text-center">
                  <img src={"http://localhost:8080/secondhandimg/"+ secondhand.secondhandImage} 
                    alt={secondhand.secondhandImage} 
                    style={{ width: '100%', height: 'auto', borderRadius: '8px', border: '1px solid #ddd' }}
                  />
                </div>
              </Col>
              <Col md={8}>
                <Table responsive bordered hover>
                  <tbody>
                    <tr>
                      <th>상품 번호</th>
                      <td>{secondhand.secondhandId}</td>
                    </tr>
                    <tr>
                      <th>도서명</th>
                      <td>{secondhand.secondhandName}</td>
                    </tr>
                    <tr>
                      <th>장르 :</th>
                      <td>{secondhand.genre.genreName}</td>
                    </tr>
                    <tr>
                      <th>출판사 :</th>
                      <td>{secondhand.publisher.publisherName}</td>
                    </tr>
                    <tr>
                      <th>작가 :</th>
                      <td>{secondhand.author.authorName}</td>
                    </tr>
                    <tr>
                      <th>가격 :</th>
                      <td>{secondhand.secondhandPrice}</td>
                    </tr>
                    <tr>
                      <th>발행일 :</th>
                      <td>{secondhand.secondhandDate}</td>
                    </tr>
                    <tr>
                      <th>판매자 :</th>
                      <td>{secondhand.user.userNickname}</td>
                    </tr>                    
                    <tr>
                      <th>등록일 :</th>
                      <td>{secondhand.createDt.replace('T', ' ')}</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
            <Row className="mt-5">
              <Col md={12}>
                <h5 className="fw-bold">도서 설명</h5>
                {secondhand.secondhandDescription && (
                  <QuillViewer description={secondhand.secondhandDescription} />
                )}
              </Col>
            </Row>
          </Card.Body>
          <Card.Footer className="text-center" style={{ backgroundColor: '#f8f9fa' }}>            
            <Button variant="warning" className="me-2" style={{ minWidth: '120px' }}
              onClick={onClickModify} hidden={!contentShow}
            >
              수정
            </Button>
            <Button variant="danger" className="me-2" style={{ minWidth: '120px' }}
              onClick={onClickDelete} hidden={!contentShow}
            >
              삭제
            </Button>
            <Button variant="secondary" style={{ minWidth: '120px' }}
              onClick={() => { goToSecondhandListPage() }}
            >
              목록
            </Button>
          </Card.Footer>
        </Card>
      </div>    
    </>
  );
};

export default SecondHandDetailComp;