/**
 * @file app/services/auth.service.js
 * @description auth Service
 * 251120 v1.0.0 김민현 초기 작성
 */
import { NOT_REGISTERED_ERROR } from "../../configs/responseCode.config.js";
import myError from "../errors/customs/my.error.js";
import userRepository from "../repositories/user.repository.js";
import bcrypt from 'bcrypt';
import jwtUtil from "../utils/jwt/jwt.util.js";
import db from '../models/index.js'

async function login(body) { // body : 유저가 넘겨준 데이터
  // 트랜잭션 처리
  return await db.sequelize.transaction(async t => {
    const { email, password } = body;
    
    // email로 유저 정보 획득
    const user = await userRepository.findByEmail(t, email);
  
    // 정보 획득 => 유저 존재 여부 체크
    if(!user) {
      throw myError('유저 없음', NOT_REGISTERED_ERROR);
    }
  
    // 유저 존재 체크 => 비밀번호 체크
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


export default {
  login,
}