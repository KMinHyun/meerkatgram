/**
 * @file databases/migrations/20251118-07-fk-posts-user_id.js
 * @description Add fk on posts.user_id
 * 251118 v1.0.0 김민현 첫 작성
 */

/** @type {import('sequelize-cli').Migration} <= 리턴 타입 */
export default {
  // up : 마이그레이션 실행 시 호출되는 메소드(보통 스키마 생성 및 수정과 관련)
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint(
      'posts', // FK 생성할 테이블
      {
        fields: ['user_id'], // FK 부여할 컬럼 지정
        type: 'foreign key', // constraint 종류
        name: 'fk_posts_user_id', // constraint명 지정. constraint 종류_테이블명_컬럼명
        references: { // 참조 설정
          table: 'users', // 참조할 테이블
          field: 'id' // 참조 컬럼 지정
        },
        onDelete: 'CASCADE', // 참조 레코드가 삭제시, posts의 레코드도 같이 삭제
      }
    );
  },

    // down : 마이그레이션을 롤백 시 호출되는 메소드(보통 스키마 제거, 수정)
  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('posts', 'fk_posts_user_id');
  }
};
