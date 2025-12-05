/**
 * @file app/controllers/users.controller.js
 * @description 유저 관련 컨트롤러
 * 251205 v1.0.0 김민현 초기 작성
 */
import { SUCCESS } from "../../configs/responseCode.config.js";
import usersService from "../services/users.service.js";
import { createBaseResponse } from "../utils/createBaseResponse.util.js";

// ---------------------
//        public
// ---------------------
/**
 * 회원가입 작성 컨트롤러
 * @param {import("express").Request} req - 리퀘스트 객체
 * @param {import("express").Response} res - 리스폰스 객체
 * @param {import("express").NextFunction} next - next 객체
 * @returns
 */
async function store(req, res, next) {
  try {
    const data = {
      email: req.body.email,
      password: req.body.password,
      nick: req.body.nick,
      profile: req.body.profile,
    }

    const result = await usersService.store(data);

    return res.status(SUCCESS.status).send(createBaseResponse(SUCCESS));
  } catch(error) {
    next(error);
  }
}

export default {
  store,
}