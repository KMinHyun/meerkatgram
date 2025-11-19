/**
 * @file app/middlewares/validations/validators/auth/login.validator.js
 * @description 로그인용 유효성 체크
 * 251119 v1.0.0 김민현 초기 작성
 */
import { email, password } from "../../fields/user.field.js";
// import userField from "../../fields/user.field.js" <= 객체로 보냈을 때 import

export default [email, password];
// export default [userField.email, userField.password] <= 객체로 보냈을 때 export