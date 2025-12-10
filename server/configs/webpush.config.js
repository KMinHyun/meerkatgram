import webpush from 'web-push';

webpush.setVapidDetails(
  `mailto:${process.env.JWT_ISSUER}`, // <= 발급자
  process.env.VAPID_PUBLIC_KEY, // <= 퍼블릭 키
  process.env.VAPID_PRIVATE_KEY, // <= 프라이빗 키
);

export default webpush;