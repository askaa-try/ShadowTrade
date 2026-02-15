const aleoService = require('./aleoService');
const db = require('../database/inMemoryDB');

class SubscriptionService {
  async create(userId, data) {
    const { strategyId, duration, provider, price } = data;

    // Subscribe on blockchain
    const result = await aleoService.subscribe(strategyId, duration, provider, price);

    // Save to database
    const subscription = await db.createSubscription({
      userId,
      strategyId,
      provider,
      duration,
      price,
      expiry: Date.now() + duration * 24 * 3600 * 1000,
      transactionId: result.transactionId,
      isActive: true
    });

    return subscription;
  }

  async getByUser(userId) {
    return await db.getSubscriptionsByUser(userId);
  }

  async cancel(id, userId) {
    // TODO: Update in database
    return { success: true };
  }

  async checkActive(userId, strategyId) {
    const subscriptions = await db.getSubscriptionsByUser(userId);
    const active = subscriptions.find(s => s.strategyId === strategyId && s.isActive && s.expiry > Date.now());
    return active ? { isActive: true, expiry: active.expiry } : { isActive: false };
  }
}

module.exports = new SubscriptionService();
