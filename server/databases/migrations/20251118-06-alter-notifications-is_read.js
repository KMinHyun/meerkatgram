/**
 * @file databases/migrations/20251118-06-alter-notifications-is_read.js
 * @description notifications-is_read change
 * 251118 v1.0.0 김민현 첫 작성
 */

import { DataTypes } from 'sequelize';

// 테이블 명
const tableName = 'notifications';

// 키명(컬럼명)
const key = 'is_read';

// 컬럼 정의
const upAttributes = {
  type: DataTypes.BOOLEAN,
  allowNull: false,
  defaultValue: false,
  comment: '읽음 여부'
}
const downAttributes = {
  type: DataTypes.TINYINT(1),
  allowNull: false,
  defaultValue: 0,
  comment: '읽음 여부'
}

/** @type {import('sequelize-cli').Migration} <= 리턴 타입 */
export default {
  // up : 마이그레이션 실행 시 호출되는 메소드(보통 스키마 생성 및 수정과 관련)
  async up (queryInterface, Sequelize) {
    // 컬럼 수정 : queryInterface.changeColumn(tableName, key, attributes, options) options는 생략 가능.
    await queryInterface.changeColumn(tableName, key, upAttributes);
  },

    // down : 마이그레이션을 롤백 시 호출되는 메소드(보통 스키마 제거, 수정)
  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn(tableName, key, downAttributes);
  }
};
