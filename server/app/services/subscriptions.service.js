/**
 * @file app/services/subscriptions.service.js
 * @description subscriptions service
 * 251208 v1.0.0 김민현 초기 작성
 */

import pushSubscriptionRepository from "../repositories/pushSubscription.repository.js";

async function subscribe(params) {
  const { userId, subscription, deviceInfo } = params;
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
  const { endpoint, keys } = subscription;
  const { userAgent } = deviceInfo;

  const data = {
    userId: userId,
    endpoint: endpoint,
    p256dh: keys.p256dh,
    auth: keys.auth,
    device: userAgent,
  }

  return await pushSubscriptionRepository.upsert(null, data);
}

export default {
  subscribe,
}