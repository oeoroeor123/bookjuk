/**
 * 관리자 - 탈퇴 회원 로그 조회
 *
 * Developer : 김리예
 */

import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { getUserDeleteLog, getDeleteLogSearchList } from '../../../api/adminAPI';
import PageComp from '../../common/PageComp';
import AdminNavigate from '../../../hooks/AdminNavigate';
import '../../../css/admin/log.css';

const DeleteLogComp = () => {
  // 페이지 이동 함수
  const { goToDeleteLogListPage } = AdminNavigate();

  // serverData
  const [serverData, setServerData] = useState({
    status: 0,
    message: '',
    results: {
      deleteLogList: [],
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
  const sort = !queryParams.get('sort') ? 'deleteDt,desc' : queryParams.get('sort');

  useEffect(() => {
    getUserDeleteLog({ page, size, sort }).then((jsonData) => {
      setServerData(jsonData);
    });
  }, [page, size, sort]);

  useEffect(() => {
    getDeleteLogSearchList({ page, size, sort, search, keyword, startDt, endDt }).then((jsonData) => {
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
      <div class="row g-2 mt-3 mb-3 input-search">
        <div class="col-md-4">
          <div class="form-floating">
            <select class="form-select" id="floatingSelectGrid" onChange={onChangeSearchHandler}>
              <option selected value="total">
                통합검색
              </option>
              <option value="name">이름</option>
              <option value="nickname">닉네임</option>
              <option value="email">이메일</option>
            </select>
            <label for="floatingSelectGrid">탈퇴 기록 검색</label>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-floating">
            <input type="text" class="form-control" id="floatingInputGrid" value={keyword} onChange={onChangeKeywordHandler} />
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
      {/* 탈퇴 로그 목록 */}
      <Table hover>
        {serverData?.results?.deleteLogList?.length === 0 ? (
          <caption>탈퇴 기록이 없습니다.</caption>
        ) : (
          <thead>
            <tr>
              <th nowrap="true">회원 번호</th>
              <th nowrap="true">회원 이름</th>
              <th nowrap="true">회원 닉네임</th>
              <th nowrap="true">회원 이메일</th>
              <th nowrap="true">탈퇴사유</th>
              <th nowrap="true">탈퇴일자</th>
            </tr>
          </thead>
        )}
        <tbody>
          {serverData?.results?.deleteLogList?.map((deleteLog) => (
            <tr>
              <td>{deleteLog?.userId}</td>
              <td>{deleteLog?.userName}</td>
              <td>{deleteLog?.userNickname}</td>
              <td>{deleteLog?.userEmail}</td>
              <td>{deleteLog?.withdrawalReason}</td>
              <td>{deleteLog?.deleteDt?.replace('T', ' ')}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {serverData?.results?.deleteLogList?.length !== 0 ? <PageComp serverData={serverData} goToListPage={goToDeleteLogListPage} size={size} sort={sort} /> : null}
    </>
  );
};

export default DeleteLogComp;
