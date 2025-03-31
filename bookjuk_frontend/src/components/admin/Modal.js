import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Col, ListGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { getAuthorList } from '../../api/adminProductAPI';
const AuthorSearchModal = ({ show, onHide, onAuthorSelect }) => {
  const [authors, setAuthors] = useState([]);       // 전체 작가 목록
  const [filteredAuthors, setFilteredAuthors] = useState([]); // 필터링된 작가 목록
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태

  // 작가 목록을 API에서 불러오는 함수
  const fetchAuthors = async () => {
    try {
      const data = await getAuthorList(); // getAuthorList() API 호출
      setAuthors(data);  // 전체 작가 목록 저장
      setFilteredAuthors(data); // 필터링된 작가 목록도 초기화
    } catch (error) {
      console.error("작가 목록을 불러오는 데 실패했습니다.", error);
    }
  };

  // 컴포넌트가 마운트될 때 작가 목록을 불러옴
  useEffect(() => {
    fetchAuthors();
  }, []);

  // 검색어 변경 시 필터링
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (!value.trim()) {
      setFilteredAuthors(authors); // 검색어가 비면 전체 작가 목록으로 초기화
    } else {
      const filtered = authors.filter(author =>
        author.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredAuthors(filtered); // 검색어에 맞는 작가 목록 필터링
    }
  };

  // 작가 선택 시 처리
  const handleAuthorSelect = (author) => {
    onAuthorSelect(author); // 부모 컴포넌트로 선택된 작가 전달
    onHide(); // 모달 닫기
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>작가 검색</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="작가명을 입력하세요."
          className="mb-3"
        />
        <ListGroup>
          {filteredAuthors.length > 0 ? (
            filteredAuthors.map((author) => (
              <ListGroup.Item
                key={author.id}
                onClick={() => handleAuthorSelect(author)}
                style={{ cursor: 'pointer' }}
              >
                {author.name}
              </ListGroup.Item>
            ))
          ) : (
            <ListGroup.Item>검색된 작가가 없습니다.</ListGroup.Item>
          )}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          닫기
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AuthorSearchModal;
