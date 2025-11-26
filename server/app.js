/**
 * @file app.js
 * @description Entry Point
 * 251117 v1.0.0 김민현
 */
import express from 'express';
import './configs/env.config.js';
import authRouter from './routes/auth.router.js';
import errorHandler from './app/errors/errorHandler.js';
import swaggerui from 'swagger-ui-express';
import SwaggerParser from 'swagger-parser';
import path from 'path'; // <= 경로를 가져오는데 도움 주는 툴(특정 경로나 상대 경로를 절대 경로로 가져오는 등)

const app = express();
app.use(express.json()); // JSON 요청에 대한 파싱 처리 미들웨어

// ------------
// Swagger 등록
// ------------
// swagger yaml 파일을 번들링
const swaggerDoc = await SwaggerParser.bundle(path.join(path.resolve(), 'swagger/swagger.yaml')); // <= path의 resolve메소드 : 절대 경로를 가져옴
// swagger ui 등록
app.use('/api-docs', swaggerui.serve, swaggerui.setup(swaggerDoc));

// ----------
// 라우터 정의
// ----------
app.use('/api/auth', authRouter);

// 에러 핸들러 등록 <= 제일 마지막에 실행되어야 함
app.use(errorHandler);

// -----------------------
// 해당 Port로 express 실행
// -----------------------
app.listen(parseInt(process.env.APP_PORT));