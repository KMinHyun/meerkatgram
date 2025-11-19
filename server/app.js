/**
 * @file app.js
 * @description Entry Point
 * 251117 v1.0.0 김민현
 */

import express from 'express';
import './configs/env.config.js';
import authRouter from './routes/auth.router.js';

const app = express();
app.use(express.json()); // JSON 요청에 대한 파싱 처리 미들웨어

// ----------
// 라우저 정의
// ----------
app.use('/api/auth', authRouter);

// -----------------------
// 해당 Port로 express 실행
// -----------------------
app.listen(parseInt(process.env.APP_PORT));