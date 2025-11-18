/**
 * @file databases/migrations/20251118-10-fk-likes-post_id.js
 * @description Add fk on likes.post_id
 * 251118 v1.0.0 김민현 초기 작성
 */

// 테이블 명
const tableName = 'likes';

// Constraint명
const constraintName = 'fk_likes_post_id';

// Constraint 정의
const options = {
  fields: ['post_id'], // FK 부여할 컬럼 지정
  type: 'foreign key', // constraint 종류
  name: constraintName, // constraint명 지정. constraint 종류_테이블명_컬럼명
  references: { // 참조 설정
    table: 'posts', // 참조할 테이블
    field: 'id' // 참조 컬럼 지정
  },
  onDelete: 'CASCADE', // 참조 레코드가 삭제시, posts의 레코드도 같이 삭제
}

/** @type {import('sequelize-cli').Migration} <= 리턴 타입 */
export default {
  // up : 마이그레이션 실행 시 호출되는 메소드(보통 스키마 생성 및 수정과 관련)
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint(tableName, options);
  },

    // down : 마이그레이션을 롤백 시 호출되는 메소드(보통 스키마 제거, 수정)
  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint(tableName, constraintName);
  }
};
