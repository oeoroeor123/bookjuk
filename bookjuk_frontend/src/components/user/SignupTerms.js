import React from 'react';
import { useState } from "react";
import { Button, Modal } from 'react-bootstrap';
//import '../../css/user/SignupTerms.css';
import { useNavigate } from 'react-router-dom';
import { alert } from '../../common/settings';


const SignupTerms = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [ allChecked, setAllChecked] = useState(false);
  const [ checkboxes, setCheckboxes ] = useState({
    option1: false,
    option2: false,
    option3: false,
  });

  // 전체 체크박스가 변경되었을 때 나머지 체크박스들을 모두 체크하거나 해제
  const handleAllCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setAllChecked(isChecked);
    setCheckboxes({
      termsOfService:   isChecked,
      privacyPolicy:    isChecked,
      marketingConsent: isChecked,
    });
  };

  // 개별 체크박스가 변경되었을 때 상태 업데이트 및 전체 체크 상태 업데이트
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCheckboxes((prevCheckboxes) => {
      const updatedCheckboxes = {
        ...prevCheckboxes,
        [name]: checked,
      };
      // 개별 체크박스가 모두 체크된 경우 전체 체크박스를 true로 설정
      const allCheckedStatus = Object.values(updatedCheckboxes).every(Boolean);
      setAllChecked(allCheckedStatus);
      return updatedCheckboxes;
    });
  };

  const handleShowModal = (content) => {
    setModalContent(content);
    setShowModal(true);
  };

  const handleNext = () => {
    if (!checkboxes.termsOfService || !checkboxes.privacyPolicy) {
      alert("필수 약관에 동의해야 회원가입이 가능합니다.");
      return;
    }
    navigate("/user/signup");
  };

  return (
    <div className='container d-flex justify-content-center align-items-center' style={{ height: '70vh' }} >
      <div className="card p-4" style={{ width: '100%', maxWidth: '800px' }}>

        <h3 className='text-center mb-4 border-bottom pb-4'>북적북적 약관 동의</h3>

        {/* 전체 동의 체크박스 */}
        <div className='mb-4'>
          <input type='checkbox' className='form-check-input' id='all' checked={allChecked} onChange={handleAllCheckboxChange}/>
          <label className='form-check-label' htmlFor='all'>
            서비스 이용약관, 개인정보 수집 및 이용, 마케팅 정보 수집(선택)에 모두 동의합니다.
          </label>             
        </div>

        {/* 개별 약관 체크박스 리스트 */}
        <ul className='list-unstyled'>
          <li className='mb-3'>
              <input type='checkbox' className='form-check-input' id='agree01' name='termsOfService' checked={checkboxes.termsOfService} onChange={handleCheckboxChange}/>
              <label className='form-check-label' htmlFor='agree01'>
                서비스 이용약관 <span className='text-danger'>(필수)</span>
              </label>
              <button className='btn btn-link btn-sm' onClick={() => 
                handleShowModal("북적북적 서비스 및 제품(이하 ‘서비스’)을 이용해 주셔서 감사합니다. 본 약관은 다양한 북적북적 서비스의 이용과 관련하여 북적북적 서비스를 제공하는 북적북적 주식회사(이하 ‘북적북적’)와 이를 이용하는 북적북적 서비스 회원(이하 ‘회원’)의 관계를 설명하며, 아울러 여러분의 북적북적 서비스 이용에 도움이 될 수 있는 유익한 정보를 포함하고 있습니다.")}>
                자세히
              </button>
          </li>

          <li className='mb-3'>
              <input type='checkbox' className='form-check-input' id='agree02' name='privacyPolicy' checked={checkboxes.privacyPolicy} onChange={handleCheckboxChange}/>
              <label  className='form-check-label' htmlFor='agree02'>
                개인정보 수집 및 이용 동의 <span className='text-danger'>(필수)</span>
              </label>
              <button className='btn btn-link btn-sm' onClick={() => 
                handleShowModal("개인정보보호법에 따라 북적북적에 회원가입 신청하시는 분께 수집하는 개인정보의 항목, 개인정보의 수집 및 이용목적, 개인정보의 보유 및 이용기간, 동의 거부권 및 동의 거부 시 불이익에 관한 사항을 안내 드리오니 자세히 읽은 후 동의하여 주시기 바랍니다.이용자는 회원가입을 하지 않아도 도서 검색 등 대부분의 북적북적 서비스를 회원과 동일하게 이용할 수 있습니다. 이용자가 신상 또는 추천 도서 구매, 중고도서 판매 및 구매 등과 같이 개인화 혹은 회원제 서비스를 이용하기 위해 회원가입을 할 경우, 북적북적은 서비스 이용을 위해 필요한 최소한의 개인정보를 수집합니다.")}>
                자세히
              </button>
          </li>

          <li className="mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="agree03"
                name="marketingConsent"
                checked={checkboxes.marketingConsent}
                onChange={handleCheckboxChange}
              />
              <label  className='form-check-label' htmlFor="agree03">마케팅 정보 수신 동의 (선택)</label>
              <button className="btn btn-link btn-sm" onClick={() => 
                handleShowModal("마케팅 정보 수신에 동의하시면, 전화번호 및 이메일을 활용한 신상도서 추천 및 광고 홍보 수신 등을 포함하는 북적북적 서비스를 이용할 수 있습니다. 이 약관은 북적북적 주식회사 (이하 “회사”)가 제공하는 마케팅홍보서비스와 관련하여 회사와 개인정보주체와의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.")}>
                자세히
              </button>
          </li>
        </ul>

        {/* 다음 버튼 */}        
          <button className='btn btn-light w-100' onClick={handleNext}>
            다음
          </button>
        
        {/* 약관 모달 */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>약관 내용</Modal.Title>
          </Modal.Header>
          <Modal.Body>{modalContent}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              닫기
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default SignupTerms;