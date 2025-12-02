import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import dayjs from 'dayjs';
import { reissueThunk } from '../store/thunks/authThunk.js';

// store 저장용 변수
let store = null;

// store 주입용 함수
export function injectStoreInAxios(_store) {
  store = _store;
}

// axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: '', // <= 기본 URL. axios호출 시 가장 앞에 자동으로 연결하여 동작. 공통적으로 사용하는 도메인을 넣어두면 thunk에서 baseURL을 다 쓰지 않고 빼도 됨. 프론트와 백엔드 서버가 다를 땐 백엔드의 서버를 baseURL에 넣어줘야 함.
  headers: {
    'Content-Type': 'application/json',
  },
  // 크로스 도메인(서로 다른 도메인)에 요청 보낼 때 credential한 정보를 담아서 보낼지 여부를 지정
  // credential한 정보 : 1. 쿠키, 2. 헤더의 Authorization 항목 등
  withCredentials: true, // 기본은 false
});

axiosInstance.interceptors.request.use(async config => { // config: 원래 보내려 했던 request 객체의 option(body X)
  const noRetry = /^\/api\/auth\/reissue$/; // <= 리트라이 제외 URL 설정
  let { accessToken } = store.getState().auth; // <= state에 접근해서 auth state 획득

  try {
    // 엑세스 토큰 있음 && 리트라이 제외 URL 아님
    if(accessToken && !noRetry.test(config.url)) {
      // 엑세스 토큰 만료 확인
      const claims = jwtDecode(accessToken); // <= 토큰을 json 형태로 디코딩한 뒤 다시 객체로 파싱하는 처리를 jwtDecode로 해결
      const now = dayjs().unix();
      const expTime = dayjs.unix(claims.exp).add(-5, 'minute').unix();
      
      if(now >= expTime) {
        // 만료된 패턴
        const response = await store.dispatch(reissueThunk()).unwrap();
        accessToken = response.data.accessToken;
      }
      config.headers["Authorization"] = `Bearer ${accessToken}`; // <= 여기서 세팅을 안 하면 Thunk마다 세팅을 해줘야 함
    }
  
    return config;
  } catch(error) {
    console.log('axios interceptor', error);
    return Promise.reject(error); // <= Thunk에서 에러쪽으로 빠짐
  }
});

export default axiosInstance;