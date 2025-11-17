/**
 * @file configs/env.config.js <= 파일 경로 적어주는 속성
 * @description 환경에 따른 env 설정 파일 <= 파일 설명
 * 251117 v1.0.0 김민현 최초 생성 <= 날짜, 현재 버전, 작업자(사번), 어떤 작업 했는지
 */

import fs from 'fs';
import dotenv from 'dotenv';

const envFiles = [
  '.env.production',
  '.env.test',
  '.env'
];
let filePath = '';

// 'envFile' 루프 : 해당 파일이 있으면 파일 경로 저장
// ex) '.env.test, .env'가 있을 경우 최종적으로 '.env'를 세팅
// ex) '.env.test'만 있을 경우 최종적으로 '.env.test'를 세팅
// ex) '.env.production', '.env.test', '.env'가 있을 경우 최종적으로 '.env'를 세팅
for (const file of envFiles) {
  if(fs.existsSync(file)) { // <= 파일이 있는지 없는지 체크
    filePath = file;
  }
}

// 세팅된 filePath로 dotenv 설정
dotenv.config({
  path: filePath,
  debug: filePath === '.env' ? true : false
});
console.log(`Loaded env: ${filePath}`);