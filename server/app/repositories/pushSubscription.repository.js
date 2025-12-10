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

async function findByUserId(t = null, userId) {
  return await PushSubscription.findAll(
    {
      where: {
        userId: userId
      }
    },
    {
      transaction: t
    }
  )
}

async function hardDestroy(t = null, id) {
  return await PushSubscription.destroy({
    where: {id: id},
    force: true, // <= 하드딜리트 되도록 강제(paranoid 때문)
    transaction: t,
  });
}

export default {
  upsert,
  findByUserId,
  hardDestroy,
}