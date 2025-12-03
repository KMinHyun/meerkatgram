/**
 * @file app/services/comments.service.js
 * @description comments service
 * 251203 v1.0.0 김민현 초기 작성
 */
import commentRepository from "../repositories/comment.repository.js"

/**
 * 코멘트 작성 처리
 * @param {{postId: string, userId: string, content: string}} data
 */
async function store(data) {
  return await commentRepository.create(null, data);
}

export default {
  store,
}