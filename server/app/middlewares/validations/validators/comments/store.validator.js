/**
 * @file app/middlewares/validations/validators/comments/store.validator.js
 * @description 코멘트 작성 검사기
 * 251203 v1.0.0 김민현 초기 작성
 */
import { content, postId, replyId } from "../../fields/comment.field.js";

export default [postId, replyId, content];