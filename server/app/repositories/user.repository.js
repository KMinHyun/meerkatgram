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

async function create(t = null, data) {
  return await User.create(data, { transaction: t });
}

async function logout(t = null, id) {
  // 특정 유저 리프래쉬토큰 null로 갱신
  return await User.update(
    {
      refreshToken: null,
    },
    {
      where: {
        id: id // 앞 id는 컬럼, 뒤 id는 파라미터로 받은 id
      },
      transaction: t
    }
  );

  // UPDATE users SET refresh_token = null updated_at = NOW() WHERE id = ?
    // ┌>JS에서 쿼리 평문 작성법
    // const query = 
    //   ' UPDATE users '
    //   + ' SET '
    //   + ' refresh_token = null '
    //   + ' updated_at = NOW() '
    //   + ' WHERE '
    //   +  ' id = ? '
    //  ;

    // db.sequelize.query({
    //   query: 'UPDATE users SET refresh_token = null updated_at = NOW() WHERE id = ?',
    //   values: [id]
    // });

}

export default {
  findByEmail,
  save,
  findByPk,
  create,
  logout,
}