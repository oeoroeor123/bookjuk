/**
 * 중고 거래 (마이페이지)
 * 
 * Developer : 김민희
 */

import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSecondHandSearchList } from '../../api/secondHandAPI';
import { getIdFromSessionStorage } from '../../common/settings';
import CustomNavigate from '../../hooks/CustomNavigate';
import PageComp from '../common/PageComp';

import Table from "react-bootstrap/Table";


const SecondhandMypageComp = ({ userId }) => {

  const { goToSecondhandDetailPage, goToSecondhandListPage } = CustomNavigate();

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

  useEffect(() => {    
    getSecondHandSearchList({ page, size, sort, search, keyword })
      .then(jsonData => {
        //console.log(jsonData);
        setServerData(jsonData);
      });      
  }, [page, size, sort, search, keyword]);


  return (
    <>
      <div>
        <Table hover>
          <thead>
            <tr style={{ cursor: 'pointer' }} >
              <th>상품 번호</th>
              <th>도서명</th>
              <th>가격</th>
              <th>출판사</th>
              <th>작가</th>
              <th>장르</th>
              <th>판매자</th>              
              <th>등록일</th>
            </tr>
          </thead>
          <tbody>
            {
              serverData.results.secondhandList.length === 0 ?
              <></> :
              serverData.results.secondhandList.map(secondhand => {
                // console.log(secondhand.user.userId);
                // console.log(userId);
                if(secondhand.user.userId == userId) {
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
      {/* <div>
        <PageComp serverData={serverData} goToListPage={goToSecondhandListPage} size={size} sort={sort}/>
      </div> */}
    </>
  );
};

export default SecondhandMypageComp;