/**
 * 중고 상품 목록
 *
 * Developer : 김민희
 */

import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getSecondHandList, getSecondHandSearchList } from '../../api/secondHandAPI';
import CustomNavigate from "../../hooks/CustomNavigate";
import PageComp from "../common/PageComp";
import { alert, confirm, getIdFromSessionStorage, isLogin } from '../../common/settings';

import { Button } from 'react-bootstrap';
import Table from "react-bootstrap/Table";
import { FcList } from "react-icons/fc";

const SecondHandComp = () => { 

  // 페이지 이동 함수
  const { goToSecondhandDetailPage, goToSecondhandListPage } = CustomNavigate();

  // serverData 객체 선언
  const [serverData, setServerData] = useState({
    status: 0,
    message: '',
    results: {
      secondhandList: [],
      pageList: [],
      pageDto: {},
    }
  })

  const [searchParams, setSearchParams] = useSearchParams();
  const [queryParams] = useSearchParams();
  const page = queryParams.get('page') ? parseInt(queryParams.get('page')) : 1;
  const size = queryParams.get('size') ? parseInt(queryParams.get('size')) : 10;
  const [sort, setSort] = useState(queryParams.get('sort') || 'secondhandId,desc');
  const [search, setSearch] = useState('total');
  const [keyword, setKeyword] = useState('');

  // /* 사용안함 */
  // useEffect(() => {
  //   getSecondHandList({ page, size, sort })
  //     .then(jsonData => {
  //       console.log(jsonData);
  //       setServerData(jsonData);
  //     });
  // }, [page, size, sort]);

  useEffect(() => {
    getSecondHandSearchList({ page, size, sort, search, keyword })
      .then(jsonData => {
        //console.log(jsonData);
        setServerData(jsonData);
      });      
  }, [page, size, sort, search, keyword]);

  const navigate = useNavigate();
  const onClickHandler = () => {
    if(getIdFromSessionStorage() != null) {
      navigate('/secondhand/regist');
    } else {
      alert("로그인이 필요합니다.");
      navigate('/user/login');
    }
  };

  const onChangeSortHandler = (e) => {
    setSort(e.target.value);
    setSearchParams({ page: 1, size, sort: e.target.value });
  };

  const onChangeSearchHandler = (e) => {
    setSearch(e.target.value);
  };

  const onChangeKeywordHandler = (e) => {
    setKeyword(e.target.value);
  };

  const handleSortClick = (key) => {
    const [currentKey, direction] = sort.split(',');
    const newDirection = currentKey === key && direction === 'asc' ? 'desc' : 'asc';
    const newSort = `${key},${newDirection}`;
    setSort(newSort);
    setSearchParams({ page: 1, size, sort: newSort });
  };

  const getArrow = (key) => {
    if (!sort.startsWith(key)) return '⬍';
    return sort.endsWith('asc') ? '⬆' : '⬇';
  };


  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FcList style={{ marginRight: '10px', fontSize: '2rem' }} />
          <div><h2>중고상품 목록</h2></div>
        </div>
        <div>
        <Button onClick={onClickHandler}>중고 상품 등록</Button>
        </div>
      </div>
      <div className="row g-2 mt-3" style={{ marginBottom: '20px' }}>
        <div className="col-md-2 col-12">
          <div className="form-floating">
            <select className="form-select" value={sort} onChange={onChangeSortHandler}>
              <option value="secondhandId,desc">최신순</option>
              <option value="secondhandId,asc">과거순</option>
              <option value="secondhandPrice,asc">가격 낮은 순</option>
              <option value="secondhandPrice,desc">가격 높은 순</option>
            </select>
            <label>정렬 기준</label>
          </div>
        </div>
        <div className="col-md-2 col-12">
          <div className="form-floating">
            <select className="form-select" onChange={onChangeSearchHandler}>
              <option value="total">통합검색</option>
              <option value="product">상품명</option>
              <option value="genre">장르</option>
              <option value="author">작가</option>
              <option value="publisher">출판사</option>
            </select>
            <label>검색 기준</label>
          </div>
        </div>
        <div className="col-md-8 col-12">
          <div className="form-floating">
            <input type="text" className="form-control" value={keyword} onChange={onChangeKeywordHandler} />
            <label>검색어 입력</label>
          </div>
        </div>
      </div>
      <div>
        <Table hover>
          <thead>
            <tr style={{ cursor: 'pointer' }} >
              <th onClick={() => handleSortClick('secondhandId')} >
                상품 번호 {getArrow('secondhandId')}
              </th>
              <th onClick={() => handleSortClick('secondhandName')} >
                도서명 {getArrow('secondhandName')}
              </th>
              <th onClick={() => handleSortClick('secondhandPrice')} >
                가격 {getArrow('secondhandPrice')}
              </th>
              <th onClick={() => handleSortClick('publisher')} >
                출판사 {getArrow('publisher')}
              </th>
              <th onClick={() => handleSortClick('author')} >
                작가 {getArrow('author')}
              </th>
              <th onClick={() => handleSortClick('genre')} >
                장르 {getArrow('genre')}
              </th>
              <th onClick={() => handleSortClick('user')} >
                판매자 {getArrow('user')}
              </th>              
              <th onClick={() => handleSortClick('createDt')} >
                등록일 {getArrow('createDt')}
              </th>
            </tr>
          </thead>
          <tbody>
            {
              serverData.results.secondhandList.length === 0 ?
              <></> :
              serverData.results.secondhandList.map(secondhand => {
                if(secondhand.salesYn === "Y") {
                  return (
                    <tr key={secondhand.secondhandId} style={{ cursor: 'pointer' }}
                      onClick={() => { goToSecondhandDetailPage(secondhand.secondhandId) }}                       
                    >
                      <td style={{ textAlign: 'center' }}>{secondhand?.secondhandId}</td>
                      <td style={{ textAlign: 'center' }}>{secondhand?.secondhandName}</td>
                      <td style={{ textAlign: 'center' }}>{secondhand?.secondhandPrice}</td>
                      <td style={{ textAlign: 'center' }}>{secondhand?.publisher?.publisherName}</td>
                      <td style={{ textAlign: 'center' }}>{secondhand?.author?.authorName}</td>
                      <td style={{ textAlign: 'center' }}>{secondhand?.genre?.genreName}</td>
                      <td style={{ textAlign: 'center' }}>{secondhand?.user?.userNickname}</td>
                      <td style={{ textAlign: 'center' }}>{secondhand?.createDt.replace('T', ' ')}</td>
                    </tr>
                  );
                }
                return null;
              })
            }
          </tbody>
          <tfoot>
          </tfoot>
        </Table>
      </div>
      <div>
        <PageComp serverData={serverData} goToListPage={goToSecondhandListPage} size={size} sort={sort}/>
      </div>
    </>
  );
};

export default SecondHandComp;