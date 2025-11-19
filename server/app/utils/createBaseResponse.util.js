/**
 * @file app/utils/createBaseResponse.util.js
 * @description 공통 응답 형식을 생성하는 유틸리티
 * 251119 v1.0.0 김민현 초기 작성
 */

/**
 * 기본 응답 객체 생성
 * @param {import("../../configs/responseCode.config.type.js").ResposeCodeConfig} codeInfo <= 응답 코드 설정 객체
 * @param {null|[]|{}} data
 * @returns {import("./createBaseResponse.util.type.js").createBaseResponse} <= 최종 응답 객체
 */
export function createBaseResponse(codeInfo, data = null) {
  // codeInfo = responseCode.config의 객체
  const responseData = {
    code: codeInfo.code,
    msg: codeInfo.info
  }

  if(data) {
    responseData.data = data;
  }

  return responseData;
}