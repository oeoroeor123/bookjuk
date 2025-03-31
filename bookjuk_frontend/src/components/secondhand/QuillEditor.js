import { useEffect, useMemo, useRef, useState } from 'react';
import ReactQuill from 'react-quill'; // Quill editor를 위한 컴포넌트
import 'react-quill/dist/quill.snow.css'; // Quill 기본 스타일
import axios from 'axios';

const QuillEditor = ({ editorValue, setEditorValue, description, imgFlg, imageUrls, setImageUrls, type }) => {
  const quillRef = useRef(null); // ReactQuill에 대한 ref

  useEffect(() => {
    //console.log(description);
    if (description) {
      setEditorValue(description);
      //console.log(editorValue);
    }
  }, [description]);

  const handleChange = (value) => {
    //console.log(value);
    setEditorValue(value);
  };

  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (file) {
        const formData = new FormData();
        formData.append('file', file);

        try {
          //console.log(file);
          //console.log(formData);
          let response;
          if (type === 'product') { // 상품에서 호출할때
            response = await axios.post('http://localhost:8080/admin/products/quill/upload', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
          } else { // 중고상품에서 호출할때
            response = await axios.post('http://localhost:8080/quill/upload', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
          }
          //console.log(response);

          // 서버에서 받은 이미지 URL을 퀼 에디터에 삽입
          const imageUrl = response.data.url; // 서버에서 URL을 받는다고 가정
          // Quill 인스턴스 가져오기
          const quill = quillRef.current.getEditor();
          const range = quill.getSelection();
          quill.insertEmbed(range.index, 'image', 'http://localhost:8080/image/' + imageUrl); // 이미지 삽입

          // // 이미지 삽입 후 크기 조정
          // const imageElement = quill.root.querySelector(`img[src='http://localhost:8080/image/${imageUrl}']`);
          // if (imageElement) {
          //   imageElement.style.width = '300px'; // 원하는 너비로 조정
          //   imageElement.style.height = 'auto'; // 비율에 맞춰 높이 자동 조정
          // }

          setImageUrls((prevUrls) => [...prevUrls, imageUrl]); // 배열에 새 URL을 추가
        } catch (error) {
          console.error('이미지 업로드 실패:', error);
        }
      }
    };
  };

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          ...(imgFlg ? [['image']] : []),
          [{ header: '1' }, { header: '2' }, { font: [] }],
          [{ size: ['small', 'normal', 'large', 'huge'] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ color: [] }, { background: [] }],
          [{ align: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ script: 'sub' }, { script: 'super' }],
          [{ indent: '-1' }, { indent: '+1' }],
        ],
        handlers: imgFlg ? { image: imageHandler } : {}, // imgFlg가 false일 경우, image 버튼에 대한 핸들러는 설정하지 않음        },
      },
    };
  }, []);

  return (
    <>
      <div>
        <style>
          {`.ql-editor h2 { text-align: left; }`}
          {`.ql-editor {font-size: 16px; }`}
          {`.ql-container {width: 100%; height: 300px; }`}
        </style>
        <ReactQuill
          ref={quillRef} // ref를 통해 Quill 인스턴스에 접근
          value={editorValue}
          onChange={handleChange}
          theme="snow"
          modules={modules}
        />
      </div>
    </>
  );
};

export default QuillEditor;
