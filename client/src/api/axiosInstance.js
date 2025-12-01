import axios from 'axios';

// axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: '', // <= 기본 URL. axios호출 시 가장 앞에 자동으로 연결하여 동작. 공통적으로 사용하는 도메인을 넣어두면 thunk에서 baseURL을 다 쓰지 않고 빼도 됨. 프론트와 백엔드 서버가 다를 땐 백엔드의 서버를 baseURL에 넣어줘야 함.
  headers: {
    "Content-Type": 'application/json',
  },
  // 크로스 도메인(서로 다른 도메인)에 요청 보낼 때 credential한 정보를 담아서 보낼지 여부를 지정
  // credential한 정보 : 1. 쿠키, 2. 헤더의 Authorization 항목 등
  withCredentials: true, // 기본은 false
});

export default axiosInstance;