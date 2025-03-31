/**
 * FAQ
 * 
 * Developer : 김민희
 */

import React from 'react';
import { useParams } from 'react-router-dom';
import FAQDetailComp from '../../components/faq/FAQDetailComp';

const FAQDetailPage = () => {
  const { id } = useParams();

  return (
    <div>
      <FAQDetailComp id={id}/>
    </div>
  );
};

export default FAQDetailPage;