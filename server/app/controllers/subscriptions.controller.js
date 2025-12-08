import { SUCCESS } from "../../configs/responseCode.config.js";
import subscriptionsService from "../services/subscriptions.service.js";
import { createBaseResponse } from "../utils/createBaseResponse.util.js";
createBaseResponse;

/**
 * @file app/controllers/subscriptions.controller.js
 * @description subscriptions 관련 컨트롤러
 * 251208 v1.0.0 김민현 초기 작성
 */
async function subscribe(req, res, next) {
  try {
    // 프론트에서 JSON에 담겨오는 정보
      // subscription의 구조 <= 푸시 서비스 정보
      // {
      //   endpoint: 'https://fcm.googleapis.com/fcm/send/dFlTq11Ly-w:...',
      //   expirationTime: null,
      //   keys: {
      //     p256dh: 'BD9B5KMdQbwgG7...',
      //     auth: 'OL56CZS...' <= 유저 접근 정보
      //   }
      // }
      // deviceInfo의 구조
      // {
      //   userAgent: navigator.userAgent,   // 유저의 브라우저/디바이스 정보
      //   language: navigator.language      // 언어 정보
      // }
    const { subscription, deviceInfo } = req.body;
    const userId = req.user.id; // <= role.permisson 빼먹지 않기. 빼먹으면 undefined 뜸.

    await subscriptionsService.subscribe({userId, subscription, deviceInfo});

    return res.status(SUCCESS.status).send(createBaseResponse(SUCCESS));
  } catch(error) {
    return next(error);
  }
}

export default {
  subscribe,
}