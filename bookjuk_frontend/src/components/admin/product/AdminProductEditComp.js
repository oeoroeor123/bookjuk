/**
 * 관리자 - 상품 수정
 *
 * Developer : 김성율
 */

import { useEffect, useState } from 'react';
import { getGenreList,
         getProductDetail,
         getProductEdit,
         getAuthorSearchList,
         getPublisherSearchList,
         getAuthorList,
         getPublisherList,
         getCreateAuthor,
         getCreatePublisher,
        } from '../../../api/adminProductAPI';
import { useParams, useSearchParams } from 'react-router-dom';
import { Container, Card, Form, Row, Col, Button, Modal, ModalFooter, Table } from 'react-bootstrap';
import { alert, confirm } from '../../../common/settings';
import AdminProductNavigate from '../../../hooks/AdminProductNavigate';
import { FaAlignLeft, FaBook, FaBox, FaBuilding, FaCalendarAlt, FaCheck, FaEdit, FaFileAlt, FaImage, FaTags, FaTimes, FaUserEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';
import QuillEditor from '../../secondhand/QuillEditor';


const AdminProductEditComp = () => {

  // 경로 변수(productId) 받기
  const { productId } = useParams();
  const [queryParams] = useSearchParams();

  const [imageUrls, setImageUrls] = useState([]); // 서버에서 받은 이미지 URL을 저장하는 배열
  const [editorValue, setEditorValue] = useState("");

  const { goToProductDetailPage } = AdminProductNavigate();

  const [imgFile, setImgFile] = useState(null);
  const [imgDisplay, setImgDisplay] = useState(null);
  const [imgShow, setImgShow] = useState(true);  // 이미지 표시 여부 상태

  // 상품 정보 상태 관리
  const [serverData, setServerData] = useState({
    status: 0,
    message: '',
    results: {
      product: {
        productId: 0,
        productImage: '',
        productName: '',
        description: '',
        productPrice: 0,
        stock: 0,
        createDt: '',
        publicationDate: '',
        totalPages: 0,
        genre: {
          genreId: 0,
          genreName: ''
        },
        author: {
          authorId: 0,
          authorName: ''
        },
        publisher: {
          publisherId: 0,
          publisherName: '',
          website: '',
        },
      }
    }
  });

  // 장르 목록 상태
  const [genreData, setGenreData] = useState({
    status: 0,
    message: '',
    results: {
      genreList: [],
    },
  });

  // 작가 목록 상태
  const [authorData, setAuthorData] = useState({
    status: 0,
    message: '',
    results: {
      authorList: [],
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

  useEffect(() => {
    getProductDetail(productId)
      .then((jsonData) => {
        console.log("📌 상품 상세 데이터 응답:", jsonData); // API 응답 데이터 확인
        setServerData(jsonData);
      })
  }, [productId]);

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



    const onChangeHandler = (e) => {
      const { name, value } = e.target;

      setServerData((prevData) => {
        const product = { ...prevData.results.product };

        if (name === 'genreId') {
          product.genre = {
            ...product.genre,
            [name]: value,
          };
        } else if (name === 'publisherName') {
          product.publisher = {
            ...product.publisher,
            [name]: value,
          };
        } else if (name === 'authorName') {
          product.author = {
            ...product.author,
            [name]: value,
          };
        } else {
          product[name] = value;
        }

        return {
          ...prevData,
          results: {
            ...prevData.results,
            product,
          },
        };
      });
    };


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
    results: {
      ...serverData.results,
      product: {
        ...serverData.results.product,
        author: {
          ...serverData.results.product.author,
          authorName: author.authorName,  // 선택된 작가 이름
        },
      },
    },
  });

  // 모달 닫기
  handleCloseAuthorModal();
};


  // 출판사 선택 함수
  const handlePublisherSelect = (publisher) => {
    setServerData({
      ...serverData,
      results: {
        ...serverData.results,
        product: {
          ...serverData.results.product,
          publisher: {
            ...serverData.results.product.publisher,
            publisherName: publisher.publisherName,  // 선택된 출판사 이름
          },
        },
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



  const onClickModify = async () => {
    confirm('상품을 수정하시겠습니까?', async ()=>{
      setServerData({
        ...serverData,
        results: {
          ...serverData.results,
          product: {
            ...serverData.results.product,
            productId: productId
          }
        }

      });

    serverData.results.product.description = editorValue; // 에디터 내용 저장
    console.log("수정된 상품 데이터:", JSON.stringify(serverData));

    const productData = new FormData();
    productData.append("base64Image", imgFile);
    productData.append("product", JSON.stringify(serverData?.results?.product));
    productData.append("imageUrls", JSON.stringify(imageUrls));

    getProductEdit(productData).then((jsonData) => {
      console.log(jsonData?.message);
      setServerData(jsonData);
      toast(jsonData?.message);
      goToProductDetailPage(jsonData?.results?.product?.productId);
    }).catch((error) => {
      console.log();
      toast(error?.message);
    });

 }, ()=>{});
}


  return (
    <Container className="my-4">
      <Card>
        <Card.Header as="h3" className="text-center bg-gradient-primary">
          <FaEdit /> 상품 수정
        </Card.Header>
        <Card.Body>
          <Form>
            <Row className="mb-3 align-items-center">
              <Col md={3}>
                <Form.Group controlId="formProductId">
                  <Form.Label className="fw-bold text-primary">상품 번호</Form.Label>
                  <Form.Control
                    type="text"
                    name="productId"
                    value={serverData.results.product.productId}
                    disabled
                    className="text-center border-0 bg-light fw-semibold"
                  />
                </Form.Group>
              </Col>
              {/* 등록일 */}
              <Col md={9}>
                <Form.Group controlId="formCreateDt">
                  <Form.Label className="fw-bold text-primary">등록일</Form.Label>
                  <Form.Control
                    type="text"
                    name="createDt"
                    value={serverData.results.product.createDt.replace('T', ' ')}
                    disabled
                    className="border-0 bg-light text-center fw-semibold"
                  />
                </Form.Group>
              </Col>
            </Row>

            
{/* 이미지 업로드 */}
<Row className="mb-3">
  <Col md={12}>
    <Form.Group controlId="formProductImage">
      <Form.Label className="fw-bold text-primary d-flex align-items-center">
        <FaImage className="me-2" />상품 대표 이미지
      </Form.Label>
      {/* 기존 이미지 표시 */}
      {serverData.results.product.productImage && (
        <div className="mb-2">
          <p className="text-muted small">현재 이미지</p>
          <img 
            src={serverData.results.product.productImage} 
            alt="현재 상품 이미지" 
            className="img-fluid img-thumbnail rounded-3 p-2" 
            style={{maxHeight: "200px"}}
          />
        </div>
      )}
      {/* 새 이미지 업로드 */}
      <Form.Control 
        type="file" 
        name="productImage" 
        onChange={onChangeFileHandler} 
      />
      {/* 새로 선택한 이미지 미리보기 */}
      {imgDisplay && (
        <div className="mt-2">
          <p className="text-muted small">새 이미지 미리보기</p>
          <img 
            src={imgDisplay} 
            alt="새 상품 이미지 미리보기" 
            className="img-fluid img-thumbnail rounded-3 p-2" 
            style={{maxHeight: "200px"}}
          />
        </div>
      )}
    </Form.Group>
  </Col>
</Row>

            {/* 상품명 & 장르 */}
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formProductName">
                  <Form.Label className="fw-bold text-primary"><FaBook className="me-2" />도서명</Form.Label>
                  <Form.Control
                    type="text"
                    name="productName"
                    value={serverData.results.product.productName}
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
                    value={serverData.results.product.genre.genreId}
                    onChange={onChangeHandler}
                    className="border border-2 border-primary rounded-3 p-2"
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

            {/* 작가 & 출판사 */}
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formAuthorName">
                  <Form.Label className="fw-bold text-primary"><FaUserEdit className="me-2" />작가</Form.Label>
                  <Form.Control
                    type="text"
                    name="authorName"
                    value={serverData.results.product.author.authorName}
                    onChange={onChangeHandler}
                    onClick={handleOpenAuthorModal} // 클릭 시 모달 열기
                    readOnly // 직접 입력 방지 (검색을 통해 선택하도록)
                    placeholder="작가명을 입력하세요."
                    className="border border-2 border-primary rounded-3 p-2"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formPublisherName">
                  <Form.Label className="fw-bold text-primary"><FaBuilding className="me-2" />출판사</Form.Label>
                  <Form.Control
                    type="text"
                    name="publisherName"
                    value={serverData.results.product.publisher.publisherName}
                    onChange={onChangeHandler}
                    onClick={handleOpenPublisherModal} // 클릭 시 모달 열기
                    readOnly
                    placeholder="출판사를 입력하세요."
                    className="border border-2 border-primary rounded-3 p-2" />
                </Form.Group>
              </Col>
            </Row>

            {/* 발행일, 가격, 재고, 총 페이지 */}
            <Row className="mb-3">
              <Col md={3}>
                <Form.Group controlId="formPublicationDate">
                  <Form.Label className="fw-bold text-primary"><FaCalendarAlt className="me-2" />발행일</Form.Label>
                  <Form.Control
                    type="date"
                    name="publicationDate"
                    value={serverData.results.product.publicationDate}
                    onChange={onChangeHandler}
                    className="border border-2 border-primary rounded-3 p-2" />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="formProductPrice">
                  <Form.Label className="fw-bold text-primary">가격 (₩)</Form.Label>
                  <Form.Control
                    type="number"
                    name="productPrice"
                    value={serverData.results.product.productPrice}
                    onChange={onChangeHandler}
                    placeholder="가격"
                    className="border border-2 border-primary rounded-3 p-2" />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="formStock">
                  <Form.Label className="fw-bold text-primary"><FaBox className="me-2" />재고</Form.Label>
                  <Form.Control
                    type="number"
                    name="stock"
                    value={serverData.results.product.stock}
                    onChange={onChangeHandler}
                    placeholder="재고"
                    className="border border-2 border-primary rounded-3 p-2" />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="formTotalPages">
                  <Form.Label className="fw-bold text-primary"><FaFileAlt className="me-2" />총 페이지 수</Form.Label>
                  <Form.Control
                    type="number"
                    name="totalPages"
                    value={serverData.results.product.totalPages}
                    onChange={onChangeHandler}
                    placeholder="총 페이지"
                    className="border border-2 border-primary rounded-3 p-2" />
                </Form.Group>
              </Col>
            </Row>

            {/* 도서 상세 설명 (별도 카드 스타일) */}
            <Row className="my-4">
              <Col md={12}>
                <Card className="p-3 shadow-sm">
                  <Card.Body>
                    <Form.Group controlId="formDescription">
                      <Form.Label className="fw-bold text-primary fs-5"><FaAlignLeft className="me-2" />도서 상세 설명</Form.Label>
                      <QuillEditor
                        description={serverData.results.product.description}
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

            <br />


            {/* 수정 완료, 수정 취소 버튼 */}
            <Row className="mb-3">
              <Col>
                <Button variant="primary" onClick={onClickModify}><FaCheck className="me-2" />수정 완료</Button>{' '}
                <Button variant="secondary" onClick={() => { goToProductDetailPage(productId, queryParams) }}><FaTimes className="me-2" />수정 취소</Button>
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
            {isSearchMode ? '신규 출판사 등록' : '출판사 검색'}
          </Button>
        </ModalFooter>
      </Modal>

    </Container>
  );

};

export default AdminProductEditComp;
