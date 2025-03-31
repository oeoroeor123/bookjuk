/**
 * 관리자 - 중고상품 목록 확인
 *
 * Developer : 김리예
 */

import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import AdminNavigate from '../../../hooks/AdminNavigate';
import { getSecondhandList, getSecondhandSalesChange, getSecondhandSearchList } from '../../../api/adminAPI';
import PageComp from '../../common/PageComp';
import '../../../css/admin/secondhand.css';
import { toast } from 'react-toastify';

const AdminSecondHandListComp = () => {
  // 페이지 이동 함수
  const { goToSecondHandListPage, goToSecondhandDetailPage } = AdminNavigate();

  // serverData
  const [serverData, setServerData] = useState({
    status: 0,
    message: '',
    results: {
      secondhandList: [],
      pageList: [],
      pageDto: {},
    },
  });

  const [search, setSearch] = useState('total');
  const [keyword, setKeyword] = useState('');

  const [queryParams] = useSearchParams();
  const page = !queryParams.get('page') ? 1 : parseInt(queryParams.get('page'));
  const size = !queryParams.get('size') ? 10 : parseInt(queryParams.get('size'));
  const sort = !queryParams.get('sort') ? 'secondhandId,desc' : queryParams.get('sort');

  useEffect(() => {
    getSecondhandList({ page, size, sort }).then((jsonData) => {
      setServerData(jsonData);
    });
  }, [page, size, sort]);

  useEffect(() => {
    getSecondhandSearchList({ page, size, sort, search, keyword }).then((jsonData) => {
      setServerData(jsonData);
    });
  }, [search, keyword]);

  const onChangeSearchHandler = (e) => {
    setSearch(e.target.value);
  };

  const onChangeKeywordHandler = async (e) => {
    setKeyword(e.target.value);
  };

  // 상태 변경 감지
  useEffect(() => {
    const currentSalesYn = serverData?.results?.secondhand?.salesYn;
  }, [serverData?.results?.secondhandList]);

  const onChangeHandler = async (event, secondhand) => {
    console.log(event?.target?.value);
    console.log(secondhand);
    const newSalesYn = event.target.value; // 선택된 값 (Y/N)

    secondhand.salesYn = event.target.value;

    // 1. 서버에 상태 변경 요청
    getSecondhandSalesChange(secondhand)
      .then((jsonData) => {
        toast.success(jsonData.message); // 성공 메시지 표시

        // 2. 클라이언트 상태 업데이트 (Optimistic UI)
        setServerData((prev) => ({
          ...prev,
          results: {
            ...prev.results,
            secondhandList: prev.results.secondhandList.map((item) => (item.secondhandId === secondhand?.secondhandId ? { ...item, salesYn: newSalesYn } : item)),
          },
        }));
      })
      .catch((error) => {
        toast.error(error.message); // 실패 시 에러 메시지
      });
  };

  return (
    <>
      {/* 검색창 */}
      <div class="row g-2 mt-3 mb-3input-search">
        <div class="col-md-4">
          <div class="form-floating">
            <select class="form-select" id="floatingSelectGrid" onChange={onChangeSearchHandler}>
              <option selected value="total">
                통합검색
              </option>
              <option value="secondhand">상품명</option>
              <option value="author">작가</option>
              <option value="genre">장르</option>
              <option value="user">판매자</option>
            </select>
            <label for="floatingSelectGrid">중고상품 검색</label>
          </div>
        </div>
        <div class="col-md-8">
          <div class="form-floating">
            <input type="text" class="form-control" id="floatingInputGrid" value={keyword} onChange={onChangeKeywordHandler} />
            <label for="floatingInputGrid">검색어를 입력하세요.</label>
          </div>
        </div>
      </div>
      {/* 중고 상품 목록 */}
      <table className="table list-table">
        {serverData?.results?.secondhandList?.length === 0 ? (
          <tr className="center">
            <td>조회된 상품이 없습니다.</td>
          </tr>
        ) : (
          <thead>
            <tr>
              <th nowrap="true">상품번호</th>
              <th nowrap="true">판매상품명</th>
              <th nowrap="true">장르</th>
              <th nowrap="true">작가</th>
              <th nowrap="true">판매상태</th>
              <th nowrap="true">판매자</th>
              <th nowrap="true">가격</th>
              <th nowrap="true">등록일</th>
            </tr>
          </thead>
        )}
        <tbody>
          {serverData?.results?.secondhandList?.map((secondhand) => (
            <tr key={secondhand?.secondhandId}>
              <td className="center">{secondhand?.secondhandId}</td>
              <td
                className="pointer"
                onClick={() => {
                  goToSecondhandDetailPage(secondhand?.secondhandId, queryParams);
                }}>
                {secondhand?.secondhandName}
              </td>
              <td className="center">{secondhand?.genre?.genreName}</td>
              <td className="center">{secondhand?.author?.authorName}</td>
              <td>
                <select
                  className="center"
                  onChange={() => {
                    onChangeHandler(window?.event, secondhand);
                  }}>
                  {secondhand?.salesYn === 'Y' ? (
                    <>
                      <option value="Y" selected="true">
                        판매중
                      </option>
                      <option value="N">판매중지</option>
                    </>
                  ) : (
                    <>
                      <option value="Y">판매중</option>
                      <option value="N" selected="true">
                        판매중지
                      </option>
                    </>
                  )}
                </select>
              </td>
              <td className="center">{secondhand?.user?.userName}</td>
              <td className="price">{secondhand?.secondhandPrice?.toLocaleString('ko-KR')}원</td>
              <td className="center">{secondhand?.createDt.replace('T', ' ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* 페이징버튼 */}
      {serverData?.results?.secondhandList?.length !== 0 ? <PageComp serverData={serverData} goToListPage={goToSecondHandListPage} size={size} sort={sort} /> : null}
    </>
  );
};

export default AdminSecondHandListComp;
