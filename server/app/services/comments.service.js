/**
 * @file app/services/comments.service.js
 * @description comments service
 * 251203 v1.0.0 김민현 초기 작성
 */
import commentRepository from "../repositories/comment.repository.js";
import db from '../models/index.js';
import postRepository from '../repositories/post.repository.js';
import userRepository from '../repositories/user.repository.js';
import pushSubscriptionRepository from "../repositories/pushSubscription.repository.js";
import webpush from '../../configs/webpush.config.js';

/**
 * 코멘트 작성 처리
 * @param {{postId: string, userId: string, content: string}} data
 */
async function store(data) {
  // 코멘트 작성
  const comment = await commentRepository.create(null, data);

  // 게시글 조회
  const post = await postRepository.findByPk(null, data.postId);

  // 내가 쓴 게시글인지 체크하고 타인의 게시글일 때만 푸시 보내기
  if(post.userId !== data.userId) {
    await db.sequelize.transaction(async t => {
      // 댓글 작성자 정보 획득
      const user = await userRepository.findByPk(t, data.userId);

      // 푸시 보낼 데이터 작성
      const payload = JSON.stringify({
        title: '새로운 댓글', // 푸시 제목
        message: `${user.nick}님께서 당신의 게시글에 댓글을 작성했습니다.`, // 푸시 내용
        data: { // 푸시 화면엔 출력 안 하지만 전달할 필요가 있는 데이터(ex: 푸시 눌렀을 때 해당 게시글 이동)
          targetUrl: `${process.env.APP_URL}${process.env.WEB_PUSH_FRONT_URL_POST_SHOW}/${data.postId}`,
        }
      });
  
      // 게시글 작성자의 푸시 정보 획득
      const pushSubscriptions = await pushSubscriptionRepository.findByUserId(t, post.userId);

      // 해당 푸시 발송
      // 목록이 여러개 올 수 있는데 그걸 하나하나 동기처리 하면 느려짐 => 병렬 처리
      const pushList = pushSubscriptions.map(async pushSubscription => {
        // subscription 구조
        const subscription = {
          endpoint: pushSubscription.endpoint,
          expirationTime: null,
          keys: {
            p256dh: pushSubscription.p256dh,
            auth: pushSubscription.auth  
          }
        };

        try {
          await webpush.sendNotification(subscription, payload);
        } catch(error) {
          // 만료된 푸시(endpoint) 제거
          if(error.statusCode === 410) {
            await pushSubscriptionRepository.hardDestroy(t, pushSubscription.id);
          }
        }
      }); // map 안에 비동기 처리를 넣으면 Promise 객체를 담은 채로 새로운 배열로 반환

      // 병렬 처리 완료 체크
      await Promise.allSettled(pushList);
    });
  }

  return comment;
}

export default {
  store,
}