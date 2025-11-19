/**
 * @file configs/responseCode.config.js
 * @description 서비스 전역 응답 코드 설정 모듈(각 API 응답 시 참조되는 표준 응답 코드를 정의)
 * 251119 v1.0.0 김민현 초기 작성
 */

// ----------------
// type 파일 import
/**
 * @typedef {import('./responseCode.config.type.js').ResposeCodeConfig} ResposeCodeConfig
*/
// ----------------

/**
 * 정상 처리 응답 코드 설정
 * @type {ResposeCodeConfig}
 */
const SUCCESS = {
  code: '00',
  msg: 'NORMAL_CODE',
  info: '정상 처리',
  status: 200
}
Object.freeze(SUCCESS);

/**
 * 로그인 에러 응답 코드 설정
 * @type {ResposeCodeConfig}
 */
const NOT_REGISTERED_ERROR = {
  code: 'E01',
  msg: 'Unauthorized Error',
  info: '아이디 또는 비밀번호가 틀렸습니다.',
  status: 400
}
Object.freeze(NOT_REGISTERED_ERROR);

/**
 * 파라미터 에러 응답 코드 설정
 * @type {ResposeCodeConfig}
 */
const BAD_REQUEST_ERROR = {
  code: 'E21',
  msg: 'Bad Request Error',
  info: '요청 파라미터가 잘못되었습니다.',
  status: 400
}
Object.freeze(BAD_REQUEST_ERROR);

export {
  SUCCESS,
  NOT_REGISTERED_ERROR,
  BAD_REQUEST_ERROR
}