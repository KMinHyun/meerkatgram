/**
 * @file databases/migrations/20251118-04-create-notifications.js
 * @description notifications migration file
 * 251118 v1.0.0 김민현 첫 작성
 */

import { DataTypes } from 'sequelize';

// 테이블 명
const tableName = 'notifications';

// 컬럼 정의
const attributes = {
  id: {
    field: 'id',
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    comment: '알림 PK'
  },
  userId: {
    field: 'user_id',
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    comment: '유저 PK'
  },
  title: {
    field: 'title',
    type: DataTypes.STRING(200),
    allowNull: false,
    comment: '제목'
  },
  content: {
    field: 'content',
    type: DataTypes.STRING(1000),
    allowNull: false,
    comment: '내용'
  },
  isRead: {
    field: 'is_read',
    type: DataTypes.TINYINT(1),
    allowNull: false,
    defaultValue: 0,
    comment: '읽음 여부'
  },
  createdAt: {
    field: 'created_at',
    type: DataTypes.DATE,
    allowNull: true,
  },
  updatedAt: {
    field: 'updated_at',
    type: DataTypes.DATE,
    allowNull: true,
  },
  deletedAt: {
    field: 'deleted_at',
    type: DataTypes.DATE,
    allowNull: true,
  }
}

// 옵션 설정
const options = {
  charset: 'utf8mb4', // 테이블 문자셋 설정 (이모지 지원)
  collate: 'utf8mb4_0900_ai_ci', // 정렬 방식 설정 (기본 설정)
  engine: 'InnoDB' // 사용 엔진 설정
}

/** @type {import('sequelize-cli').Migration} <= 리턴 타입 */
export default {
  // up : 마이그레이션 실행 시 호출되는 메소드(보통 스키마 생성 및 수정과 관련)
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(tableName, attributes, options);
  },

    // down : 마이그레이션을 롤백 시 호출되는 메소드(보통 스키마 제거, 수정)
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(tableName);
  }
};
