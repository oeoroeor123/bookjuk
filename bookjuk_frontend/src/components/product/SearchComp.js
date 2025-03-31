import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { getIdFromSessionStorage } from "../../common/settings";
import { useNavigate } from "react-router-dom";
import "../../css/search/search.css";
import { searchApi } from "../../api/baseApi";


const SearchComp = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [showBanner, setShowBanner] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [popularSearches, setPopularSearches] = useState([]);
  const [userId, setUserId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // userId 가져오기
  useEffect(() => {
    const userId = getIdFromSessionStorage();
    setUserId(userId); // userId 상태 업데이트
    console.log('유저 아이디', userId);
  }, []);

  // 최근 검색어 목록 API 호출
  const getRecentSearches = async (userId) => {
    if (!userId) return; // userId가 없으면 호출하지 않음
    try {
      const response = await searchApi.get(`/recent/${userId}`);
      const latestSearches = response.data.results.recentSearches || [];
      setRecentSearches(latestSearches.slice(0, 5));
    } catch (error) {
      console.error('최근 검색어를 불러오지 못했습니다.', error);
    }
  };

  // 인기 검색어 목록 API 호출
  const getPopularSearches = async () => {
    try {
      const response = await searchApi.get(`/popular`);
      const sortedPopularData = (response.data.results.popularSearches || [])
      .sort((a, b) => b.searchCount - a.searchCount)
      .slice(0, 5);
      setPopularSearches(sortedPopularData);
    } catch (error) {
      console.error('인기 검색어를 불러오지 못했습니다.', error);
    }
  };

  // 검색 실행 함수 (Enter 키 입력 시 호출)
  const handleSearchSubmit = async (e) => {

    if (e.key === 'Enter') {

      e.preventDefault();
  
      if (search.trim() === '') {
        alert("검색어를 입력하세요!");
        return;
      }

      // 검색어 추가 API 호출
      try {

        const params = {
          userId: userId || '',
          search: search.trim() || '',
        };

        // 최근 검색어 추가
        const response = await searchApi.post(`/addrecent`, params);
        console.log('요청 파라미터', params);
        console.log('api 응답', response);

        const data = response.data;
        const message = data.message;
        
        if (response.status === 200) {

          if(message === '최근 검색어 저장 성공') {

            // 최근 검색어 목록 업데이트 (비로그인 시 최근 검색어 업데이트 안함)
            if (userId) {
              getRecentSearches(userId);
            }

            // 검색 결과 업데이트
            setSearchQuery(data.results || {}); // 통합 검색 결과

            // 검색 결과 페이지로 이동
           navigate(`/search/results?query=${encodeURIComponent(search)}`);
           
          }
          
        } else {
          console.error('최근 검색어 저장 실패', message);
        }
      } catch (error) {
        console.error('서버 오류:', error);
        if (error.response) {
          console.error('Error Response:', error.response.data);
        }
      }
  
      // 검색 배너 숨기기
      setShowBanner(false);
    }
  };

  // 검색바 클릭 시 배너 노출 및 데이터 가져오기
  const handleSearchBarFocus = () => {
    setShowBanner(true);

    // userId가 존재할때만 데이터 가져오기
    if (userId) {
      getRecentSearches(userId);
    }
    // userId 존재 여부 상관 없이 데이터 가져오기
    getPopularSearches();
  };

  // userId가 존재할 경우, 최신 검색어는 유저에 따라 노출 / 인기 검색어는 상관 없이 노출
  useEffect(() => {
    if (userId) {
      getRecentSearches(userId);
      getPopularSearches();
    } else {
      getPopularSearches();
    }
  }, [userId]);

  
  // 검색어 클릭 시 해당 검색어 입력창에 반영
  const handleSearchItemClick = (searchText) => {
    setSearch(searchText);
    setTimeout(() => setShowBanner(false), 100); // 클릭 후 배너 닫기
  };


  return (
    <div className="search">
      <InputGroup>
        <InputGroup.Text style={{ cursor: 'pointer' }}>통합검색</InputGroup.Text>
        <Form.Control
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={handleSearchBarFocus}
          onBlur={() => setTimeout(() => setShowBanner(false), 150)} // Focus 해지 이벤트
          onKeyDown={handleSearchSubmit} // Enter 키 이벤트 추가
          placeholder="검색어를 입력하세요."
        />
        <InputGroup.Text>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
        </InputGroup.Text>
      </InputGroup>

      {/* 검색 배너 */}
      {showBanner && (
        <div className="banner show">
          <div className="search-block">
            <h4>최근 검색어</h4>
            <ul className="recentSearches">
              {recentSearches.length > 0 ? (
                recentSearches.map((recentData) => (
                  <li key={recentData?.search} onClick={() => recentData && handleSearchItemClick(recentData.search)}>
                    {recentData.search}
                    <span className="recentDate">{recentData.searchDt}</span>
                  </li>
                ))
              ) : (
                <li>최근 검색어가 없습니다.</li>
              )}
            </ul>
          </div>
          <div className="search-block">
            <h4>인기 검색어</h4>
            <ul className="popularSearches">
              {popularSearches.length > 0 ? (
                popularSearches.map((popularData, index) => (
                  <li key={popularData.search} onClick={() => handleSearchItemClick(popularData.search)}>
                    <span
                    className="rank"
                    style={{color: index === 0 ? '#FE2E2E' : index === 1 ? '#0040FF' : '#000'}}>
                    {index + 1}</span>
                    {popularData.search} (검색 횟수: {popularData.searchCount})
                  </li>
                ))
              ) : (
                <li>인기 검색어가 없습니다.</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchComp;
