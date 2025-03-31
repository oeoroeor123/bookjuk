import { useState, useEffect, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PageComp from '../common/PageComp';
import CustomNavigate from '../../hooks/CustomNavigate';
import OrderNavigate from '../../hooks/OrderNavigate';
import { getIdFromSessionStorage } from '../../common/settings';
import { UserContext } from '../common/UserContext';
import { alert, confirm } from '../../common/settings';
import CartNavigate from '../../hooks/CartNavigate';
import ProductNavigate from '../../hooks/ProductNavigate';
import '../../css/product/product.css';
import { cartApi, productApi, userApi } from '../../api/baseApi';
import QuillViewer from '../secondhand/QuillViewer';

const ProductNewComp = () => {

  // 장바구니 count 변경할 변수
  const { cartItemCount, setCartItemCount } = useContext(UserContext);

  // userId 받아와서 장바구니, 좋아요 구현
  const userId = getIdFromSessionStorage();

  // 바로구매 버튼 구현
  const { goToOrderUserPage } = OrderNavigate();

  // 장바구니 아이템 초기값
  const [cartItems, setCartItems] = useState();

  // 넘길 장바구니 아이템
  const [selectedItems, setSelectedItems] = useState(new Set());

  // 좋아요 버튼 구현
  const [likeProducts, setLikeProducts] = useState({});

  // 찜 목록 상태
  const [likeList, setLikeList] = useState([]);

  // 이동을 위한 useNavigate 선언
  const navigate = useNavigate();

  // 쿼리 파라미터 관리 (최상위에서 호출해서 사용)
  const [queryParams, setQueryParams] = useSearchParams();

  const page = parseInt(queryParams.get('page')) || 1;
  const size = parseInt(queryParams.get('size')) || 5;
  // 발매일 최신순으로 리스트 정렬
  const sort = queryParams.get('sort') || 'publicationDate,desc';

  // Product 리스트 (페이징 처리)
  const goToListPage = (pageNumber) => {
    if (pageNumber) {
      const newQueryParams = new URLSearchParams(queryParams);

      // 쿼리 파라미터 업데이트
      newQueryParams.set('page', pageNumber.page);
      newQueryParams.set('size', pageNumber.size.toString());
      newQueryParams.set('sort', pageNumber.sort);

      console.log('페이지:', pageNumber);
      console.log('수정된 URL 파라미터:', newQueryParams.toString());

      // navigate 호출 시 쿼리 파라미터 반영하여 페이지 이동
      navigate({
        pathname: `/product`,
        search: `?${newQueryParams.toString()}`,
      });
      window.scrollTo(0, 0);
    }
  };

  // 서버 데이터 상태 관리
  const [serverData, setServerData] = useState({
    status: 0,
    message: '',
    results: {
      productList: [], // 초기값을 빈 배열로 설정
      pageList: [],
      pageDto: {},
    },
  });

  // 신규 상품 목록 API 호출 함수
  const GetProductList = async () => {
    try {
      const params = {
        page: page,
        size: size,
        sort: sort,
        startDate: startDate || null,
        endDate: endDate || null,
        genreId: genreId || null,
      };
      // console.log("요청 파라미터", params);

      const response = await productApi.get(`/new`, { params });
      // console.log("서버 응답 데이터 ", response.data);

      // 서버 응답 데이터 파싱
      setServerData({
        status: response.data.status,
        message: response.data.message,
        results: {
          productList: response.data.results.productList || [],
          pageList: response.data.results.pageList || [],
          pageDto: response.data.results.pageDto || {},
        },
      });

      // 찜 목록 업데이트
      getProductLikeList();
    } catch (error) {
      console.error('상품을 불러오지 못했습니다.', error);
    }
  };

  //  찜 목록 업데이트
  const getProductLikeList = async () => {
    if (!userId) return;

    try {
      const response = await userApi.get(`/wish/${userId}`);
      console.log('서버 응답:', response);
      console.log('서버 응답:', response.data);
      setLikeList(response.data?.results?.productDto || []);

    } catch (error) {
      console.error('찜 목록을 불러오지 못했습니다.', error);
    }
  };

  // 필터링을 위한 각 요소에 초기값 부여
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [genreId, setGenreId] = useState(null);
  const [genres, setGenres] = useState([]);

  // 각 요소 변할 시 리렌더링 (필터링 처리)
  useEffect(() => {
    GetProductList();
  }, [startDate, endDate, genreId, page, size, sort]);

  // 장르 목록 API 호출 함수
  const GetGenres = async () => {
    try {
      const response = await productApi.get(`/genres`);
      // console.log("장르 데이터:", response.data);
      setGenres(response.data);
    } catch (error) {
      console.error('장르 목록을 불러오지 못했습니다.', error);
    }
  };

  // 목록 요청
  useEffect(() => {
    GetGenres();
  }, [startDate, endDate, genreId, page, size, sort]);

  // 발매일 필터링 변경 함수
  const startDateChangeHandler = (e) => setStartDate(e.target.value || null);
  const endDateChangeHandler = (e) => setEndDate(e.target.value || null);

  // 장르 필터링 변경 함수
  const genreChangeHandler = (genreId) => setGenreId(genreId || null);

  // 체크 박스 구현
  const [selectedProducts, setSelectedProducts] = useState(new Set());

  // 체크박스로 선택된 상품 토글
  const toggleSelectProduct = (productId) => {
    const newSelectedProducts = new Set(selectedProducts);
    if (newSelectedProducts.has(productId)) {
      newSelectedProducts.delete(productId);
    } else {
      newSelectedProducts.add(productId);
    }
    setSelectedProducts(newSelectedProducts);
  };

  // 상세 이동 함수
  const { goToProductListDetailPage } = CustomNavigate();

  // 개별 장바구니 추가
  const handleProductCartButtonClick = async (productId) => {
    if (!userId) {
      alert('로그인이 필요합니다.');
      return;
    }

    try {
      const response = await cartApi.post(
        `/cartItems`,
        {
          product: { productId },
          productQuantity: 1, // 기본값
        },
        {
          params: { userId }, // userId를 쿼리 파라미터로 전달
        }
      );

      if (response.status === 200) {
        alert('상품이 장바구니에 담겼습니다.');
        setCartItemCount(cartItemCount + 1); // 헤더에 장바구니 카운트 증가
      }
    } catch (error) {
      console.error('장바구니 추가 실패:', error);
      alert('장바구니 추가 중 오류가 발생했습니다.');
    }
  };

  // 체크박스 선택한 상품 일괄 장바구니 추가
  const { goToCartDetailPage } = CartNavigate();

  const handleSelectedCartButtonClick = async () => {
    if (selectedProducts.size === 0) {
      alert('선택된 상품이 없습니다.');
      return;
    }

    if (!userId) {
      alert('로그인이 필요합니다.');
      return;
    }

    try {
      const requests = [...selectedProducts].map((productId) =>
        cartApi.post(
          '/cartItems',
          {
            product: { productId },
            productQuantity: 1,
          },
          { params: { userId } }
        )
      );
      await Promise.all(requests);

      const confirmActionCart = () => {
        confirm(
          '장바구니에 상품이 담겼습니다. 장바구니로 이동하시겠습니까?',
          () => {
            goToCartDetailPage(userId); // 예 클릭 시 동작할 함수 (userId 들고 장바구니 페이지로 이동)
          },
          () => {
            setSelectedProducts(new Set()); // 아니오 클릭 시 동작할 함수 (장바구니 갯수만 추가)
          }
        );
      };

      // 컨펌 함수 실행
      confirmActionCart();
    } catch (error) {
      console.error('장바구니 추가 실패', error);
      alert('장바구니 추가 중 오류가 발생했습니다.');
    }
  };

  // 바로구매 버튼 구현
  const handleProductOrderButtonClick = async (productId) => {
    if (!userId) {
      alert('로그인이 필요합니다.');
      return;
    }
    try {
      const response = await cartApi.post(`/cartItems?userId=${encodeURIComponent(userId)}`, { product: { productId }, productQuantity: 1 });
      const cartItem = response.data.results.cartItem;
      // console.log(response.data);
      // console.log('결제 상품', cartItem);

      // new Set 없이 [cartItem] 로 넘기기
      goToOrderUserPage(userId, [cartItem.cartItemId]);
    } catch (error) {
      console.error('상품 데이터를 불러오는데 실패했습니다:', error);
    }
  };

  // 좋아요 버튼 구현
  const { goToProductLikePage } = ProductNavigate();

  // 새로고침 이후에도 좋아요 상품 유지
  const saveLikeProduct = (likeProducts) => {
    localStorage.setItem('likeProducts', JSON.stringify(likeProducts));
  };

  // 상품 좋아요 여부 관리
  // 찜한 상품 : true / false
  const isLiked = (productId) => {
    return likeProducts[productId] || false;
  };

  // 개별 상품 좋아요 추가
  const handleLikeButtonClick = async (productId) => {
    if (!userId) {
      alert('로그인이 필요합니다.');
      return;
    }
    console.log('현재 userId', userId);

    const liked = likeProducts[productId];

    // 기존에 찜한 상품인지 체크
    try {

      if (liked) {
        // 찜 삭제 (기존에 찜한 상품인 경우)
        await userApi.delete(`/wish/${productId}`);
        alert('상품이 찜 목록에서 삭제 되었습니다.');

        // 상태 업데이트 (찜 목록에서 제거)
        const updatedLikeProducts = { ...likeProducts };
        delete updatedLikeProducts[productId]; // 찜 상품 삭제
        setLikeProducts(updatedLikeProducts); // 찜 목록 상태 업데이트
        saveLikeProduct(updatedLikeProducts); // 찜 목록 로컬스토리지 저장

      } else {
        // 찜 추가 (기존에 찜하지 않은 상품인 경우)
        const data = {
          'productId': productId , // 상품 정보 (id)
          'userId': userId, // 유저 정보 (id)
          'productQuantity': 1, // 상품 재고 (1로 디폴트)
        };
        console.log('찜 상태', data);

          const response = await userApi.post(`/wish/add`, data);

          if (response.status === 200) {
            alert('상품이 찜 목록에 추가되었습니다.');

            // // 찜 상품 업데이트 (기존에 있는 상품 + 새로운 상품 추가)
            // console.log('찜 상품 추가', response.data);
            // const newLikeItem = response.data;

            // // 로컬 스토리지에 찜 상품 정보 저장
            // setLikeList((prevList) => [...prevList, newLikeItem]);

            // // 좋아요 상품 업데이트, 기존 상품에 새로운 상품을 추가
            // const updatedLikeProducts = { ...likeProducts, [productId]: true };
            setLikeProducts((prev) => ({...prev, [productId] : true})); // 찜 목록 상태 업데이트
            saveLikeProduct({...likeProducts, [productId]: true}); // 찜 목록 로컬 스토리지 저장
          }
        }
    } catch (error) {
      console.error('찜 추가 실패:', error);
      alert('찜 추가/삭제 중 오류가 발생했습니다.');
    }
  };

  // 체크 박스 일괄 좋아요 추가
  const handleSelectedLikeButtonClick = async () => {
    if (selectedProducts.size === 0) {
      alert('선택된 상품이 없습니다.');
      return;
    }

    if (!userId) {
      alert('로그인이 필요합니다.');
      return;
    }

    // 일괄 좋아요 상품 추가 요청 API (추가_POST)
    try {
      const requests = [...selectedProducts].map((productId) => {
        const data =  {
          'productId': productId , // 상품 정보 (id)
          'userId': userId, // 유저 정보 (id)
          'productQuantity': 1, // 상품 재고 (1로 디폴트)
        }
        console.log('---일괄좋아요---');
        console.log(data);
        userApi.post(`/wish/add`, data);
      });

      await Promise.all(requests);
      alert('선택한 상품이 찜 목록에 추가되었습니다.');

      // 좋아요 상품 업데이트, 기존 상품에 체크박스로 선택된 상품을 추가
      const updatedLikeProducts = { ...likeProducts };
      [...selectedProducts].forEach((productId) => {
        updatedLikeProducts[productId] = true;
      });

     // 업데이트 된 좋아요 상품 새로고침 이후에도 유지
     saveLikeProduct(updatedLikeProducts);

     // 좋아요 상품 업데이트 (기존에 있는 상품 + 체크 박스로 선택된 새로운 상품)
     setLikeProducts(updatedLikeProducts);

     setSelectedProducts(new Set());

      const confirmActionLike = () => {
        confirm(
          '찜 목록에 상품이 추가되었습니다. 찜 목록으로 이동하시겠습니까?',
          () => {
            goToProductLikePage(userId); // 예 클릭 시 동작할 함수 (userId 들고 찜 페이지로 이동)
          },
          () => {
            setSelectedProducts(new Set()); // 아니오 클릭 시 동작할 함수 (찜 갯수만 추가)
          }
        );
      };

      confirmActionLike();
    } catch (error) {
      console.error('찜 추가 실패', error);
      alert('찜 목록 추가 중 오류가 발생했습니다.');
    }
  };

  // likeItem 상태에 따라 개별 찜 버튼 업데이트하기
  const getLikeButton = (productId) => {
    return likeProducts[productId] ? '찜 완료❤' : '찜 추가';

  };

  // 로컬 스토리지에서 좋아요 데이터 불러오기
  useEffect(() => {
    const savedLikeProduct = localStorage.getItem('likeProducts');
    if (savedLikeProduct) {
      setLikeProducts(JSON.parse(savedLikeProduct));

      console.log('찜 리스트', likeList);
      console.log('찜 상품', likeProducts);
    }
  }, []);

  return (
    <>
      <div className="subTitle">신상 도서</div>
      <div className="explanation">새롭게 등록된 신상 도서 리스트입니다.</div>

      <div className="filters-container">
        <div className="filters">
          <label htmlFor="startDate">📕발매일 필터링 </label>
          <input type="date" id="startDate" value={startDate || ''} onChange={startDateChangeHandler} />

          <label htmlFor="endDate"></label>
          <input type="date" id="endDate" value={endDate || ''} onChange={endDateChangeHandler} />
          <br />

          <label htmlFor="genre">📗장르 </label>
          <div className='genre-buttons'>
            <button key="all"
              className={`genre-btn ${genreId === null ? "active" : ""}`}
              onClick={() => genreChangeHandler(null)}  // 전체 리스트를 선택할 때 genreId를 null로 설정
            >전체</button>

            {Array.isArray(genres) && genres.length > 0 ? (
              genres.map((genre) => (
                <button key={genre.genreId}
                 className={`genre-btn ${genreId === genre.genreId ? "active" : ""}`}
                 onClick={() => genreChangeHandler(genre.genreId)}>
                  {genre.genreName}
                  </button>
              ))
            ) : (
              <p>장르 정보가 없습니다.</p>
            )}
          </div>
        </div>

        <div className="high-btn">
          <button className="cart-btn" onClick={handleSelectedCartButtonClick}>
            선택 상품 <br /> 장바구니 담기
          </button>
          <button
            className="like-btn"
            onClick={() => {
              if (serverData.results.productList.length > 0) {
                const firstProduct = serverData.results.productList[0];
                handleSelectedLikeButtonClick(firstProduct.productId);
              }
            }}>
            ❤
          </button>
        </div>
      </div>

      <hr />

      <div className="productList">
        {Array.isArray(serverData.results.productList) && serverData.results.productList.length > 0 ? (
          serverData.results.productList.map((product) => (
            <div key={product.productId} className="product-item">
              <input type="checkbox" className="checkbox" checked={selectedProducts.has(product.productId)} onChange={() => toggleSelectProduct(product.productId)} />
              <img className="product-image" src={product.productImage} alt={product.productName} onClick={() => goToProductListDetailPage(product.productId)} />

              <div
                className="product-details"
                onClick={(e) => {
                  // 장바구니 버튼 클릭을 방지하려면 클릭 이벤트의 대상 확인
                  if (e.target.closest('button')) return;
                  goToProductListDetailPage(product.productId);
                }}>
                <h3 className="new-book-title">{product.productName}</h3>
                <h3 className="genre">{product.genre.genreName}</h3>
                <p className="description"><QuillViewer>{product.description}</QuillViewer></p>
                <p className="publication">{product.publicationDate}</p>
                <p className="author">{product.author.authorName}</p>
                <p className="publisher">{product.publisher.publisherName}</p>
                <p className="price">{product.productPrice.toLocaleString()}원</p>
              </div>
              <div className="product-btn">
                <button
                  className="cart-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleProductCartButtonClick(product.productId);
                  }}>
                  장바구니
                </button>
                <button
                  className="sale-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleProductOrderButtonClick(product.productId);
                  }}>
                  바로구매
                </button>
                <button
                  className="like-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLikeButtonClick(product.productId);
                  }}>
                  {getLikeButton(product.productId)}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>상품이 없습니다.</p>
        )}
      </div>

      <PageComp serverData={serverData} goToListPage={goToListPage} page={page} size={size} sort={sort} />
    </>
  );
};

export default ProductNewComp;
