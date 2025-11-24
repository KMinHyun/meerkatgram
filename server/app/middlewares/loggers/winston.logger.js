/**
 * @file app/middlewares/loggers/winston.logger.js
 * @description winston logger
 * 251124 v1.0.0 김민현 초기 작성
 */
import winston from "winston";
import dayjs from 'dayjs';

// --------
// private 
// --------
// 커스텀 포맷 작성
const customFormat = winston.format.printf(({message, level}) => {
  // 출력 양식 [2025-11-24 10:12:50] level - message
  const now = dayjs().locale(process.env.APP_TZ).format('YYYY-MM-DD HH:mm:ss');
  return `[${now}] ${level} - ${message}`;
}); // printf는 최종적으로 string 반환

// -------
// public
// -------
// 범용 로거 인스턴스
export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL, // 로그 레벨 제한 = 최소 로그 레벨 설정
  format: winston.format.combine(
    customFormat 
  ),
  transports: [ // 로그를 출력하는 관리 설정(파일로 출력할래? 콘솔로 출력할래? 파일로 출력할 거면 어떤 레벨로 설정할래?)
    new winston.transports.File({
       filename: `${process.env.LOG_BASE_PATH}/${dayjs().locale(process.env.APP_TZ).format('YYYYMMDD')}_${process.env.LOG_FILE_NAME}`, // 파일명
      //  level: 'error' // 파일 작성 로그 레벨 제한 = 위 파일을 생성할 때 레벨을 error로 설정하겠다
      }),
      // new winston.transports.Console({
      //   level: PerformanceObserverEntryList.env.LOG_LEVEL
      // })
  ]
});

