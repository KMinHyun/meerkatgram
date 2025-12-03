import { useState } from 'react';
import './PostCreate.css';
import { useDispatch } from 'react-redux';
import { postImageUploadThunk, postStoreThunk } from '../../store/thunks/postCreateThunk.js';
import { useNavigate } from 'react-router-dom';

export default function PostCreate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');

  // form태그 기존 이벤트 막기
  async function handleCreate(e) {
    e.preventDefault();

    try {
      const resultUpload = await dispatch(postImageUploadThunk(file)).unwrap();
      const image = resultUpload.data.path; // <= 파일 업로드 URL 획득. 이미지의 url을 받아옴

      // 게시글 작성
      const resultStore = await dispatch(postStoreThunk({ content, image })).unwrap();

      // 작성한 게시글 상세로 이동
      return navigate(`/posts/show/${resultStore.data.id}`, {replace: true});
    } catch(error) {
      console.log('게시글 생성', error);
      return alert('게시글 생성 실패');
    }
  }

  // 파일 변경 시 처리 함수
  function changeFiles(e) {
    // 선택 파일 획득(1개 파일만 올리는 걸 전제)
    const file = e.target.files[0];

    // 미리보기
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file); // <= 파일을 읽어들여서 임시 URL을 생성. 비동기처리.
    fileReader.addEventListener('load', () => { setPreview(fileReader.result) }); // 비동기처리 대응
    setFile(file);
  }

  return (
    <>
      <form className="post-create-container" onSubmit={handleCreate}>
        <textarea className='post-create-textarea' onChange={e => { setContent(e.target.value) }}  name="content" placeholder='내용 작성'></textarea>
        <input type="file" onChange={changeFiles} accept="image/*" />
        {
          preview && <div className="post-create-image" style={{backgroundImage: `url("${preview}")`}}></div>
        }
        <button type="submit" className="btn-big bg-gray">Write</button>
      </form>
    </>
  )
}