/**
 * @file app/configs/responseCode.config.type.js
 * @description `configs/responseCode.config.js`에서 사용하는 타입 정의 파일
 * 251119 v1.0.0 김민현 초기 작성
 */

/**
 * 응답 코드 설정 객체 타입 (`configs/responseCode.config.js` 내에 정의된 상수만 사용)
 * @typedef {Object} ResponseCodeConfig <= 별칭 
 * @property {string} code <= 응답 코드
 * @property {string} msg <= 메시지
 * @property {string} info <= 응답 상세
 * @property {number} status <= HTTP Status
 */

export {}; // <= 빈 객체로 export 꼭 해줘야 다른 파일에서도 씀