/**
 * 중고 상품 등록
 *
 * Developer : 김민희
 */

import { useState, useEffect } from 'react';
import { getGenreList, getSecondHandRegist } from '../../api/secondHandAPI';
import { alert, confirm, getIdFromSessionStorage } from '../../common/settings';
import CustomNavigate from '../../hooks/CustomNavigate';
import axios from 'axios';

import QuillEditor from './QuillEditor';

import { Container, Card, Form, Row, Col, Button, Modal, ModalFooter, Table } from 'react-bootstrap';
import { FaPlusCircle } from 'react-icons/fa';


const SecondHandRegistComp = () => {

  const { goToSecondhandListPage } = CustomNavigate();

  const [imageUrls, setImageUrls] = useState([]); // 서버에서 받은 이미지 URL을 저장하는 배열
  const [editorValue, setEditorValue] = useState("");
  const [imgFile, setImgFile] = useState(null);
  const [imgDisplay, setImgDisplay] = useState(null);
  const [secondhand, setSecondhand] = useState({
    secondhandId: 0,
    userId: 0,
    genreId: 0,
    publisherName: '',
    authorName: '',
    secondhandName: '',
    secondhandImage: '',
    secondhandDescription: '',
    secondhandPrice: 0,
    secondhandDate: '',
    salesYn: '',
  })

  const [genreData, setGenreData] = useState({
    status: 0,
    message: '',
    results: {
      genreList: [],
    }
  })

  useEffect(() => {
    getGenreList()      // 장르 목록 가져오기
      .then(jsonData => {
        //console.log(jsonData);
        setGenreData(jsonData);
      })
  }, []);

  const onChangeFileHandler = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {        // 파일 읽기 완료 후 실행될 함수
        setImgDisplay(reader.result);   // display할 이미지 상태에 저장
        setImgFile(file);               // 첨부파일
      };
      reader.readAsDataURL(file);  // 파일을 DataURL 형식으로 읽기
    }

    setSecondhand({
      ...secondhand,
      [e.target.name]: e.target.value,  // 첨부파일 경로
    })
  }

  const onClickRegist = async () => {
    if(secondhand.secondhandName === '') {
      alert("제목 입력 누락!!");
    } else if(secondhand.authorName === '') {
      alert("작가 입력 누락!!");
    } else if(secondhand.publisherName === '') {
      alert("출판사 입력 누락!!");
    } else if(secondhand.genreId <= 0) {
      alert("장르 입력 누락!!");
    } else if(secondhand.secondhandPrice <= 0) {
      alert("가격 입력 누락!!");
    } else {
      secondhand.userId = getIdFromSessionStorage();                      // 유저 아이디 저장
      secondhand.salesYn = "Y";                                           // 판매여부 저장
      secondhand.secondhandDescription = editorValue; // 에디터 내용 저장

      // console.log(imgFile);
      // console.log(secondhand);
      // console.log(secondhand.secondhandDescription);
      const secondhandData = new FormData();
      secondhandData.append("imgFile", imgFile);
      secondhandData.append("secondhand", JSON.stringify(secondhand));
      secondhandData.append("imageUrls", JSON.stringify(imageUrls));

      getSecondHandRegist(secondhandData)
        .then(jsonData => {
          //console.log(jsonData);
          alert(jsonData.message);
          goToSecondhandListPage();
          })
    }
  }

  const onClickCancel = async () => {
    imageUrls.forEach((url, index) => {
      //console.log(`Image ${index + 1}: ${url}`);
    });

    try {
      const response = await axios.post('http://localhost:8080/quill/upload/urls', {
        imageUrls: imageUrls, // 이미지 URL 배열을 서버에 전송
      });
      //console.log("서버 응답:", response.data);
    } catch (error) {
      //console.error("이미지 URL 전송 실패:", error);
    }

    goToSecondhandListPage();
  }

  const onChangeHandler = e => {
    let { name, value } = e.target;
    // 숫자 입력 필드에 대한 처리
    if (["secondhandPrice", "stock", "totalPages"].includes(name)) {
      value = value === "" ? 0 : Number(value);   // 빈 문자열일 경우 0으로 처리
    }
    setSecondhand(prev => ({ ...prev, [name]: value }));
  }

  const handleNumericFocus = e => {   // 숫자 입력 필드에서 포커스할 때 0을 지우는 함수
    const { name, value } = e.target;
    
    if (value === "0" || value === 0) {
      setSecondhand(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleNumericBlur = e => {    // 숫자 입력 필드에서 포커스가 벗어날 때 0으로 설정하는 함수
    const { name, value } = e.target;

    if (value === "") {
      setSecondhand(prev => ({ ...prev, [name]: 0 }));
    }
  }


  return (
    <>
      <Container className="my-4">
        <Card>
          <Card.Header as="h3" className="text-center">
            <FaPlusCircle className="me-2" />중고상품 등록
          </Card.Header>
          <Card.Body>
            <Form>
              <Row className="mb-3">  {/* 이미지 업로드 */}
                <Col md={12}>
                  <Form.Group controlId="formSecondhandImage">
                    <Form.Label className="fw-bold text-primary">
                      상품 대표 이미지 업로드
                    </Form.Label>
                      {imgDisplay && (
                        <img src={imgDisplay} alt="상품 이미지" className="img-fluid img-thumbnail mb-2" />
                      )}
                    <Form.Control type="file" name="secondhandImage" onChange={onChangeFileHandler} />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">  {/* 상품명, 장르 */}
                <Col md={6}>
                  <Form.Group controlId="formSecondhandName">
                    <Form.Label className="fw-bold text-primary">
                      상품명
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
                      value={secondhand.genreId}
                      onChange={onChangeHandler}
                    >
                      <option value="0">장르 선택</option>
                      {genreData?.results?.genreList?.map((genre) => (
                        <option key={genre.genreId} value={genre.genreId}>
                          {genre.genreName}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">  {/* 작가 */}
                <Col md={6}>
                  <Form.Group controlId="formAuthorName">
                    <Form.Label className="fw-bold text-primary">
                      작가
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="authorName"
                      value={secondhand.authorName}
                      onChange={onChangeHandler}
                      placeholder="작가명을 입력하세요."
                      className="border border-primary"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>  {/* 출판사 */}
                  <Form.Group controlId="formPublisherName">
                    <Form.Label className="fw-bold text-primary">
                      출판사
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="publisherName"
                      value={secondhand.publisherName}
                      onChange={onChangeHandler}
                      className="border border-primary"
                      placeholder="출판사를 입력하세요."
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">  {/* 발행일, 가격 */}
                <Col md={6}>
                  <Form.Group controlId="formSecondhandDate">
                    <Form.Label className="fw-bold text-primary">
                      발행일
                    </Form.Label>
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
                    <Form.Label className="fw-bold text-primary">
                      가격<span className="ms-2">₩</span>
                    </Form.Label>
                    <div className="d-flex align-items-center">
                      <Form.Control
                        type="number"
                        name="secondhandPrice"
                        value={secondhand.secondhandPrice}
                        onChange={onChangeHandler}
                        onFocus={handleNumericFocus}
                        onBlur={handleNumericBlur}
                        placeholder="가격을 입력하세요."
                        className="border border-primary"
                      />
                    </div>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="my-4">  {/* 내용 */}
                <Col md={12}>
                  <Card className="p-3 shadow-sm">
                    <Card.Body>
                      <Form.Group controlId="formsecondhandDescription">
                        <Form.Label className="fw-bold text-primary fs-5">
                          📖 도서 상세 설명
                        </Form.Label>
                        <QuillEditor editorValue={editorValue} setEditorValue={setEditorValue}
                          description={secondhand.secondhandDescription} imgFlg={true}
                          imageUrls={imageUrls} setImageUrls={setImageUrls}
                        />
                      </Form.Group>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row className="mb-3">  {/* 등록 버튼 */}
                <Col md={12}>
                  <Button variant="primary" onClick={onClickRegist}>중고상품 등록</Button>{' '}
                  <Button variant="secondary" onClick={onClickCancel}>중고상품 등록 취소</Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default SecondHandRegistComp;