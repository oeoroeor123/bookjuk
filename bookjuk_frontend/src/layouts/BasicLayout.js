/**
 * 사이트 레이아웃 구성
 *
 * Developer : 김리예
 */

import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Container from 'react-bootstrap/Container';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BasicLayout = () => {
  return (
    <>
      <Header />
      <Container>
        <div className="content">
          <Outlet />
        </div>
      </Container>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <Footer />
    </>
  );
};

export default BasicLayout;
