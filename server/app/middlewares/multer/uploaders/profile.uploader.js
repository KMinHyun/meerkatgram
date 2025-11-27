/**
 * @file app/middlewares/multer/uploaders/profile.uploader.js
 * @description 프로필 이미지 업로더
 * 251127 v1.0.0 김민현 초기 작성
 */
import multer from 'multer';
import fs from 'fs';
import dayjs from 'dayjs';
import myError from '../../../errors/customs/my.error.js';
import { BAD_FILE_ERROR } from '../../../../configs/responseCode.config.js';
/**
 * 프로필 이미지 업로더 처리하는 미들웨어
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
export default function(req, res, next) {
  // multer 객체 인스턴스
  const upload = multer({
    storage: multer.diskStorage({
      // 파일 저장 경로 설정
      destination(req, file, callback) {
        // 저장 디렉토리 설정
        if(!fs.existsSync(process.env.FILE_USER_PROFILE_PATH)) {
          // 해당 디렉토리 있는지 체크후 없으면 생성 처리
          fs.mkdirSync(
            process.env.FILE_USER_PROFILE_PATH,
            { // 파일 어떻게 만들지 설정
              recursive: true, 
              mode: 0o755
            }
          );
        }
        callback(null, process.env.FILE_USER_PROFILE_PATH);
      },
      // 파일명 설정
      filename(req, file, callback) {
        // file = 유저가 전달한 파일 객체
        // 저장할 파일명 생성
        const uniqueFileName = `${dayjs().format('YYYYMMDD')}_${crypto.randomUUID()}`;
        const fileNameParts = file.originalname.split('.');
        const extension = fileNameParts[fileNameParts.length - 1].toLowerCase(); // 유저가 보내온 파일명 안에 '.'이 여러개 있을 수도 있기 때문

        callback(null, `${uniqueFileName}.${extension}`);
      }
    }),
    fileFilter(req, file, callback) {
      if(!file.mimetype.startsWith('image/')) {
        return callback(myError('이미지 파일 아님'), BAD_FILE_ERROR);
      }
      callback(null, true);
    },
    limits: {
      fileSize: parseInt(process.env.FILE_USER_PROFILE_SIZE),
    }
  }).single('image');


  // 예외 처리(멀터가 에러가 생겨도 에러 핸들러로 바로 못 찾아감)
  upload(req, res, err => {
    if(err instanceof multer.MulterError || err) {
      next(myError(err.message, BAD_FILE_ERROR));
    }
    next();
  });
}