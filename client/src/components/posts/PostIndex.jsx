import { useDispatch, useSelector } from 'react-redux';
import './PostIndex.css';
import { useEffect } from 'react';
import { postIndexThunk } from '../../store/thunks/postIndexThunk.js';
import { useNavigate } from 'react-router-dom';

export default function PostIndex() {
  const { list, page, isLasted } = useSelector(state => state.postIndex);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if(!list) {
      dispatch(postIndexThunk(page + 1));
    }
  }, []);

  function nextPage() {
    dispatch(postIndexThunk(page + 1));
  }

  function redirectPostShow(id) {
    navigate(`/posts/show/${id}`);
  }

  return (
    <>
      <div className="post-index-container">
        <div className="post-index-card-box">
          {
            list && list.map(item => {
              return <div className="post-index-card" style={{backgroundImage: `url("${item.image}")`}} onClick={() => { redirectPostShow(item.id) }} key={item.id}></div>
            })
          }
        </div>
        {
          !isLasted && <button type="button" className='btn-full-width bg-gray' onClick={nextPage}>Show more posts from Kanna_Kamui</button>
        }
      </div>
    </>
  )
}