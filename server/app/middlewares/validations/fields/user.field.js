/**
 * @file app/middlewares/validations/fields/user.field.js
 * @description 유저 정보 유효성 검사 필드
 * 251119 v1.0.0 김민현 초기 작성
 */
import { body, param } from "express-validator";
import PROVIDER from "../../auth/configs/provider.enum.js";
import fs from 'fs';
import pathUtil from "../../../utils/path/path.util.js";

// 이메일 필드
export const email = body('email')
  // express 내장 기능으로 간단하게 체크하기
  .trim()
  .notEmpty()
  .withMessage('이메일은 필수 항목입니다.')
  .bail()
  .isEmail()
  .withMessage('유효한 이메일을 입력해주세요.')
;

// 패스워드 필드
export const password = body('password')
  .trim()
  .notEmpty()
  .withMessage('비밀번호는 필수 항목입니다.')
  .bail()
  .matches(/^[a-zA-Z0-9!@#$]{8,20}$/) // 정규식 사용할 때 쓰는 메소드
  .withMessage('영어대소문자·숫자·!·@·#·$, 8~20자 허용')
;

// 비밀번호 체크
export const passwordChk = body('passwordChk')
  .trim()
  .custom((val, {req}) => {
    if(val !== req.body.password) {
      return false;
    }
    return true;
  })
  .withMessage('비밀번호와 같지 않습니다.')
;

// 닉네임 필드
export const nick = body('nick')
  .trim()
  .notEmpty()
  .withMessage('이름은 필수 항목입니다.')
  .bail()
  .matches(/^[가-힣a-zA-Z0-9!@#$_]{2,15}$/)
  .withMessage('한글·영어대소문자·숫자·!·@·#·$·_, 2~15자 허용')

// 프로필 이미지
export const profile = body('profile')
  .trim()
  .notEmpty()
  .withMessage('프로필은 필수 항목입니다.')
  .bail()
  .custom(val => {
    // 우리 앱의 프로필 이미지에 접근하는 `도메인 + path`가 맞는지 확인
    if(!val.startsWith(`${process.env.APP_URL}${process.env.ACCESS_FILE_USER_PROFILE_PATH}`)) {
      return false;
    }

    return true;
  })
  .withMessage('허용하지 않는 이미지 경로입니다.')
  .bail()
  // 실제 이미지 파일이 있는지 검증
  .custom(val => {
    const splitPath = val.split('/');
    const fullPath = path.join(pathUtil.getProfilesImagePath(), splitPath[splitPath.length - 1]);
    if(!fs.existsSync(fullPath)) {
      return false;
    }

    return true;
  })
  .withMessage('존재하지 않는 이미지 경로입니다.');

// --------------------------
// 한번에 객체에 담아 보내는 방법
// --------------------------
// const email = body('email')
//   // express 내장 기능으로 간단하게 체크하기
//   .notEmpty()
//   .withMessage('이메일은 필수 항목입니다.')
//   .bail()
//   .isEmail()
//   .withMessage('유효한 이메일을 입력해주세요.')
// ;

// const password = body('password')
//   .notEmpty()
//   .withMessage('비밀번호는 필수 항목입니다.')
//   .bail()
//   .matches(/^[a-zA-Z0-9!@#$]{8,20}$/) // 정규식 사용할 때 쓰는 메소드
//   .withMessage('영어대소문자·숫자·!·@·#·$, 8~20자 허용')
// ;

// export default {
//   email,
//   password
// }

export const provider = param('provider')
  .trim()
  .notEmpty()
  .withMessage('필수 항목입니다.')
  .bail()
  .custom(val => { // api/auth/social/'kakao or google' <= val
    return PROVIDER[val.toUpperCase()] ? true : false;
  })
  .withMessage('허용하지 않는 값입니다.')
;