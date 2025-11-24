/**
 * @file app/errors/errorHandler.js
 * @description 에러 핸들러
 * 251124 v1.0.0 김민현 초기 작성
 */
import { BaseError } from "sequelize";
import { DB_ERROR, SYSTEM_ERROR } from "../../configs/responseCode.config.js";
import { createBaseResponse } from "../utils/createBaseResponse.util.js";
import { logger } from "../middlewares/loggers/winston.logger.js";

/**
 * 에러 핸들러
 * 모든 에러는 'codeInfo' 포로퍼티를 포함하고 있을 것
 * 파라미터로 전달 받은 에러 객체에 'codeInfo'가 없을 경우, DB 에러|시스템 에러 설정
 * 이때, 'codeInfo'는 import("responseCode.config.type.js").ResponseCodeConfig 참조
 * @param {Error} err 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 * @returns 
 */
export default function errorHandler(err, req, res, next) {
  // sequelize에서 난 에러 처리
  if(err instanceof BaseError) { // <= err가 BaseError 타입인지 체크
    err.codeInfo = DB_ERROR; // <= codeInfo는 비어있음. Sequelize에서 발생한 에러이기 때문.
  }

  // 예기치 못한 에러 발생 처리 => 
  if(!err.codeInfo) {
    err.codeInfo = SYSTEM_ERROR;
  }

  // 시스템 에러 및 DB에러일 경우, 로그 출력
  if(err.codeInfo.code === SYSTEM_ERROR.code || err.codeInfo.code === DB_ERROR.code)   {
    logger.error(`${err.name}: ${err.message}\n${err.stack}`);
  }

  // 개발 모드일 경우 콘솔로 에러 로그 출력(일일이 파일 찾아 확인하지 않고 터미널에서 손쉽게 확인하기 위함)
  if(process.env.APP_MODE === 'development') {
    console.log(err.stack); // stack = 에러의 상세 정보
  }

  return res.status(err.codeInfo.status).send(createBaseResponse(err.codeInfo));
}