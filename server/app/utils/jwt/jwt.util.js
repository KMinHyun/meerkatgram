/**
 * @file /app/utils/jwt/jwt.util.js
 * @description jwt 유틸리티
 * 251125 v1.0.0 김민현 초기 작성
 */
import jwt from 'jsonwebtoken';
import myError from '../../errors/customs/my.error.js';
import { EXPIRED_TOKEN_ERROR, INVALID_TOKEN_ERROR, UNAUTHORIZED_ERROR } from '../../../configs/responseCode.config.js';

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
    expiresIn: ttl, // payload.exp 설정 = 토큰 만료 시간 / 초단위
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

/**
 * 헤더에서 토큰 획득
 * @param {import("express").Request} req 
 * @returns {string} token
 */
function getBearerToken(req) {
  // 베어러 토큰 획득
  const bearerToken = req.headers[process.env.JWT_HEADER_KEY];

  // 베어러 토큰 없을 시(권한이 없는 사람이 왔을 때)
  if(!bearerToken) {
    throw myError('베어러 토큰 없음', UNAUTHORIZED_ERROR);
  }

  // 베어러 토큰 형식 검증
  const tokenParts = bearerToken.split(' ');
  if(tokenParts.length !== 2 || tokenParts[0] !== process.env.JWT_SCHEME) {
    throw myError('베어로 토큰 형식이 안 맞음', INVALID_TOKEN_ERROR);
  }

  return tokenParts[1];
}

/**
 * 토큰 검증 및 클레임 반환
 * @param {string} token 
 * @returns {jwt.Jwt} claims
 */
function getClaimsWithVerifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch(error) {
    if(error instanceof jwt.TokenExpiredError) {
      throw myError('토큰 만료', EXPIRED_TOKEN_ERROR);
    } else if(error instanceof jwt.JsonWebTokenError) {
      throw myError('토큰 이상', INVALID_TOKEN_ERROR);
    } else {
      throw error;
    }
  }
}

// 내보내기
export default {
  generateAccessToken,
  generateRefreshToken,
  getBearerToken,
  getClaimsWithVerifyToken
}