/**
 * @file app/middlewares/multer/uploaders/post.uploader.js
 * @description 게시글 이미지 업로더
 * 251127 v1.0.0 김민현 초기 작성
 */
import multer from 'multer';
import fs from 'fs';
import dayjs from 'dayjs';
import myError from '../../../errors/customs/my.error.js';
import { BAD_FILE_ERROR } from '../../../../configs/responseCode.config.js';
/**
 * 게시글 이미지 업로더 처리하는 미들웨어
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
export default function(req, res, next) {
  // multer 객체 인스턴스
  const upload = multer({
    // storage: 파일을 저장할 위치를 상세하게 제어하는 프로퍼티
    // fileFilter: 파일들 필터링(유효성 체크) 처리를 제어하는 프로퍼티
    // limits: 파일 사이즈 제한, 파일 갯수 제한, 멀티 파티의 키와 밸류 갯수 제한 설정
    storage: multer.diskStorage({
      // 경로 설정과 파일명 유니크하게 설정
      // 파일 저장 경로 설정
      destination(req, file, callback) {
        // 저장 디렉토리 설정
        if(!fs.existsSync(process.env.FILE_POST_IMAGE_PATH)) {
          // 해당 디렉토리 있는지 체크후 없으면 생성 처리
          fs.mkdirSync(
            process.env.FILE_POST_IMAGE_PATH,
            { // 파일 어떻게 만들지 설정
              recursive: true, // 중간 디렉토리까지 모두 생성
              mode: 0o755 // 권한 설정 rwxr(생성자)-xr(그룹)-x(기타)
            }
          );
        }
        callback(null, process.env.FILE_POST_IMAGE_PATH); // 멀터 내장된 콜백 함수. 첫번째 파라미터에 null이 들어가면 다음 처리로 멀터가 알아서 넘어감.next()와 같은 기능. error가 들어가면 error를 발생시킴.
      },
      // 파일명 설정
      filename(req, file, callback) {
        // file = 유저가 전달한 파일 객체
        // 저장할 파일명 생성
        const uniqueFileName = `${dayjs().format('YYYYMMDD')}_${crypto.randomUUID()}`;
        const fileNameParts = file.originalname.split('.'); // originalname엔 유저가 보낸 파일 이름과 확장자까지 포함돼있음
        const extension = fileNameParts[fileNameParts.length - 1].toLowerCase(); // 유저가 보내온 파일명 안에 '.'이 여러개 있을 수도 있기 때문

        callback(null, `${uniqueFileName}.${extension}`);
      }
    }),
    fileFilter(req, file, callback) {
      if(!file.mimetype.startsWith('image/')) {
        return callback(myError('이미지 파일 아님'), BAD_FILE_ERROR);
      }
      callback(null, true); // 두번째 파라미터는 통과했냐 아니냐만 체크하면 됨
    },
    limits: {
      fileSize: parseInt(process.env.FILE_POST_IMAGE_SIZE),
    }
  }).single('image');
  // single의 키를 읽어가지고 멀터가 각각의 옵션에 맞춰 제어

  // 예외 처리(멀터가 에러가 생겨도 에러 핸들러로 바로 못 찾아감)
  upload(req, res, err => {
    if(err instanceof multer.MulterError || err) {
      next(myError(err.message, BAD_FILE_ERROR));
    }
    next();
  });
}