/**
 * @file app/controllers/auth.controller.js
 * @description 인증 관련 컨트롤러
 * 251119 v1.0.0 김민현 초기 작성
 */
import { REISSUE_ERROR, SUCCESS } from "../../configs/responseCode.config.js";
import myError from "../errors/customs/my.error.js";
import PROVIDER from "../middlewares/auth/configs/provider.enum.js";
import authService from "../services/auth.service.js";
import cookieUtil from "../utils/cookie/cookie.util.js";
import { createBaseResponse } from "../utils/createBaseResponse.util.js";
import socialKakaoUtil from "../utils/social/social.kakao.util.js";

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
  try {
    const body = req.body; // 파라미터 획득

    // 로그인 서비스 호출
    const { accessToken, refreshToken, user } = await authService.login(body);

    // Cookie에 RefreshToken 설정
    cookieUtil.setCookieRefreshToken(res, refreshToken);
  
    // return res.status(200).send(body); <= 규칙 정하기 전
    return res.status(SUCCESS.status).send(createBaseResponse(SUCCESS, {accessToken, user}));
  } catch(error) {
    next(error); // <= controller 다음은 app.js로 넘어감
  }
}

/**
 * 로그아웃 컨트롤러 처리
 * @param {import("express").Request} req - 리퀘스트 객체
 * @param {import("express").Response} res - 리스폰스 객체
 * @param {import("express").NextFunction} next - next 객체
 * @returns
 */
async function logout(req, res, next) {
  try {
    const id = req.user.id; // <= user = 우리가 만든 authMiddleware에서 생성되는 객체

    // 로그아웃 서비스 호출
    await authService.logout(id);

    // Cookie에 refreshToken 만료 처리
    cookieUtil.clearCookieRefreshToken(res);

    return res.status(SUCCESS.status).send(createBaseResponse(SUCCESS));
  } catch(error) {
    return next(error);
  }
}

/**
 * 토큰 재발급 컨트롤러 처리
 * @param {import("express").Request} req - 리퀘스트 객체
 * @param {import("express").Response} res - 리스폰스 객체
 * @param {import("express").NextFunction} next - next 객체
 * @returns
 */
async function reissue(req, res, next) {
  try {
    const token = cookieUtil.getCookieRefreshToken(req);

    // 토큰 존재 여부 확인
    if(!token) {
      throw myError('리프래쉬 토큰 없음', REISSUE_ERROR);
    }

    // 토큰 재발급 처리 <= 서비스에서 처리
    const { accessToken, refreshToken, user } = await authService.reissue(token);

    // 쿠키에 리프래쉬 토큰 설정
    cookieUtil.setCookieRefreshToken(res, refreshToken);

    return res.status(SUCCESS.status).send(createBaseResponse(SUCCESS, { accessToken, user }));
  } catch(error) {
    next(error);
  }
}

/**
 * 소셜 로그인 컨트롤러
 * @param {import("express").Request} req - 리퀘스트 객체
 * @param {import("express").Response} res - 리스폰스 객체
 * @param {import("express").NextFunction} next - next 객체
 * @returns
 */
async function social(req, res, next) {
  try {
    const provider = req.params.provider.toUpperCase(); // <= 유저가 보낸 세그먼트 파라미터 저장
    let url = '';

    // provider 검증
    switch(provider) {
      case PROVIDER.KAKAO:
        url = socialKakaoUtil.getAuthorizeURL();
        break;
      // case PROVIDER.GOOGLE:
      //   url = 'google';
    }

    return res.redirect(url); // 프론트로 응답 보낼 게 아니라 제공자에게 연결. 정확하게는 프론트로 응답을 보내는데, 제공자에게 연결하라는 명령어를 보내는 것.
  } catch(error) {
    next(error);
  }
}

/**
 * 소셜 로그인 콜백 컨트롤러
 * @param {import("express").Request} req - 리퀘스트 객체
 * @param {import("express").Response} res - 리스폰스 객체
 * @param {import("express").NextFunction} next - next 객체
 * @returns
 */
async function socialCallback(req, res, next) {
  try {
    const provider = req.params.provider.toUpperCase();
    let refreshToken = null;
    let code = null;

    switch(provider) {
      case PROVIDER.KAKAO:
        code = req.query?.code;
        refreshToken = await authService.socialKakao(code);
        break;
    }

    // Cookie에 RefreshToken 설정
    cookieUtil.setCookieRefreshToken(res, refreshToken);

    return res.redirect(process.env.SOCIAL_CLIENT_CALLBACK_URL); // send가 아니라 redirect인 이유는 이미 서버가 끊겨서 로그인 완료하면서 우리 창을 띄우려면 새로 화면을 렌더링해야 하기 때문에 요청을 보내야 함
  } catch(error) {
    next(error);
  }
}

// ---------------
//     export
// ---------------
export const authController = {
  login,
  logout,
  reissue,
  social,
  socialCallback,
};