/**
 * 관리자 - 상품 목록 확인
 *
 * Developer : 김성율
 */

import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProductSalesChange } from '../../../api/adminAPI';
import { getProductList, getProductSearchList } from '../../../api/adminProductAPI';
import PageComp from '../../common/PageComp';
import { Button, Table } from 'react-bootstrap';
import { toast } from 'react-toastify';
import AdminProductNavigate from '../../../hooks/AdminProductNavigate';
import '../../../css/admin/product.css';

const AdminProductListComp = () => {
  const { goToProductDetailPage, goToProductRegistPage, goToProductListPage } = AdminProductNavigate();

  const [serverData, setServerData] = useState({
    status: 0,
    message: '',
    results: {
      productList: [],
      pageList: [],
      pageDto: {},
    },
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const [queryParams] = useSearchParams();

  const page = queryParams.get('page') ? parseInt(queryParams.get('page')) : 1;
  const size = queryParams.get('size') ? parseInt(queryParams.get('size')) : 10;
  const [sort, setSort] = useState(queryParams.get('sort') || 'productId,desc');
  const [search, setSearch] = useState('total');
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    getProductList({ page, size, sort }).then(setServerData);
  }, [page, size, sort]);

  useEffect(() => {
    getProductSearchList({ page, size, sort, search, keyword }).then(setServerData);
  }, [search, keyword]);

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
    return sort.startsWith(key) ? (sort.endsWith('asc') ? '⬆' : '⬇') : '';
  };

  // 판매여부 변경
  const onChangeHandler = async (event, product) => {
    console.log(event?.target?.value);
    console.log(product);
    const newSalesYn = event.target.value; // 선택된 값 (Y/N)

    product.salesYn = event.target.value;

    // 1. 서버에 상태 변경 요청
    getProductSalesChange(product)
      .then((jsonData) => {
        toast.success(jsonData.message); // 성공 메시지 표시

        // 2. 클라이언트 상태 업데이트 (Optimistic UI)
        setServerData((prev) => ({
          ...prev,
          results: {
            ...prev.results,
            productList: prev.results.productList.map((item) => (item.productId === product?.productId ? { ...item, salesYn: newSalesYn } : item)),
          },
        }));
      })
      .catch((error) => {
        toast.error(error.message); // 실패 시 에러 메시지
      });
  };

  return (
    <>
      <div className="row g-2 mt-3" style={{ marginBottom: '20px' }}>
        <div className="col-md-2 col-12">
          <div className="form-floating">
            <select className="form-select" value={sort} onChange={onChangeSortHandler}>
              <option value="productId,desc">최신순</option>
              <option value="productId,asc">과거순</option>
              <option value="productPrice,asc">가격 낮은 순</option>
              <option value="productPrice,desc">가격 높은 순</option>
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

      <Table hover className="product-table">
        <thead>
          <tr>
            <th onClick={() => handleSortClick('productId')} style={{ cursor: 'pointer' }}>
              상품번호 {getArrow('productId')}
            </th>
            <th onClick={() => handleSortClick('productName')} style={{ cursor: 'pointer' }}>
              판매상품명 {getArrow('productName')}
            </th>
            <th onClick={() => handleSortClick('genre')} style={{ cursor: 'pointer' }}>
              장르 {getArrow('genre')}
            </th>
            <th onClick={() => handleSortClick('author')} style={{ cursor: 'pointer' }}>
              작가 {getArrow('author')}
            </th>
            <th onClick={() => handleSortClick('publisher')} style={{ cursor: 'pointer' }}>
              출판사 {getArrow('publisher')}
            </th>
            <th onClick={() => handleSortClick('productPrice')} style={{ cursor: 'pointer' }}>
              가격 {getArrow('productPrice')}
            </th>
            <th onClick={() => handleSortClick('createDt')} style={{ cursor: 'pointer' }}>
              등록일 {getArrow('createDt')}
            </th>
            <th>판매상태</th>
          </tr>
        </thead>
        <tbody>
          {serverData?.results?.productList?.map((product) => (
            <tr key={product?.productId} onClick={() => goToProductDetailPage(product?.productId, queryParams)} style={{ cursor: 'pointer' }}>
              <td className="center">{product?.productId}</td>
              <td>{product?.productName}</td>
              <td className="center">{product?.genre?.genreName}</td>
              <td className="center">{product?.author?.authorName}</td>
              <td className="center">{product?.publisher?.publisherName}</td>
              <td className="price">{product?.productPrice?.toLocaleString('ko-KR')}원</td>
              <td className="center">{product?.createDt.replace('T', ' ')}</td>
              <td>
                <select
                  className="center"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                  onChange={() => {
                    onChangeHandler(window?.event, product);
                  }}>
                  {product?.salesYn === 'Y' ? (
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
            </tr>
          ))}
        </tbody>
      </Table>
      {/* 등록 버튼 */}
      <div>
        <Button onClick={goToProductRegistPage}>새 상품 등록</Button>
      </div>
      {/* 페이징 버튼 */}
      {serverData?.results?.productList?.length !== 0 && <PageComp serverData={serverData} goToListPage={goToProductListPage} size={size} sort={sort} />}
    </>
  );
};

export default AdminProductListComp;
