/**
 * @file app/controllers/files.controller.js
 * @description 파일 업로드 관련 컨트롤러
 * 251127 v1.0.0 김민현 초기 작성
 */
import { BAD_FILE_ERROR, SUCCESS } from "../../configs/responseCode.config.js";
import myError from "../errors/customs/my.error.js";
import { createBaseResponse } from "../utils/createBaseResponse.util.js";

// ---------------------
//        public
// ---------------------
/**
 * 게시글 이미지 업로드 컨트롤러 처리
 * @param {import("express").Request} req - 리퀘스트 객체
 * @param {import("express").Response} res - 리스폰스 객체
 * @param {import("express").NextFunction} next - next 객체
 * @returns
 */
async function storePost(req, res, next) {
  try {
    // 파일 여부 확인
    if(!req.file) {
      throw myError('파일 없음', BAD_FILE_ERROR);
    }

    const result = {
      path: `${process.env.APP_URL}${process.env.ACCESS_FILE_POST_IMAGE_PATH}/${req.file.filename}`
    }
    return res.status(SUCCESS.status).send(createBaseResponse(SUCCESS, result));
  } catch(error) {
    next(error);
  }
}

/**
 * 유저 프로필 업로드 컨트롤러 처리
 * @param {import("express").Request} req - 리퀘스트 객체
 * @param {import("express").Response} res - 리스폰스 객체
 * @param {import("express").NextFunction} next - next 객체
 * @returns
 */
async function storeProfile(req, res, next) {
  try {
    // 파일 여부 확인
    if(!req.file) {
      throw myError('파일 없음', BAD_FILE_ERROR);
    }

    const result = {
      path: `${process.env.APP_URL}${process.env.ACCESS_FILE_USER_PROFILE_PATH}/${req.file.filename}`
    }
    return res.status(SUCCESS.status).send(createBaseResponse(SUCCESS, result));
  } catch(error) {
    next(error);
  }
}

export default {
  storePost,
  storeProfile
}