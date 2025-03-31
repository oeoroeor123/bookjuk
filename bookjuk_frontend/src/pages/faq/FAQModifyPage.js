import React from 'react';
import { useParams } from 'react-router-dom';
import FAQModifyComp from '../../components/faq/FAQModifyComp';

const FAQModifyPage = () => {
  const { id } = useParams();

  return (
    <div>
      <FAQModifyComp id={id} />
    </div>
  );
};

export default FAQModifyPage;