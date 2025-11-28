/**
 * @file app/services/posts.service.js
 * @description posts service
 * 251128 v1.0.0 김민현 초기 작성
 */
import postRepository from "../repositories/post.repository.js";

async function pagination(page) {
  const limit = 6;
  const offset = limit * (page - 1);

  return await postRepository.pagination(null, { limit, offset });
}

async function show(id) {

  return await postRepository.findByPk(null, id);
}

export default {
  pagination,
  show,
}