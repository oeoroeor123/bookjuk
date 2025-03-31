/**
 * 관리자 - 로그인 회원 로그 조회
 *
 * Developer : 김리예
 */

import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { getUserLoginLog, getLoginLogSearchList } from '../../../api/adminAPI';
import PageComp from '../../common/PageComp';
import AdminNavigate from '../../../hooks/AdminNavigate';
import '../../../css/admin/log.css';

const LoginLogComp = () => {
  // 페이지 이동 함수
  const { goToLoginLogListPage } = AdminNavigate();

  // serverData
  const [serverData, setServerData] = useState({
    status: 0,
    message: '',
    results: {
      loginLogList: [],
      pageList: [],
      pageDto: {},
    },
  });

  const [search, setSearch] = useState('total');
  const [keyword, setKeyword] = useState('');
  const [startDt, setStartDt] = useState('');
  const [endDt, setEndDt] = useState('');

  const [queryParams] = useSearchParams();
  const page = !queryParams.get('page') ? 1 : parseInt(queryParams.get('page'));
  const size = !queryParams.get('size') ? 10 : parseInt(queryParams.get('size'));
  const sort = !queryParams.get('sort') ? 'loginDt,desc' : queryParams.get('sort');

  useEffect(() => {
    getUserLoginLog({ page, size, sort }).then((jsonData) => {
      setServerData(jsonData);
    });
  }, [page, size, sort]);

  useEffect(() => {
    getLoginLogSearchList({ page, size, sort, search, keyword, startDt, endDt }).then((jsonData) => {
      setServerData(jsonData);
    });
  }, [search, keyword]);

  const onChangeSearchHandler = (e) => {
    setSearch(e.target.value);
  };

  const onChangeKeywordHandler = async (e) => {
    setKeyword(e.target.value);
  };

  const onChangeStartDtHandler = async (e) => {
    setStartDt(e.target.value);
  };

  const onChangeEndDtHandler = async (e) => {
    setEndDt(e.target.value);
  };

  return (
    <>
      {/* 검색창 */}
      <div className="row g-2 mt-3 mb-3 input-search">
        <div className="col-md-4">
          <div className="form-floating">
            <select className="form-select" id="floatingSelectGrid" onChange={onChangeSearchHandler}>
              <option selected value="total">
                통합검색
              </option>
              <option value="name">이름</option>
              <option value="nickname">닉네임</option>
              <option value="email">이메일</option>
            </select>
            <label for="floatingSelectGrid">로그인 기록 검색</label>
          </div>
        </div>
        <div className="col-md-4">
          <div className="form-floating">
            <input type="text" className="form-control" id="floatingInputGrid" value={keyword} onChange={onChangeKeywordHandler} />
            <label for="floatingInputGrid">검색어를 입력하세요.</label>
          </div>
        </div>
        <div className="col-md-4">
          <div className="input-group">
            <div className="form-floating">
              <input type="date" className="form-control" id="floatingInputStartDate" name="startDt" value={startDt} onChange={onChangeStartDtHandler} />
              <label for="floatingInputStartDate">시작일</label>
            </div>
            &nbsp;-&nbsp;
            <div className="form-floating">
              <input type="date" className="form-control" id="floatingInputEndDate" name="endDt" value={endDt} onChange={onChangeEndDtHandler} />
              <label for="floatingInputEndDate">종료일</label>
            </div>
          </div>
        </div>
      </div>
      {/* 로그인 로그 목록 */}
      <Table hover>
        {serverData?.results?.loginLogList?.length === 0 ? (
          <caption>로그인 기록이 없습니다.</caption>
        ) : (
          <thead>
            <tr>
              <th nowrap="true">회원 번호</th>
              <th nowrap="true">이름</th>
              <th nowrap="true">닉네임</th>
              <th nowrap="true">이메일</th>
              <th nowrap="true">접속 브라우저</th>
              <th nowrap="true">접속 아이피</th>
              <th nowrap="true">로그인 일자</th>
            </tr>
          </thead>
        )}
        <tbody>
          {serverData?.results?.loginLogList?.map((loginLog) => (
            <tr>
              <td>{loginLog?.user?.userId}</td>
              <td>{loginLog?.user?.userName}</td>
              <td>{loginLog?.user?.userNickname}</td>
              <td>{loginLog?.user?.userEmail}</td>
              <td className="browser">{loginLog?.loginBrowser}</td>
              <td className="ip">{loginLog?.ipAddr}</td>
              <td>{loginLog?.loginDt?.replace('T', ' ')}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {serverData?.results?.loginLogList?.length !== 0 ? <PageComp serverData={serverData} goToListPage={goToLoginLogListPage} size={size} sort={sort} /> : null}
    </>
  );
};

export default LoginLogComp;
