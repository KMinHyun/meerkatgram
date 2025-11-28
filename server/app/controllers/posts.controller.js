/**
 * @file app/controllers/posts.controller.js
 * @description 게시글 관련 컨트롤러
 * 251128 v1.0.0 김민현 초기 작성
 */

import { SUCCESS } from "../../configs/responseCode.config.js";
import postsService from "../services/posts.service.js";
import { createBaseResponse } from "../utils/createBaseResponse.util.js";

// ---------------------
//        public
// ---------------------
/**
 * 게시글 리스트 조회 컨트롤러
 * @param {import("express").Request} req - 리퀘스트 객체
 * @param {import("express").Response} res - 리스폰스 객체
 * @param {import("express").NextFunction} next - next 객체
 * @returns
 */
async function index(req, res, next) {
  try {
    const page = req.body?.page || 1; // <= page를 optional로 줬기 때문

    const result = await postsService.pagination(page);

    return res.status(SUCCESS.status).send(createBaseResponse(SUCCESS, result));
  } catch(error) {
    return next(error);
  }
}

/**
 * 게시글 상세 조회 컨트롤러
 * @param {import("express").Request} req - 리퀘스트 객체
 * @param {import("express").Response} res - 리스폰스 객체
 * @param {import("express").NextFunction} next - next 객체
 * @returns
 */
async function show(req, res, next) {
  try {
    const result = await postsService.show(req.params.id);

    return res.status(SUCCESS.status).send(createBaseResponse(SUCCESS, result));
  } catch(error) {
    return next(error);
  }
}

export default {
  index,
  show,
}