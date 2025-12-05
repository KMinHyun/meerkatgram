/**
 * @file app/services/users.service.js
 * @description users Service
 * 251205 v1.0.0 김민현 초기 작성
*/
import { CONFLICT_ERROR } from "../../configs/responseCode.config.js";
import myError from "../errors/customs/my.error.js";
import PROVIDER from "../middlewares/auth/configs/provider.enum.js";
import ROLE from "../middlewares/auth/configs/role.enum.js";
import userRepository from "../repositories/user.repository.js";
import bcrypt from 'bcrypt';

/**
 * 회원 가입 처리
 * @param {import("./users.service.type.js").userStoreData} data
 * @returns 
 */

async function store(data) {
  const { email, password, nick, profile } = data;

  return await db.sequelize.transaction(async t => {
    // 회원인지 체크
    const user = await userRepository.findByEmail(t, email);

    // 중복 유저 체크
    if(user) {
      throw myError('이메일 중복', CONFLICT_ERROR);
    }

    // 닉네임이 중복인지 체크

    // 가입 처리
      const createData = {
        email,
        password: bcrypt.hashSync(password, 10),
        nick,
        profile,
        role: ROLE.NORMAL,
        provider: PROVIDER.NONE,
      }

      user = await userRepository.create(t, createData);
  })
}

export default {
  store,
}