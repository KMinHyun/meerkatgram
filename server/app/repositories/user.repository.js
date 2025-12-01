/**
 * @file app/repositories/user.repository.js
 * @description User Repository
 * 251120 v1.0.0 김민현 초기 작성
 */
import db from '../models/index.js'
const { User } = db;

/**
 * 이메일로 유저 검색
 * @param {import("sequelize").Transaction} transaction 
 * @param {string} email 
 * @returns 
 */
async function findByEmail(transaction = null, email) { // transaction 약어로 `t` 로 많이 적음
  return await User.findOne(
    {
      where: {
        email: email
      },
      transaction: transaction
    }
  );
}

/**
 * 유저 모델 인스턴스로 save 처리
 * @param {import("sequelize").Transaction} t 
 * @param {import("../models/index.js").User} user 
 * @returns 
 */
async function save(t = null, user) {
  return await user.save({ transaction: t });
}

/**
 * 유저id로 조회
 * @param {import("sequelize").Transaction} t 
 * @param {number} id
 * @returns {Promise<import("../models/User.js").User>}
 */
async function findByPk(t = null, id) {
  return await User.findByPk(id, { transaction:t });
}

export default {
  findByEmail,
  save,
  findByPk,
}