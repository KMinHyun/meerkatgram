import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // 개발 서버 Proxy 정의
  server: {
    // 경로가 '/api'로 시작하는 요청을 대상으로 Proxy 설정(모든 경로를 적으면 안 됨)
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Request 대상 서버 주소
        changeOrigin: true, // Request Header의 Host라는 필드의 값을 대상 서버 호스트로 변경함
        secure: false, // SSL 인증서 검증을 무시
        ws: true, // webSocket 프로포콜 사용하는 처리
      }
    }
  }
})
