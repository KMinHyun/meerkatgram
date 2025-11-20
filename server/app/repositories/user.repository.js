/**
 * @file app/repositories/user.repository.js
 * @description User Repository
 * 251120 v1.0.0 김민현 초기 작성
 */
import db from '../models/index.js'
const { User } = db;

async function findByEmail(transaction = null, email) { // transaction 약어로 `t` 로 많이 적음
  return await User.findOne(
    {
      where: {
        email: email
      }
    },
    {
      transaction: transaction
    }
  );
}

export default {
  findByEmail,
}