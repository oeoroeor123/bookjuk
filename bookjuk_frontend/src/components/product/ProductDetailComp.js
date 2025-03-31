import { useContext, useEffect, useState } from 'react';
import Table from "react-bootstrap/Table";
import { getProductDetail } from '../../api/productRestAPI';
import CustomNavigate from '../../hooks/CustomNavigate';
import { useParams } from 'react-router-dom';
import OrderNavigate from '../../hooks/OrderNavigate';
import { getIdFromSessionStorage } from '../../common/settings';
import { userApi, cartApi } from '../../api/baseApi';
import { UserContext } from '../common/UserContext';
import QuillViewer from '../secondhand/QuillViewer';

const ProductDetailComp = () => {

  // url 파라미터를 직접 useParams를 이용해 받아옴
  const {productId} = useParams();

 // userId 받아와서 장바구니, 좋아요 구현
 const userId = getIdFromSessionStorage();

 // 바로구매 버튼 구현
 const { goToOrderUserPage } = OrderNavigate();

 // 좋아요 버튼 구현
 const [likeProducts, setLikeProducts] = useState({});

 // 페이지 이동 함수
 const {goToNewProductListPage} = CustomNavigate();

 // 장바구니 count 변경할 변수
 const { cartItemCount, setCartItemCount } = useContext(UserContext);

  // 상품 정보 관리
  const [ serverData, setServerData ] = useState ({
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
      genre: { genreName: '' },
      author: { authorName: '' },
      publisher: { publisherName: '' },
    }
  }
  });

  // 상품 정보 불러오기(최초, productId 변경 시)
  useEffect(() => {
    console.log('상품 상세 요청', productId);
    if(!productId) {
      console.log('productId 유효하지 않음');
      return;
    }
    getProductDetail(productId)
      .then(jsonData => {
        console.log("상품정보 :", jsonData);
        setServerData(jsonData);
      })
      .catch(error => {
        console.log('상품 상세 정보 요청 실패', error.response || error);
      });
      
    // 좋아요 상품 상태 초기화
    const savedLikeProduct = JSON.parse(localStorage.getItem('likeProducts') || '{}');
    setLikeProducts(savedLikeProduct);

  },[productId]);

  // 찜 버튼
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

          // 좋아요 상품 업데이트, 기존 상품에 새로운 상품을 추가
          setLikeProducts((prev) => ({ ...prev, [productId]: true })); // 찜 목록 상태 업데이트
          saveLikeProduct({ ...likeProducts, [productId]: true }); // 찜 목록 로컬 스토리지 저장
        }
      }
    } catch (error) {
      console.error('찜 추가 실패:', error);
      alert('찜 추가/삭제 중 오류가 발생했습니다.');
    }
  };

  // 찜 버튼 상태에 따라 변경
  const getLikeButton = (productId) => {
    return likeProducts[productId] ? '찜 완료❤' : '찜 추가';
  };

  // 상품 바로 구매 버튼
  const handleProductOrderButtonClick = async (productId) => {
    if (!userId) {
      alert('로그인이 필요합니다.');
      return;
    }
    try {
      const response = await cartApi.post(`/cartItems?userId=${encodeURIComponent(userId)}`, { product: { productId }, productQuantity: 1 });
      const cartItem = response.data.results.cartItem;
      goToOrderUserPage(userId, [cartItem.cartItemId]);
    } catch (error) {
      console.error('상품 데이터를 불러오는데 실패했습니다:', error);
    }
  };

  // 새로고침 이후에도 좋아요 상품 유지
  const saveLikeProduct = (likeProducts) => {
    localStorage.setItem('likeProducts', JSON.stringify(likeProducts));
  };

  // 장바구니 버튼
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

  return (
    <div>
      <Table>
        <tbody>
          <tr>
            <th>상품 번호</th>
            <td>{serverData.results.product.productId}</td>
          </tr>
          <tr>
            <th></th>
            <td>
              <img
                src={serverData.results.product.productImage || null}
                style={{ width: "300px", height: "auto" }}
                alt="product"
              />
            </td>
          </tr>
          <tr>
            <th>도서명</th>
            <td>{serverData.results.product.productName}</td>
          </tr>
          <tr>
            <th>장르</th>
            <td>{serverData.results.product.genre.genreName}</td>
          </tr>
          <tr>
            <th>출판사</th>
            <td>{serverData.results.product.publisher.publisherName}</td>
          </tr>
          <tr>
            <th>작가</th>
            <td>{serverData.results.product.author.authorName}</td>
          </tr>
          <tr>
            <th>가격</th>
            <td>{serverData.results.product.productPrice.toLocaleString()} 원</td>
          </tr>
          <tr>
            <th>재고</th>
            <td>{serverData.results.product.stock}</td>
          </tr>
          <tr>
            <th>총 페이지 수</th>
            <td>{serverData.results.product.totalPages}</td>
          </tr>
          <tr>
            <th>발행일</th>
            <td>{serverData.results.product.publicationDate}</td>
          </tr>
          <tr>
            <th>등록일</th>
            <td>{serverData.results.product.createDt}</td>
          </tr>
          <tr>
            <th>도서 설명</th>
            {serverData.results.product.description ? (
              <QuillViewer description={serverData.results.product.description} />
            ) : (
              <p>상품 설명이 없습니다.</p>
            )}
          </tr>
        </tbody>
      </Table>

      <div className="row-btn">
        <button className="listBtn" onClick={goToNewProductListPage}>
          목록
        </button>
        <button
          className="likeBtn"
          onClick={(e) => {
            e.stopPropagation();
            handleLikeButtonClick(serverData.results.product.productId);
          }}
        >
          {getLikeButton(serverData.results.product.productId)}
        </button>
        <button
          className="saleBtn"
          onClick={(e) => {
            e.stopPropagation();
            handleProductOrderButtonClick(serverData.results.product.productId);
          }}
        >
          바로구매
        </button>
        <button
          className="cartBtn"
          onClick={(e) => {
            e.stopPropagation();
            handleProductCartButtonClick(serverData.results.product.productId);
          }}
        >
          장바구니
        </button>
      </div>
    </div>
  );
};

export default ProductDetailComp;
