/**
 * @file app/middlewares/validations/validators/posts/store.validator.js
 * @description 게시글 store 검사기
 * 251128 v1.0.0 김민현 초기 작성
 */
import { content, image } from "../../fields/post.field.js";

export default [content, image];