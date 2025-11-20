/**
 * @file app/models/Like.js
 * @description Like model
 * 251120 v1.0.0 김민현 초기 작성
 */
import dayjs from "dayjs";
import { DataTypes } from "sequelize";

const modelName = 'Like';

const attributes = {
  id: {
    field: 'id',
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    comment: '좋아요 PK'
  },
  userId: {
    field: 'user_id',
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    comment: '유저 PK'
  },
  postId: {
    field: 'post_id',
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    comment: '게시글 PK'
  },
  createdAt: {
    field: 'created_at',
    type: DataTypes.DATE,
    allowNull: true,
    comment: '작성일',
    get() {
      const val = this.getDataValue('createdAt');
      if(!val) {
        return null;
      }
      return dayjs(val).format('YYYY-MM-DD HH:mm:ss');
    }
  },
  updatedAt: {
    field: 'updated_at',
    type: DataTypes.DATE,
    allowNull: true,
    comment: '수정일',
    get() {
      const val = this.getDataValue('updatedAt');
      if(!val) {
        return null;
      }
      return dayjs(val).format('YYYY-MM-DD HH:mm:ss');
    }
  },
  deletedAt: {
    field: 'deleted_at',
    type: DataTypes.DATE,
    allowNull: true,
    comment: '삭제일',
    get() {
      const val = this.getDataValue('deletedAt');
      if(!val) {
        return null;
      }
      return dayjs(val).format('YYYY-MM-DD HH:mm:ss');
    }
  }
}

const options = {
  tableName: 'likes', // 실제 DB 테이블명
  timestamps: true, // createdAt, updatedAt 자동 관리
  paranoid: true  // soft delete 설정(deletedAt 자동 관리)
}

const Like = {
  init: (sequelize) => {
    const define = sequelize.define(modelName, attributes, options);

    return define;
  }
}

export default Like;