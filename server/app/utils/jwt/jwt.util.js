/**
 * @file /app/utils/jwt/jwt.util.js
 * @description jwt 유틸리티
 * 251125 v1.0.0 김민현 초기 작성
 */
import jwt from 'jsonwebtoken';

// -------------
//    private
// -------------
/**
 * JWT 생성
 * @param {{}} payload 
 * @param {number} ttl 
 * @returns {string} JWT(문자열) 반환
 */
function generateToken(payload, ttl) { // ttl = timeToLive = 유효시간 설정 / access토큰과 refresh토큰이 payload와 ttl만 다름
  // 옵션 설정
  const options = {
    algorithm: process.env.JWT_ALGORITHM,
    noTimestamp: false, // payload.iat 클레임을 설정하겠단 뜻 / iat = issuedDate = 토큰 발급 시간
    expiresIn: ttl, // payload.exp 설정 = 토큰 만료 시간 / 밀리초단위
    issuer: process.env.JWT_ISSUER// payload.iss 설정 = 토큰 발급자
  }

  // 토큰 생성
  return jwt.sign(payload, process.env.JWT_SECRET, options);
}
// ------------
//    public
// ------------
/**
 * 엑세스 토큰 생성
 * @param {import("../../models/index.js").User} user 
 * @returns {string} JWT
 */
function generateAccessToken(user) { // <= 여기서 user는 모델. 한 명의 유저를 받겠단 뜻.
  // payload 설정
  const payload = {
    sub: user.id, // payload.sub에 세팅이 되고 세팅 값(value)은 user pk
    role: user.role // payload.role에 세팅이 되고 세팅 값(value)은 user role
  }

  // 엑세스 토큰 생성
  return generateToken(payload, parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRY));
}

/**
 * 리프래쉬 토큰 생성
 * @param {import("../../models/index.js").User} user 
 * @returns {string} JWT
 */
function generateRefreshToken(user) {
  // payload 설정
  const payload = {
    sub: user.id, // payload.sub에 세팅이 되고 세팅 값(value)은 user pk
  }

  // 리프래쉬 토큰 생성
  return generateToken(payload, parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRY));
}

// 내보내기
export default {
  generateAccessToken,
  generateRefreshToken
}