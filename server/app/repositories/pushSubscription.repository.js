/**
 * @file app/repositories/pushSubscription.repository.js
 * @description pushSubscription Repository
 * 251208 v1.0.0 김민현 초기 작성
 */
import db from '../models/index.js';
const { PushSubscription } = db;

async function upsert(t = null, data) {
  return await PushSubscription.upsert(data, { transaction: t });
}

export default {
  upsert,
}