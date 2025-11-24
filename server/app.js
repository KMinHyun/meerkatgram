/**
 * @file app.js
 * @description Entry Point
 * 251117 v1.0.0 김민현
 */

import express from 'express';
import './configs/env.config.js';
import authRouter from './routes/auth.router.js';
import errorHandler from './app/errors/errorHandler.js';

const app = express();
app.use(express.json()); // JSON 요청에 대한 파싱 처리 미들웨어

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