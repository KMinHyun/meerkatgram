/**
 * @file app/controllers/comments.controller.js
 * @description 코멘트 관련 컨트롤러
 * 251203 v1.0.0 김민현 초기 작성
 */
import { SUCCESS } from "../../configs/responseCode.config.js";
import { createBaseResponse } from "../utils/createBaseResponse.util.js";
import commentsService from '../services/comments.service.js';

// ---------------------
//        public
// ---------------------
/**
 * 코멘트 작성 컨트롤러
 * @param {import("express").Request} req - 리퀘스트 객체
 * @param {import("express").Response} res - 리스폰스 객체
 * @param {import("express").NextFunction} next - next 객체
 * @returns
 */
async function store(req, res, next) {
  try {
    const data = {
      postId: req.body.postId,
      userId: req.user.id,
      replyId: req.body.replyId,
      content: req.body.content,
    }

    const result = await commentsService.store(data);

    return res.status(SUCCESS.status).send(createBaseResponse(SUCCESS, result));
  } catch(error) {
    next(error);
  }
}

export default {
  store,
}