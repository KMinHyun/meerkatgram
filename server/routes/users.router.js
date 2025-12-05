/**
 * @file routes/users.router.js
 * @description 회원가입 관련 라우터
 * 251205 v1.0.0 김민현 초기 작성
 */
import express from 'express';
import authMiddleware from '../app/middlewares/auth/auth.middleware.js';
import usersController from '../app/controllers/users.controller.js';
import storeValidator from '../app/middlewares/validations/validators/users/store.validator.js';
import validationHandler from '../app/middlewares/validations/validationHandler.js';

const usersRouter = express.Router();

usersRouter.post('/', storeValidator, validationHandler, usersController.store);

export default usersRouter;