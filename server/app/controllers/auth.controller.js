/**
 * @file app/controllers/auth.controller.js
 * @description 인증 관련 컨트롤러
 * 251119 v1.0.0 김민현 초기 작성
 */
import { SUCCESS } from "../../configs/responseCode.config.js";
import { createBaseResponse } from "../utils/createBaseResponse.util.js";

// ---------------------
//        public
// ---------------------
/**
 * 로그인 컨트롤러 처리
 * @param {import("express").Request} req - 리퀘스트 객체
 * @param {import("express").Response} res - 리스폰스 객체
 * @param {import("express").NextFunction} next - next 객체
 * @returns
 */
async function login(req, res, next) {
  const body = req.body;
  // return res.status(200).send(body); <= 규칙 정하기 전
  return res.status(SUCCESS.status).send(createBaseResponse(SUCCESS, body));
}

// ---------------
//     export
// ---------------
export const authController = {
  login
};