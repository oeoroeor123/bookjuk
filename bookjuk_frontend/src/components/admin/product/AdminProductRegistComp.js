/**
 * 관리자 - 상품 등록
 *
 * Developer : 김성율
 */

import { Container, Card, Form, Row, Col, Button, Modal, ModalFooter, Table } from 'react-bootstrap';
import { FaAlignLeft, FaBook, FaBox, FaBuilding, FaCalendarAlt, FaCheck, FaFileAlt, FaImage, FaPlusCircle, FaTags, FaTimes, FaUserEdit } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import AdminProductNavigate from '../../../hooks/AdminProductNavigate';
import { getGenreList,
         getProductRegist,
         getAuthorSearchList,
         getCreateAuthor,
         getCreatePublisher,
         getPublisherSearchList,
         getAuthorList,
         getPublisherList } from '../../../api/adminProductAPI';


import QuillEditor from '../../secondhand/QuillEditor';
import { toast } from 'react-toastify';
import { confirm } from '../../../common/settings';

const AdminProductRegistComp = () => {

  const { goToProductListPage } = AdminProductNavigate();

  const [imageUrls, setImageUrls] = useState([]); // 서버에서 받은 이미지 URL을 저장하는 배열
  const [editorValue, setEditorValue] = useState("");


  // 상품 이미지 상태 관리
  const [imgFile, setImgFile] = useState(null);
  const [imgDisplay, setImgDisplay] = useState(null);


  // 상품 정보 상태
  const [serverData, setServerData] = useState({
    productId: 0,
    productImage: '',
    productName: '',
    description: '',
    productPrice: 0,
    stock: 0,
    createDt: '',
    publicationDate: '',
    totalPages: 0,
    genreId: 0,
    author: {
      authorName: '',
    },
    publisher: {
      publisherName: '',
    }
  });

  // 작가 목록 상태
  const [authorData, setAuthorData] = useState({
    status: 0,
    message: '',
    results: {
      authorList: [],
    },
  });

  // 장르 목록 상태
  const [genreData, setGenreData] = useState({
    status: 0,
    message: '',
    results: {
      genreList: [],
    },
  });

  // 출판사 목록 상태
  const [publisherData, setPublisherData] = useState({
    status: 0,
    message: '',
    results: {
      publisherList: [],
    },
  });

  // 작가 모달 상태
  const [showAuthorModal, setShowAuthorModal] = useState(false);

  // 작가 모달 열기
  const handleOpenAuthorModal = () => {
    setShowAuthorModal(true); // 모달 열기
    setSearchAuthor(''); // 검색어 초기화
    setIsSearchMode(true); // 검색 모드로 초기화
  };

  // 작가 모달 닫기
  const handleCloseAuthorModal = () => {
    setShowAuthorModal(false); // 모달 닫기
    setSearchAuthor(''); // 검색어 초기화
    setIsSearchMode(true); // 검색 모드로 초기화
  };


  // 출판사 모달 상태
  const [showPublisherModal, setShowPublisherModal] = useState(false);

  // 출판사 모달 열기
  const handleOpenPublisherModal = () => {
    setShowPublisherModal(true);
    setSearchPublisher(''); // 검색어 초기화
    setIsSearchMode(true); // 검색 모드로 초기화
  };

  // 출판사 모달 닫기
  const handleClosePublisherModal = () => {
    setShowPublisherModal(false);
    setSearchPublisher(''); // 검색어 초기화
    setIsSearchMode(true); // 검색 모드로 초기화
  };

  // 검색 모드인지 등록 모드인지 상태
  const [isSearchMode, setIsSearchMode] = useState(true);

  // 작가 검색 상태
  const [searchAuthor, setSearchAuthor] = useState('');

  // 출판사 검색 상태
  const [searchPublisher, setSearchPublisher] = useState('');

  // 신규 작가 및 출판사 상태
  const [newAuthor, setNewAuthor] = useState({
    authorName: '',
    authorBirth: '',
    biography: '',
    majorWorks: '',
  });

  const [newPublisher, setNewPublisher] = useState({
    publisherName: '',
    website: '',
  });


  // 장르 리스트 가져오기
  useEffect(() => {
    getGenreList()
      .then((jsonData) => {
        setGenreData(jsonData);
      })
  }, []);


  // 작가 가져오기
  useEffect(() => {
    if (showAuthorModal) {  // 모달이 열릴 때 기본 작가 리스트 요청
      console.log("📌 작가 모달 열림, API 호출 시작");

      getAuthorSearchList({ searchAuthor: '' })
        .then((authorData) => {
          console.log("✅ API 응답 데이터:", authorData);  // API 응답 확인

          setAuthorData({
            status: authorData?.status || 0,
            message: authorData?.message || '',
            results: {
              authorList: authorData?.results?.authorSearchList || [],
            },
          });
        })
        .catch((error) => {
          console.error("❌ 작가 검색 API 에러:", error);
        });
    }
  }, [showAuthorModal]);

  // 검색어가 변경될 때마다 작가 검색
  useEffect(() => {
    if (searchAuthor.trim() !== '') {
      console.log("📌 작가 검색어가 변경됨, 검색 API 호출:", searchAuthor);

      getAuthorSearchList({ searchAuthor })  // 검색어에 맞는 작가 리스트 요청
        .then((authorData) => {
          console.log("✅ 검색된 작가 리스트:", authorData);  // API 응답 확인

          setAuthorData({
            status: authorData?.status || 0,
            message: authorData?.message || '',
            results: {
              authorList: authorData?.results?.authorSearchList || [],  // 검색된 작가 리스트 설정
            },
          });
        })
        .catch((error) => {
          console.error("❌ 작가 검색 API 에러:", error);
          setAuthorData({
            status: 0,
            message: '검색 중 오류 발생',
            results: { authorList: [] }, // 오류 발생 시 빈 배열 유지
          });
        });
    } else {
      // 검색어가 빈 문자열일 때는 기본 작가 리스트 유지
      console.log("📌 작가 검색어가 빈 문자열, 기본 리스트 유지");
    }
  }, [searchAuthor]);  // searchAuthor가 변경될 때마다 실행


  // 출판사 가져오기
  useEffect(() => {
    if (showPublisherModal) {  // 모달이 열릴 때 기본 리스트 요청
      console.log("📌 출판사 모달 열림, API 호출 시작");

      getPublisherSearchList({ searchPublisher: '' })  // 기본 출판사 리스트 요청
        .then((publisherData) => {
          console.log("✅ 출판사 API 응답 데이터:", publisherData);  // API 응답 확인

          setPublisherData({
            status: publisherData?.status || 0, // 상태 코드
            message: publisherData?.message || '', // 메시지
            results: {
              publisherList: publisherData?.results?.publisherSearchList || [], // 출판사 리스트
            },
          });
        })
        .catch((error) => {
          console.error("❌ 출판사 검색 API 에러:", error);
          setPublisherData({
            status: 0, // 에러 상태 코드
            message: '출판사 목록 조회 중 오류 발생', // 에러 메시지
            results: { publisherList: [] }, // 오류 발생 시 빈 배열 유지
          });
        });
    }
  }, [showPublisherModal]); // showPublisherModal이 변경될 때마다 실행

  // 검색어가 변경될 때마다 출판사 검색
  useEffect(() => {
    if (searchPublisher.trim() !== '') {
      console.log("📌 출판사 검색어가 변경됨, 검색 API 호출:", searchPublisher);

      getPublisherSearchList({ searchPublisher })  // 검색어에 맞는 출판사 리스트 요청
        .then((publisherData) => {
          console.log("✅ 검색된 출판사 리스트:", publisherData);  // API 응답 확인

          setPublisherData({
            status: publisherData?.status || 0, // 상태 코드
            message: publisherData?.message || '', // 메시지
            results: {
              publisherList: publisherData?.results?.publisherSearchList || [], // 검색된 출판사 리스트
            },
          });
        })
        .catch((error) => {
          console.error("❌ 출판사 검색 API 에러:", error);
          setPublisherData({
            status: 0, // 에러 상태 코드
            message: '출판사 검색 중 오류 발생', // 에러 메시지
            results: { publisherList: [] }, // 오류 발생 시 빈 배열 유지
          });
        });
    } else {
      // 검색어가 빈 문자열일 때는 기본 출판사 리스트 유지
      console.log("📌 출판사 검색어가 빈 문자열, 기본 리스트 유지");
    }
  }, [searchPublisher]);  // searchPublisher가 변경될 때마다 실행



  // 상품 등록 처리 함수
  const onClickHandler = async () => {
    if (!serverData.productName) return toast("상품명을 입력하세요");
    if (!serverData.author.authorName) return toast("작가명을 입력하세요");
    if (!serverData.publisher.publisherName) return toast("출판사를 입력하세요");
    if (serverData.genreId <= 0) return toast("장르를 선택하세요");
    if (serverData.productPrice <= 0) return toast("가격을 입력하세요");
    if (serverData.stock <= 0) return toast("재고를 입력하세요");
    if (serverData.totalPages <= 0) return toast("총 페이지 수를 입력하세요");
    if (!serverData.publicationDate) return toast("발행일을 선택하세요.");
    const currentDate = new Date();
    const publicationDate = new Date(serverData.publicationDate);
    if (publicationDate > currentDate) return toast("발행일은 현재 날짜보다 미래일 수 없습니다.");


      confirm('상품을 등록하시겠습니까?', async ()=>{
        setServerData({
          ...serverData,

          });

          serverData.description = editorValue; // 에디터 내용 저장



    const productData = new FormData();
    productData.append("base64Image", imgFile);
    productData.append("product", JSON.stringify(serverData));
    productData.append("imageUrls", JSON.stringify(imageUrls));

    getProductRegist(productData).then(jsonData => {
      toast(jsonData.message);
      goToProductListPage();
    });

  }, ()=>{});

  };


  // 이미지 파일 업로드 및 표시 처리
  const onChangeFileHandler = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgDisplay(reader.result);// 파일 미리보기
        setImgFile(reader.result);// 이미지 파일 상태 저장
      };
      reader.readAsDataURL(file);
    }

  };

  // 입력값이 변경될 때마다 상태 업데이트
  const onChangeHandler = e => {
    let { name, value } = e.target;

    // 숫자 입력 필드에 대한 처리
    if (["productPrice", "stock", "totalPages"].includes(name)) {
      // 빈 문자열일 경우 0으로 처리
      value = value === "" ? 0 : Number(value);

    }

    // 상태 업데이트
    setServerData(prev => ({ ...prev, [name]: value }));
  };

  // 숫자 입력 필드에서 포커스할 때 0을 지우는 함수
  const handleNumericFocus = e => {
    const { name, value } = e.target;
    if (value === "0" || value === 0) {
      setServerData(prev => ({ ...prev, [name]: "" }));
    }
  };

  // 숫자 입력 필드에서 포커스가 벗어날 때 0으로 설정하는 함수
  const handleNumericBlur = e => {
    const { name, value } = e.target;
    if (value === "") {
      setServerData(prev => ({ ...prev, [name]: 0 }));
    }
  }



  // 작가 검색어 입력 처리
  const onChangeSearchAuthorHandler = (e) => {
    setSearchAuthor(e.target.value);
  };

  // 출판사 검색어 입력 처리
  const onChangeSearchPublisherHandler = e => {
    setSearchPublisher(e.target.value);
  };

  // 작가 선택 함수
  const handleAuthorSelect = (author) => {
    setServerData({
      ...serverData,
      author: {
        ...serverData.author,
        authorName: author.authorName,  // 선택된 작가 이름
        // authorId: author.authorId,      // 선택된 작가 ID (필요한 경우)
      },
    });

    // 모달 닫기
    handleCloseAuthorModal();
  };

  // 출판사 선택 함수
  const handlePublisherSelect = (publisher) => {
    setServerData({
      ...serverData,
      publisher: {
        ...serverData.publisher,
        publisherName: publisher.publisherName,  // 선택된 작가 이름

      },
    });

    // 모달 닫기
    handleClosePublisherModal();
  };


  // 신규 작가 등록
  const onChangeNewAuthorSubmit = async (e) => {
    e.preventDefault();

    // 필수 입력
    if (!newAuthor.authorName.trim()) {
      alert("작가명을 입력하세요.");
      return;
    }
    if (!newAuthor.authorBirth) {
      alert("출생일을 입력하세요.");
      return;
    }

    // 등록 여부 확인
    const isConfirmed = window.confirm("작가를 등록하시겠습니까?");
    if (!isConfirmed) {
      return; // 취소를 선택한 경우
    }

    try {
      // 신규 작가 등록 API 호출
      const response = await getCreateAuthor(newAuthor);

      if (response.status == 200) { // 등록 성공
        alert(response.message || "작가 등록 성공");
        setNewAuthor({  // 폼 초기화
          authorName: '',
          authorBirth: '',
          biography: '',
          majorWorks: '',
        });

        // 검색 모드로 전환
        setIsSearchMode(true);

        // 작가 리스트 갱신
        const updateAuthorList = await getAuthorList();
        setAuthorData(updateAuthorList);
      } else {
        alert(response.message || "작가 등록에 실패했습니다.");
      }
    } catch (error) {
      console.error("작가 등록 중 오류 발생:", error);
      alert("작가 등록 중 오류가 발생했습니다.");
    }
  };

  // 신규 출판사
  const onChangeNewPublisherSubmit = async (e) => {
    e.preventDefault();

    // 필수 입력 검증
    if (!newPublisher.publisherName.trim()) {
      alert("출판사명을 입력하세요.");
      return;
    }

    // 등록 여부 확인
    const isConfirmed = window.confirm("출판사를 등록하시겠습니까?");
    if (!isConfirmed) {
      return; // 취소를 선택한 경우
    }

    try {
      // 신규 출판사 등록 API 호출
      const response = await getCreatePublisher(newPublisher);

      if (response.status == 200) { // 등록 성공 (HTTP 상태 코드 200-299)
        alert(response.message || "출판사 등록 성공");

        // 폼 초기화
        setNewPublisher({
          publisherName: '',
          website: '',
        });

        // 검색 모드로 전환
        setIsSearchMode(true);

        // 출판사 리스트 갱신
        const updatePublisherList = await getPublisherList();
        setPublisherData(updatePublisherList);
      } else { // 등록 실패
        alert(response.message || "출판사 등록에 실패했습니다.");
      }
    } catch (error) {
      console.error("출판사 등록 중 오류 발생:", error.message || error);
      alert("출판사 등록 중 오류가 발생했습니다.");
    }
  };


  return (
    <Container className="my-4">
      <Card>
        <Card.Header as="h3" className="text-center">
          <FaPlusCircle className="me-2" />상품 등록</Card.Header>


        <Card.Body>
          <Form>
            {/* 이미지 업로드 */}
            <Row className="mb-3">
              <Col md={12}>
                <Form.Group controlId="formProductImage">
                <Form.Label className="fw-bold text-primary d-flex align-items-center"> <FaImage className="me-2" />상품 대표 이미지</Form.Label>                  {imgDisplay && (
                  <img src={imgDisplay} alt="상품 이미지" className="img-thumbnail rounded-3 p-2" /> )}
                  <Form.Control type="file" name="productImage" onChange={onChangeFileHandler} />
                </Form.Group>
              </Col>
            </Row>

            {/* 상품명, 장르 */}
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formProductName">
                <Form.Label className="fw-bold text-primary"><FaBook className="me-2" />도서명</Form.Label>
                <Form.Control
                    type="text"
                    name="productName"
                    value={serverData.productName}
                    onChange={onChangeHandler}
                    placeholder="상품명을 입력하세요."
                    className="border border-2 border-primary rounded-3 p-2"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formGenreId">
                  <Form.Label className="fw-bold text-primary"><FaTags className="me-2" />장르</Form.Label>
                  <Form.Select
                    name="genreId"
                    value={serverData.genreId}
                    onChange={onChangeHandler}
                    className="border border-2 border-primary rounded-3 p-2"
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

            {/* 작가 입력 */}
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formAuthorName">
                  <Form.Label className="fw-bold text-primary"><FaUserEdit className="me-2" />작가</Form.Label>
                  <Form.Control
                    type="text"
                    name="authorName"
                    value={serverData.author.authorName}
                    placeholder="작가명을 입력하세요."
                    className="border border-2 border-primary rounded-3 p-2"
                    onClick={handleOpenAuthorModal} // 클릭 시 모달 열기
                    readOnly // 직접 입력 방지 (검색을 통해 선택하도록)
                  />
                </Form.Group>
              </Col>

              {/* 출판사 입력 */}
              <Col md={6}>
                <Form.Group controlId="formPublisherName">
                  <Form.Label className="fw-bold text-primary"><FaBuilding className="me-2" />출판사</Form.Label>
                  <Form.Control
                    type="text"
                    name="publisherName"
                    value={serverData.publisher.publisherName}
                    className="border border-2 border-primary rounded-3 p-2"
                    placeholder="출판사를 입력하세요."
                    onClick={handleOpenPublisherModal} // 클릭 시 모달 열기
                    readOnly
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* 발행일, 가격, 재고, 페이지 수 */}
            <Row className="mb-3">
              <Col md={3} sm={6} xs={12}>
                <Form.Group controlId="formPublicationDate">
                  <Form.Label className="fw-bold text-primary"><FaCalendarAlt className="me-2" />발행일</Form.Label>
                  <Form.Control
                    type="date"
                    name="publicationDate"
                    value={serverData.publicationDate}
                    onChange={onChangeHandler}
                    className="border border-2 border-primary rounded-3 p-2"
                  />
                </Form.Group>
              </Col>
              <Col md={3} sm={6} xs={12}>
                <Form.Group controlId="formProductPrice">
                <Form.Label className="fw-bold text-primary">가격 (₩)</Form.Label>
                <div className="d-flex align-items-center">
                    <Form.Control
                      type="number"
                      name="productPrice"
                      value={serverData.productPrice}
                      onChange={onChangeHandler}
                      onFocus={handleNumericFocus}
                      onBlur={handleNumericBlur}
                      placeholder="가격을 입력하세요."
                      className="border border-2 border-primary rounded-3 p-2"
                      min="0"
                      step="1"
                    />
                  </div>
                </Form.Group>
              </Col>
              <Col md={3} sm={6} xs={12}>
                <Form.Group controlId="formStock">
                  <Form.Label className="fw-bold text-primary"><FaBox className="me-2" />재고</Form.Label>
                  <div className="d-flex align-items-center">
                    <Form.Control
                      type="number"
                      name="stock"
                      value={serverData.stock}
                      onChange={onChangeHandler}
                      onFocus={handleNumericFocus}
                      onBlur={handleNumericBlur}
                      placeholder="재고를 입력하세요."
                      className="border border-2 border-primary rounded-3 p-2"
                      min="0"
                      step="1"
                    />
                  </div>
                </Form.Group>
              </Col>
              <Col md={3} sm={6} xs={12}>
                <Form.Group controlId="formTotalPages">
                  <Form.Label className="fw-bold text-primary"><FaFileAlt className="me-2" />총 페이지 수</Form.Label>
                  <div className="d-flex align-items-center">
                    <Form.Control
                      type="number"
                      name="totalPages"
                      value={serverData.totalPages}
                      onChange={onChangeHandler}
                      onFocus={handleNumericFocus}
                      onBlur={handleNumericBlur}
                      placeholder="페이지 수를 입력하세요."
                      className="border border-2 border-primary rounded-3 p-2"
                      min="0"
                      step="1"
                    />
                  </div>
                </Form.Group>
              </Col>
            </Row>

            {/* 설명 */}
            <Row className="my-4">
              <Col md={12}>
                <Card className="p-3 shadow-sm">
                  <Card.Body>
                    <Form.Group controlId="formDescription">
                      <Form.Label className="fw-bold text-primary fs-5"><FaAlignLeft className="me-2" /> 도서 상세 설명</Form.Label>
                      <QuillEditor
                        type={"product"}
                        editorValue={editorValue}
                        setEditorValue={setEditorValue}
                        imgFlg={true}
                        imageUrls={imageUrls}
                        setImageUrls={setImageUrls}
                        className="border border-2 border-primary rounded-3 p-2"
                      />
                    </Form.Group>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* 등록 버튼 */}
            <Row className="mb-3">
              <Col md={12}>
                <Button variant="primary" onClick={onClickHandler}><FaCheck className="me-2" />상품 등록</Button>{' '}
                <Button variant="secondary" onClick={goToProductListPage}><FaTimes className="me-2" />상품 등록 취소</Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      {/* 작가 검색 모달 */}
      <Modal show={showAuthorModal} onHide={handleCloseAuthorModal} centered >
        <Modal.Header closeButton>
          <Modal.Title>{isSearchMode ? '작가 검색' : '신규 작가 등록'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isSearchMode ? (
            <>
              {/* 작가 검색 입력란 */}
              <div className="d-flex align-items-center block">
                <Form.Control
                  type="text"
                  placeholder="작가명을 검색하세요"
                  value={searchAuthor}
                  onChange={onChangeSearchAuthorHandler}
                  style={{ width: 'auto', flex: 1 }}
                />
              </div>
              <br />
              {/* 검색 작가 리스트 */}
              <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                <div className="modal-dialog-scrollable">
                  <Table hover>
                    <thead style={{ backgroundColor: '#f8f9fa' }}>
                      <tr>
                        <th>작가 이름</th>
                        <th>출생 연도</th>
                      </tr>
                    </thead>
                    <tbody>
                      {authorData.results?.authorList && authorData.results.authorList.length > 0 ? (
                        authorData.results.authorList
                          .filter((author) =>
                            !searchAuthor.trim() || author.authorName.includes(searchAuthor)
                          )
                          .map((author) => (
                            <tr key={author.authorId} className="cursor-pointer"
                              onClick={() => handleAuthorSelect(author)}
                            >
                              <td>{author.authorName}</td>
                              <td>{author.authorBirth}</td>
                            </tr>
                          ))
                      ) : (
                        <tr>
                          <td colSpan="2" className="text-center text-gray-500">
                            등록된 작가가 없습니다.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </div>
              </div>
            </>
          ) : (

            <>
              {/* 신규 작가 등록 폼 */}
              <Form>
                <Form.Group controlId="formAuthorName">
                  <Form.Label>작가명</Form.Label>
                  <Form.Control
                    type="text"
                    value={newAuthor.authorName}
                    onChange={(e) => setNewAuthor({ ...newAuthor, authorName: e.target.value })}
                    placeholder="작가명을 입력하세요"
                  />
                </Form.Group>
                <Form.Group controlId="formAuthorBirth">
                  <Form.Label>출생일</Form.Label>
                  <Form.Control
                    type="date"
                    value={newAuthor.authorBirth}
                    onChange={(e) => setNewAuthor({ ...newAuthor, authorBirth: e.target.value })}
                    placeholder="출생일을 입력하세요"
                  />
                </Form.Group>
                <Form.Group controlId="formAuthorBiography">
                  <Form.Label>자기소개</Form.Label>
                  <Form.Control
                    as="textarea"
                    value={newAuthor.biography}
                    onChange={(e) => setNewAuthor({ ...newAuthor, biography: e.target.value })}
                    placeholder="간단한 작가 소개를 입력하세요"
                  />
                </Form.Group>
                <Form.Group controlId="formAuthorMajorWorks">
                  <Form.Label>대표작</Form.Label>
                  <Form.Control
                    as="textarea"
                    value={newAuthor.majorWorks}
                    onChange={(e) => setNewAuthor({ ...newAuthor, majorWorks: e.target.value })}
                    placeholder="대표작을 입력하세요"

                  />
                </Form.Group>
                <div className="d-flex justify-content-end">
                  <Button variant="primary" onClick={onChangeNewAuthorSubmit}>
                    등록
                  </Button>
                </div>
              </Form>
            </>

          )}

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsSearchMode(!isSearchMode)}>
            {isSearchMode ? '신규 작가 등록' : '작가 검색'}
          </Button>

        </Modal.Footer>
      </Modal>


      {/* 출판사 검색 모달 */}
      <Modal show={showPublisherModal} onHide={handleClosePublisherModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{isSearchMode ? '출판사 검색' : '신규 출판사 등록'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isSearchMode ? (
            <>
              {/* 출판사 검색 입력란 */}
              <div className="d-flex align-items-center block">
                <Form.Control
                  type="text"
                  placeholder="출판사를 검색하세요"
                  value={searchPublisher}
                  onChange={onChangeSearchPublisherHandler} // 검색어 변경
                  style={{ width: 'auto', flex: 1 }}
                />
              </div>
              {/* 검색 출판사 리스트 */}
              <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                <div className="modal-dialog-scrollable">
                  <Table hover>
                    <thead style={{ backgroundColor: '#f8f9fa' }}>
                      <tr>
                        <th>출판사 이름</th>
                        <th>웹사이트</th>
                      </tr>
                    </thead>
                    <tbody>
                      {publisherData.results?.publisherList && publisherData.results.publisherList.length > 0 ? (
                        publisherData.results.publisherList
                          .filter((publisher) =>
                            !searchPublisher.trim() || publisher.publisherName.includes(searchPublisher)
                          )
                          .map((publisher) => (
                            <tr key={publisher.publisherId} className="cursor-pointer"
                              onClick={() => handlePublisherSelect(publisher)}
                            >
                              <td>{publisher.publisherName}</td>
                              <td>{publisher.website}</td>
                            </tr>
                          ))
                      ) : (
                        <tr>
                          <td colSpan="2" className="text-center text-gray-500">
                            등록된 출판사가 없습니다.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </div>
              </div>

            </>
          ) : (
            <>
              {/* 신규 출판사 등록 */}
              <Form>
                <Form.Group controlId="formPublisherName">
                  <Form.Label>출판사명</Form.Label>
                  <Form.Control
                    type="text"
                    value={newPublisher.publisherName}
                    onChange={(e) => setNewPublisher({ ...newPublisher, publisherName: e.target.value })}
                    placeholder="출판사명을 입력하세요"
                  />
                </Form.Group>
                <Form.Group controlId="formPublisherWebsite">
                  <Form.Label>웹사이트</Form.Label>
                  <Form.Control
                    type="text"
                    value={newPublisher.website}
                    onChange={(e) => setNewPublisher({ ...newPublisher, website: e.target.value })}
                    placeholder="웹사이트 URL을 입력하세요"
                  />
                </Form.Group>
                <div className="d-flex justify-content-end">
                  <Button variant="primary" onClick={onChangeNewPublisherSubmit}>
                    등록
                  </Button>
                </div>
              </Form>
            </>
          )}
        </Modal.Body>
        <ModalFooter>
          <Button variant="secondary" onClick={() => setIsSearchMode(!isSearchMode)}>
            {isSearchMode ? '신규 출판사사 등록' : '출판사 검색'}
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default AdminProductRegistComp;
