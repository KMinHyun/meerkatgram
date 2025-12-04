import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Login.css'
import { loginThunk } from '../../store/thunks/authThunk.js';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [password, setPassword] = useState('');

  // form태그에 내장된 submit 제거하는 법
  async function handleLogin(e) {
    // form태그에 있던 기존 이벤트(submit) 취소
    e.preventDefault();

    // 로그인 요청
    try {
      await dispatch(loginThunk({email, password})).unwrap();
      
      // history 설정(replace: true = 이력 남기지 않음)
      return navigate('/posts', { replace: true });
    } catch(error) {
      const code = error.response?.data?.code
      alert(`로그인 실패했습니다. ${code}`);
    }
  }

  // 소셜 로그인 페이지로 이동 처리
  function handleSocial(provider) {
    window.location.replace(`/api/auth/social/${provider}`);
  }

  // email 유효성 검사
  function validationAndSetEmail(e) {
    const val = e.target.value;
    setEmail(e.target.value);
    // if(/^[0-9]+$/.test(val)) {
    //   setEmail(e.target.value);
    //   setEmailErr(null);
    // } else {
    //   setEmailErr('이메일 형식 오류');
    // }
  }

  return (
    <>
    {email} {password}
      <form className="login-container" onSubmit={handleLogin}>
        {emailErr} 
        <input type="text" className={`input-big-border ${emailErr ? 'redBorder' : 'greenBorder'}`} onChange={ validationAndSetEmail } placeholder='email' />
        <input type="password" className='input-big-border' onChange={e => { setPassword(e.target.value) }} placeholder='password' />
        <button type="submit" className="btn-big bg-gray">Log in</button>
        <div className="text-on-line">or</div>
        <button type="button" className="btn-big bg-img-kakao" onClick={() => {handleSocial('kakao')}}></button>
        <button type="button" className="btn-big bg-light">Sign up</button>
      </form>
    </>
  )
}
