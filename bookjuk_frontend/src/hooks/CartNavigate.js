import { useNavigate } from 'react-router-dom';

const CartNavigate = () => {

  // useNavigate() : 페이지 이동 Hooks
  const navigate = useNavigate();

  // 유저 카트 상세 페이지로 이동
  // const goToCartDetailPage = (userId) => {
  // //   navigate({
  //     pathname: `/carts/user/${userId}`
  //   })
  // }
  const goToCartDetailPage = (userId) => {
    navigate(`/carts/user`, {
      state: {
        userId: userId
      } 
    })
  }

  return {
    goToCartDetailPage,
  };
};

export default CartNavigate;