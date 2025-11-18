/**
 * @file databases/seeders/dummy-users.seeder.js
 * @description users table dummy data create
 * 251118 v1.0.0 김민현 첫 작성
 */
import bcrypt from 'bcrypt'; // 암호화해주는 node.js 내장 기능

// 테이블명
const tableName = 'users';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    // 레코드 정보
    const records = [
      {
        email: 'admin@admin.com',
        password: await bcrypt.hash('administer', 10), // bcrypt: 단방향 암호화 문법. 복호화 안 됨. 비동기 처리라 await 필요.
        nick: '미어캣',
        provider: 'NONE',
        role: 'SUPER',
        profile: '',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        email: 'admin2@admin.com',
        password: bcrypt.hashSync('administer', 10), // hashSync : await 없이 동기처리로 해줌
        nick: '미어캣2',
        provider: 'KAKAO',
        role: 'NORMAL',
        profile: '',
        created_at: new Date(),
        updated_at: new Date()
      }
    ];

    // 데이터 생성 : queryInterface.bulkInsert(tableName, records, options)
    await queryInterface.bulkInsert(tableName, records, {}); // options 없으면 안 적어주거나 빈 객체 넣어주면 됨
  },

  async down (queryInterface, Sequelize) {
    // 데이터 삭제 : queryInterface.bulkDelete(tableName, records, options)
    await queryInterface.bulkDelete(tableName, null, {});
  }
};
