/**
 * @file app/middlewares/validations/validators/users/registration.validator.js
 * @description 회원가입용 유효성 체크
 * 251205 v1.0.0 김민현 초기 작성
 */
import { email, password, passwordChk, nick, profile } from "../../fields/user.field.js";

export default [email, password, passwordChk, nick, profile];