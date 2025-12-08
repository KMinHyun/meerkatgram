import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst, NetworkFirst, StaleWhileRevalidate } from 'workbox-strategies';

const PREFIX = import.meta.env.VITE_APP_NAME;

// -------------------------
// 정적 파일 캐싱
// -------------------------
precacheAndRoute(self.__WB_MANIFEST);

// -------------------------
// HTML 오프라인 대응
// -------------------------
registerRoute(
  ({request}) => request.mode === 'navigate',
  new NetworkFirst({
    cacheName: `${PREFIX}-html-cache`,
    networkTimeoutSeconds: 3,
  })
);
// -------------------------
// 이미지 캐싱 <= 유저들이 사용한 이미지
// -------------------------
registerRoute(
  ({request}) => request.destination === 'image',
  new CacheFirst({
    cacheName: `${PREFIX}-image-cache`,
    networkTimeoutSeconds: 3,
  })
);

// -------------------------
// API 요청 캐싱(최소 동작 보장을 위함, GET을 제외한 메소드에서는 제외)
// -------------------------
registerRoute(
  ({request, url}) => url.origin === import.meta.env.VITE_SERVER_URL && request.method === 'GET',
  new StaleWhileRevalidate({
    cacheName: `${PREFIX}-api-cache`,
    networkTimeoutSeconds: 3,
  })
);