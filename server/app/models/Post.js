/**
 * @file app/models/Post.js
 * @description post model
 * 251120 v1.0.0 김민현 초기 작성
 */

import dayjs from "dayjs";
import { DataTypes } from "sequelize";

const modelName = 'Post';

const attributes = {
  id: {
    field: 'id',
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    comment: '게시글 PK'
  },
  userId: {
    field: 'user_id',
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    comment: '유저 PK'
  },
  content: {
    field: 'content',
    type: DataTypes.STRING(200),
    allowNull: false,
    comment: '내용'
  },
  image: {
    field: 'image',
    type: DataTypes.STRING(100),
    allowNull: true,
    defaultValue: null,
    comment: '이미지'
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
  tableName: 'posts', // 실제 DB 테이블명
  timestamps: true, // createdAt, updatedAt 자동 관리
  paranoid: true  // soft delete 설정(deletedAt 자동 관리)
}

const Post = {
  init: (sequelize) => {
    const define = sequelize.define(modelName, attributes, options);

    return define;
  },
  associate: () => {
    db.Post.belongsTo(db.User, { targetKey: 'id', foreignKey: 'userId', as: 'PostUser' });
    db.Post.hasMany(db.Like, { sourceKey: 'id', foriegnKey: 'userId', as: 'PostLike' });
    db.Post.hasMany(db.Comment, { sourceKey: 'id', foriegnKey: 'userId', as: 'PostLike' });
  }
}

export default Post;