/**
 * @file app/models/user.js
 * @description user model
 * 251120 v1.0.0 김민현 초기 작성
 */
import dayjs from 'dayjs';
import { DataTypes } from 'sequelize';

const modelName = 'User'; // 모델명(JS(=프로그래밍단) 내부에서 사용)

const attributes = {
  id: {
    field: 'id',
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    comment: '유저 PK'
  },
  email: {
    field: 'email',
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    comment: '이메일(로그인 ID)'
  },
  password: {
    field: 'password',
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: '비밀번호'
  },
  nick: {
    field: 'nick',
    type: DataTypes.STRING(15),
    allowNull: false,
    unique: true,
    comment: '닉네임'
  },
  provider: {
    field: 'provider',
    type: DataTypes.STRING(10),
    allowNull: false,
    comment: '로그인 제공자(NONE, KAKAO, GOOGLE...)'
  },
  role: {
    field: 'role',
    type: DataTypes.STRING(10),
    allowNull: false,
    comment: '유저 권한(NORMAL, SUPER...)'
  },
  profile: {
    field: 'profile',
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: '유저 프로필'
  },
  refreshToken: {
    field: 'refresh_token',
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: '리프레쉬 토큰'
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
  tableName: 'users', // 실제 DB 테이블명
  timestamps: true, // createdAt, updatedAt 자동 관리
  paranoid: true  // soft delete 설정(deletedAt 자동 관리)
}

const User = {
  init: (sequelize) => {
    const define = sequelize.define(modelName, attributes, options);

    // JSON으로 serialize시, 제외할 컬럼을 지정하는 법
    define.prototype.toJSON = function() { // <= 재정의(오버라이트)
      const attributes = this.get(); // <= 내가 가진 컬럼 프로퍼티 다 가져옴
      delete attributes.password;
      delete attributes.refreshToken;

      return attributes;
    }

    return define;
  },
  associate: (db) => {
    db.User.hasMany(db.Post, { sourceKey: 'id', foreignKey: 'userId', as: 'userPosts' });
    db.User.hasMany(db.Comment, { sourceKey: 'id', foreignKey: 'userId', as: 'userComments' });
    db.User.hasMany(db.Like, { sourceKey: 'id', foreignKey: 'userId', as: 'userLikes' });
    db.User.hasMany(db.Notification, { sourceKey: 'id', foreignKey: 'userId', as: 'userNotifications' });
    db.User.hasMany(db.PushSubscription, { sourceKey: 'id', foreignKey: 'userId', as: 'userPushSubscriptions' });
  }
}

export default User;