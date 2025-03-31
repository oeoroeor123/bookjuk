import { useEffect, useState } from 'react';
import dompurify from "dompurify";

const QuillViewer = ({ description }) => {

  const [editorValue, setEditorValue] = useState("");
  const sanitizer = dompurify.sanitize;

  useEffect(() => {
    //console.log(description);
    if (description) {
      setEditorValue(description);
    }
  }, [description]);

  return (
    <div>
      <div //style={{ border: '1px solid gray', padding: '10px' }}       
      dangerouslySetInnerHTML={{ __html: sanitizer(`${editorValue}`) }} />          
    </div>
    
  );
};

export default QuillViewer;