/**
 * 중고 상품 수정
 *
 * Developer : 김민희
 */

import { useEffect, useState } from 'react';
import { getSecondHandDetail, getGenreList, getSecondHandModify } from '../../api/secondHandAPI';
import CustomNavigate from "../../hooks/CustomNavigate";
import { alert, confirm } from '../../common/settings';

import QuillEditor from './QuillEditor';

import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';


const SecondHandModifyComp = ({ id }) => {

  const { goToSecondhandListPage, goToSecondhandDetailPage } = CustomNavigate();

  const [imageUrls, setImageUrls] = useState([]); // 서버에서 받은 이미지 URL을 저장하는 배열
  const [editorValue, setEditorValue] = useState("");
  const [imgFile, setImgFile] = useState(null);
  const [imgDisplay, setImgDisplay] = useState(null);
  const [imgShow, setImgShow] = useState(true);  // 이미지 표시 여부 상태
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
      userRoles: '',
    },
    genre: {
      genreId: 0,
      genreName: '',
    },
    publisher: {
      publisherId: 0,
      publisherName: '',
      website: '',
    },
    author: {
			authorId: 0,
			authorName: '',
      authorBirth: '',
			biography: '',
			majorWorks: '',
    },
  })

  const [genreData, setGenreData] = useState({
    status: 0,
    message: '',
    results: {
      genreList: [],
    }
  })

  useEffect(() => {
    getSecondHandDetail(id)
      .then(jsonData => {
        //console.log(jsonData);
        setSecondhand(jsonData.results.secondhand);
      })

    getGenreList()
    .then(jsonData => {      // 장르 목록 가져오기
      //console.log(jsonData);
      setGenreData(jsonData);
    })
  }, [id]);

  const onChangeHandler = e => {       
    if(e.target.name === 'genreId') {
      setSecondhand({
        ...secondhand,
        genre: {
          ...secondhand.genre,
          [e.target.name]: e.target.value,
        }
      })
    } else if(e.target.name === 'publisherName') {
      setSecondhand({
        ...secondhand,
        publisher: {
          ...secondhand.publisher,
          [e.target.name]: e.target.value,
        }
      })
    } else if(e.target.name === 'authorName') {
      setSecondhand({
        ...secondhand,
        author: {
          ...secondhand.author,
          [e.target.name]: e.target.value,
        }
      })
    } else {
      setSecondhand({
        ...secondhand,
        [e.target.name]: e.target.value,
      })
    } 
  }

  const onChangeFileHandler = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {        // 파일 읽기 완료 후 실행될 함수
        setImgDisplay(reader.result);   // display할 이미지 상태에 저장
        setImgFile(file);               // 첨부파일
        setImgShow(!imgShow);           // 기존 이미지 숨기기
      };
      reader.readAsDataURL(file);  // 파일을 DataURL 형식으로 읽기
    }

    setSecondhand({
      ...secondhand,
      [e.target.name]: e.target.value,  // 첨부파일 경로
    })
  }

  const onClickModify = async () => {    
    confirm('게시물을 수정하시겠습니까?', async ()=>{
      setSecondhand({                   // id도 저장해서 전달
        ...secondhand,
        secondhandId: id
      })
      secondhand.secondhandDescription = editorValue; // 에디터 내용 저장
      secondhand.user.userRoles = null;

      //console.log(imgFile);
      //console.log(secondhand);
      const secondhandData = new FormData();
      secondhandData.append("imgFile", imgFile);
      secondhandData.append("secondhand", JSON.stringify(secondhand));
      secondhandData.append("imageUrls", JSON.stringify(imageUrls));

      await getSecondHandModify(secondhandData)
        .then(jsonData => {
          alert(jsonData.message);
          goToSecondhandDetailPage(secondhand.secondhandId);
        })
    }, ()=>{});
  }

  return (
    <>
      <Container className="my-5">
        <Card>
          <Card.Header as="h3" className="text-center">
            📝 상품 수정
          </Card.Header>
          <Card.Body>
            <Form>
              <Row className="mb-3 align-items-center">
                <Col md={4}>
                  <Form.Group controlId="formsecondhandId">
                    <Form.Label className="fw-bold text-primary">
                      상품 번호
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="secondhandId"
                      value={secondhand.secondhandId}
                      disabled
                      className="text-center border-0 bg-light fw-semibold"
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="formUserNickname">
                    <Form.Label className="fw-bold text-primary">
                      판매자
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="userNickname"
                      value={secondhand.user.userNickname}
                      disabled
                      className="text-center border-0 bg-light fw-semibold"
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="formCreateDt">
                    <Form.Label className="fw-bold text-primary">
                      등록일
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="createDt"
                      value={secondhand.createDt.replace('T', ' ')}
                      disabled
                      className="border-0 bg-light text-center fw-semibold"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">  {/* 이미지 업로드 */}
                <Col md={12}>
                  <Form.Group controlId="formSecondhandImage">
                    <Form.Label className="fw-bold text-primary">
                      상품 대표 이미지 업로드
                    </Form.Label>
                      {imgDisplay && (
                        <img src={imgDisplay} alt="상품 이미지" className="img-fluid img-thumbnail mb-2" />
                      )}
                      <img src={"http://localhost:8080/image/"+ secondhand.secondhandImage} alt={secondhand.secondhandImage} hidden={!imgShow} />
                    <Form.Control type="file" name="secondhandImage" onChange={onChangeFileHandler} />
                  </Form.Group>
                </Col>
              </Row>                          
              <Row className="mb-3">  {/* 상품명 & 장르 */}
                <Col md={6}>
                  <Form.Group controlId="formSecondhandName">
                    <Form.Label className="fw-bold text-primary">
                      도서명
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="secondhandName"
                      value={secondhand.secondhandName}
                      onChange={onChangeHandler}
                      placeholder="상품명을 입력하세요."
                      className="border border-primary"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formGenreId">
                    <Form.Label className="fw-bold text-primary">
                      장르
                    </Form.Label>
                    <Form.Select
                      name="genreId"
                      value={secondhand.genre.genreId}
                      onChange={onChangeHandler}
                      className="border border-primary"
                    >
                      <option value="0">장르 선택</option>
                      {genreData.results.genreList.map((genre) => (
                        <option key={genre.genreId} value={genre.genreId}>
                          {genre.genreName}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>              
              <Row className="mb-3">  {/* 작가 & 출판사 */}
                <Col md={6}>
                  <Form.Group controlId="formAuthorName">
                    <Form.Label className="fw-bold text-primary">
                      작가
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="authorName"
                      value={secondhand.author.authorName}
                      onChange={onChangeHandler}
                      placeholder="작가명을 입력하세요."
                      className="border border-primary"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formPublisherName">
                    <Form.Label className="fw-bold text-primary">
                      출판사
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="publisherName"
                      value={secondhand.publisher.publisherName}
                      onChange={onChangeHandler}
                      placeholder="출판사를 입력하세요."
                      className="border border-primary"
                    />
                  </Form.Group>
                </Col>
              </Row>              
              <Row className="mb-3">  {/* 발행일, 가격, */}
                <Col md={6}>
                  <Form.Group controlId="formSecondhandDate">
                    <Form.Label className="fw-bold text-primary">발행일</Form.Label>
                    <Form.Control
                      type="date"
                      name="secondhandDate"
                      value={secondhand.secondhandDate}
                      onChange={onChangeHandler}
                      className="border border-primary"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formSecondhandPrice">
                    <Form.Label className="fw-bold text-primary">가격 (₩)</Form.Label>
                    <Form.Control
                      type="number"
                      name="secondhandPrice"
                      value={secondhand.secondhandPrice}
                      onChange={onChangeHandler}
                      placeholder="가격"
                      className="border border-primary"
                    />
                  </Form.Group>
                </Col>
              </Row>              
              <Row className="my-4">  {/* 내용 */}
                <Col md={12}>
                  <Card className="p-3 shadow-sm">
                    <Card.Body>
                      <Form.Group controlId="formDescription">
                        <Form.Label className="fw-bold text-primary fs-5">
                          📖 도서 상세 설명
                        </Form.Label>
                        {secondhand.secondhandDescription && (
                          <QuillEditor editorValue={editorValue} setEditorValue={setEditorValue} 
                            description={secondhand.secondhandDescription} imgFlg={true} 
                            imageUrls={imageUrls} setImageUrls={setImageUrls}
                          />
                        )}
                      </Form.Group>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>  
              <br />            
              <Row className="mb-3">  {/* 수정 완료, 수정 취소 버튼 */}
                <Col>
                  <Button variant="primary" onClick={onClickModify}>수정 완료</Button>{' '}
                  <Button variant="secondary" onClick={() => { goToSecondhandDetailPage(id) }}>수정 취소</Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default SecondHandModifyComp;