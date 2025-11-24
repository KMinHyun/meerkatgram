/**
 * @file app/services/auth.service.js
 * @description auth Service
 * 251120 v1.0.0 김민현 초기 작성
 */
import { NOT_REGISTERED_ERROR } from "../../configs/responseCode.config.js";
import myError from "../errors/customs/my.error.js";
import userRepository from "../repositories/user.repository.js";
import bcrypt from 'bcrypt';

async function login(body) { // body : 유저가 넘겨준 데이터
  const { email, password } = body;
  
  // email로 유저 정보 획득
  const result = await userRepository.findByEmail(null, email);

  // 정보 획득 => 유저 존재 여부 체크
  if(!result) {
    throw myError('유저 없음', NOT_REGISTERED_ERROR);
  }

  // 유저 존재 체크 => 비밀번호 체크
  if(!bcrypt.compareSync(password, result.password)) {
    throw myError('비밀번호 틀림', NOT_REGISTERED_ERROR);
  }

  return result;
}

export default {
  login,
}