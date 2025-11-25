/**
 * @file app/utils/cookie/cookie.util.js
 * @description Cookie 유틸리티
 * 251125 v1.0.0 김민현 초기 작성
 */
import dayjs from 'dayjs';

// -------------
//    private
// -------------
/**
 * 
 * @param {import("express").Response} res
 * @param {string} cookieName 
 * @param {string} cookieValue 
 * @param {number} ttl 
 * @param {boolean} httpOnlyFlg 
 * @param {boolean} secureFlg 
 */
function setCookie(res, cookieName, cookieValue, ttl, httpOnlyFlg = true, secureFlg = false) {
  res.cookie(
    cookieName,
    cookieValue,
    {
      expires: dayjs().add(ttl, 'millisecond').toDate(),
      httpOnly: httpOnlyFlg,
      secure: secureFlg,
      sameSite: 'none' // 도메인을 검증할지 말지 / 값이 lax = 같은 도메인 외 일부 경우에만 접근 가능 / strict = 같은 도메인만 접근 가능
    }
  );
}

// ------------
//    public
// ------------
/**
 * 쿠키에 리프래쉬 토큰을 설정
 * @param {import("express").Response} res 
 * @param {string} refreshToken 
 */
function setCookieRefreshToken(res, refreshToken) {
  setCookie(
    res,
    process.env.JWT_REFRESH_TOKEN_COOKIE_NAME,
    refreshToken,
    parseInt(process.env.JWT_REFRESH_TOKEN_COOKIE_EXPIRY),
    true,
    true
  );
}

export default {
  setCookieRefreshToken
}