/**
 * @file app/services/auth.service.js
 * @description auth Service
 * 251120 v1.0.0 김민현 초기 작성
 */
import bcrypt from 'bcrypt';
import userRepository from "../repositories/user.repository.js";
import myError from '../errors/customs/my.error.js';
import { NOT_REGISTERED_ERROR, REISSUE_ERROR } from '../../configs/responseCode.config.js';
import jwtUtil from '../utils/jwt/jwt.util.js';
import db from '../models/index.js';
import socialKakaoUtil from '../utils/social/social.kakao.util.js';
import axios from 'axios';
import PROVIDER from '../middlewares/auth/configs/provider.enum.js';
import ROLE from '../middlewares/auth/configs/role.enum.js';

/**
 * 로그인
 * @param {{emali: string, password: string}}} body 
 * @returns {Promise<import("../models/User.js").User>}
 */
async function login(body) {
  // 트랜잭션 처리
  // return await db.sequelize.transaction(async t => {
  //   // 비지니스 로직 작성...
  // });

  // 트랜잭션 처리
  return await db.sequelize.transaction(async t => {
    const { email, password } = body;
  
    // email로 유저 정보 획득
    const user = await userRepository.findByEmail(t, email);
  
    // 유저 존재 여부 체크
    if(!user) {
      throw myError('유저 미존재', NOT_REGISTERED_ERROR);
    }
  
    // 비밀번호 체크
    if(!bcrypt.compareSync(password, user.password)) {
      throw myError('비밀번호 틀림', NOT_REGISTERED_ERROR);
    }
  
    // JWT 생성(accessToken, refreshToken)
    const accessToken = jwtUtil.generateAccessToken(user);
    const refreshToken = jwtUtil.generateRefreshToken(user);
  
    // refreshToken 저장
    user.refreshToken = refreshToken;
    await userRepository.save(t, user);
  
    return {
      accessToken,
      refreshToken,
      user
    }
  });
}

/**
 * 로그아웃 처리
 * @param {number} id - 유저 id
 */
async function logout(id) {
  return await userRepository.logout(null, id);
}

/**
 * 토큰 재발급 처리
 * @param {string} token 
 */
async function reissue(token) {
  // 토큰 검증 및 유저id 획득
  const claims = jwtUtil.getClaimsWithVerifyToken(token);
  const userId = claims.sub; // <= JSON이라 형변환 필요 없음

  return await db.sequelize.transaction(async t => {
    // 유저 정보 획득
    const user = await userRepository.findByPk(t, userId);

    // 토큰 일치 검증
    if(token !== user.refreshToken) {
      throw myError('리프래쉬 토큰 불일치', REISSUE_ERROR);
    }

    // JWT 생성
    const accessToken = jwtUtil.generateAccessToken(user);
    const refreshToken = jwtUtil.generateRefreshToken(user);

    // 리프래쉬 토큰 DB에 저장
    user.refreshToken = refreshToken; // <= 이전 리프래쉬 토큰을 갱신
    await userRepository.save(t, user); // <= user 모델 갱신

    return {
      accessToken,
      refreshToken,
      user
    }
  });
}

// 카카오에 토큰 발급 요청 처리
async function socialKakao(code) {
  // 토큰 획득 요청에 필요한 헤더와 바디 작성
  const tokenRequest = socialKakaoUtil.getTokenRequest(code);

  // 토큰 획득 요청
  const resultToken = await axios.post(process.env.SOCIAL_KAKAO_API_URL_TOKEN, tokenRequest.searchParams, { headers: tokenRequest.headers} );
  const { access_token } = resultToken.data;

  // 사용자 정보 획득(카카오에서 주는)
  const userRequest = socialKakaoUtil.getUserRequest(access_token);
  const resultUser = await axios.post(process.env.SOCIAL_KAKAO_API_URL_USER_INFO, userRequest.searchParams, { headers: userRequest.headers });

  const kakaoId = resultUser.data.id;
  const email = resultUser.data.kakao_account.email;
  const profile = resultUser.data.kakao_account.profile.thumbnail_image_url;
  const nick = resultUser.data.kakao_account.profile.nickname;

  // DB에서 처리할 게 많으므로 transaction 사용
  const refreshToken = db.sequelize.transaction(async t => {
    // 가입한 회원인지 체크
    let user = await userRepository.findByEmail(t, email);

    if(!user) {
      // 미가입 회원이면 회원 가입 처리
      const data = {
        email,
        profile, // <= 카카오의 프로필이라 download 처리 만들어줘야 함
        nick,
        password: bcrypt.hashSync(crypto.randomUUID(), 10),
        provider: PROVIDER.KAKAO,
        role: ROLE.NORMAL,
      }

      user = await userRepository.create(t, data);
    } else {
      // provider 확인하고 kakao 아니면 변경
      if(user.provider !== PROVIDER.KAKAO) {
        user.provider = PROVIDER.KAKAO;
      }
    }
    
    // 우리 리프래쉬 토큰 생성
    const refreshToken = jwtUtil.generateRefreshToken(user);

    // 리프래쉬 토큰 저장
    user.refreshToken = refreshToken;
    await userRepository.save(t, user);

    return refreshToken;
  });

  // 카카오 로그아웃 처리
  const logoutRequest = socialKakaoUtil.getLogoutRequest(kakaoId, access_token);
  await axios.post(
    process.env.SOCIAL_KAKAO_API_URL_LOGOUT,
    logoutRequest.searchParams,
    { headers: logoutRequest.headers }
  );

  return refreshToken; // <= 우리 사이트의 리프래쉬 토큰
}

export default {
  login,
  logout,
  reissue,
  socialKakao,
}