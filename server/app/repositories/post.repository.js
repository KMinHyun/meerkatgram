/**
 * @file app/repositories/post.repository.js
 * @description Post Repository
 * 251128 v1.0.0 김민현 초기 작성
 */
import db from '../models/index.js';
const { sequelize, Post, Comment } = db;

async function pagination(t = null, data) {
  return await Post.findAll(
    {
      order: [
        ['createdAt', 'DESC'],
        ['updatedAt', 'DESC'],
        ['id', 'ASC'],
      ],
      limit: data.limit,
      offset: data.offset,
    },
    {
      transaction: t,
    }
  );
}

async function findByPk(t= null, id) {
  return await Post.findByPk(
    id,
    {
      include: [
        {
          model: Comment,
          as: 'postComments', // <= Model에서 관계 정의할 때 썼던 alis 
          where: {
            replyId: 0,
          },
          required: false, // Left Join 설정 : 댓글이 있을 때나 없을 때나 게시글을 가져와야 하기 때문에 레프트 조인을 위함. default가 Inner Join.
        }
      ],
      transaction: t
    }
  );
}

export default {
  pagination,
  findByPk,
}