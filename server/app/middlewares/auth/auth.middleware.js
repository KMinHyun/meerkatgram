/**
 * @file app/middlewares/auth/auth.middleware.js
 * @description 인증 및 인가 처리 미들웨어
 * 251126 v1.0.0 김민현 초기 작성
 */
import { FORBIDDEN_ERROR } from "../../../configs/responseCode.config.js";
import myError from "../../errors/customs/my.error.js";
import jwtUtil from "../../utils/jwt/jwt.util.js";
import ROLE_PERMISSIONS from "./configs/role.permissions.js";

// ------------
//    private
// ------------
/**
 * 토큰 검증 및 Request에 유저 정보 추가
 * @param {import("express").Request} req 
 */
function authenticate(req) {
  // 토큰 획득
  const token = jwtUtil.getBearerToken(req);
  // 토큰의 payload를 가져와서 유저 있는지 없는지 체크 후 req 객체에 유저 권한 세팅

  // 토큰 검증 및 피에로드 획득
  const claims = jwtUtil.getClaimsWithVerifyToken(token);

  // Request 객체에 사용자 정보를 추가
  req.user = {
    id: parseInt(claims.sub),
    role: claims.role
  }
}

/**
 * 인증 및 권한 체크
 * @param {import("express").Request} req 
 */
function authorize(req) {
  // 요청에 맞는 권한 규칙 조회
  const matchRole = ROLE_PERMISSIONS[req.method].find(item => {
    return item.path.test(`${req.baseUrl}${req.path}`);
  }); // <= req의 method : HTTP메소드 / item의 path : 정규식이 담김 / test 메소드 : item.path와 req.path가 일치하는지 체크

  // 일치하는 규칙이 있을 시, 인증 및 권한 체크를 실시
  if(matchRole) {
    // 인증 체크 및 인증 정보를 Request Set
    authenticate(req);
    
    // 권한 체크
    const userRole = req.user?.role;
    if(!userRole || !matchRole.roles.includes(userRole)) {
      throw myError('권한 부족', FORBIDDEN_ERROR);
    }
  }
}

// -------------
//    public
// -------------
export default function(req, res, next) {
  try {
    authorize(req);

    return next();
  } catch(error) {

    return next(error);
  }
}