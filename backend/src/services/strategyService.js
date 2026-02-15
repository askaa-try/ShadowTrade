const aleoService = require('./aleoService');
const db = require('../database/inMemoryDB');

class StrategyService {
  async getAll(filters = {}) {
    return await db.getAllStrategies();
  }

  async getById(id) {
    return await db.getStrategy(id);
  }

  async create(userId, data) {
    const { name, description, price, provider } = data;
    const strategyId = Date.now().toString();

    // Register strategy on Aleo blockchain
    const result = await aleoService.registerStrategy(strategyId, price);

    // Save to database
    const strategy = await db.createStrategy({
      name,
      description,
      provider: provider || userId,
      price,
      performance: { winRate: 0, totalSignals: 0, avgReturn: 0 },
      transactionId: result.transactionId
    });

    return strategy;
  }

  async update(id, userId, data) {
    return await db.updateStrategy(id, data);
  }

  async delete(id, userId) {
    // Soft delete
    await db.updateStrategy(id, { deleted: true });
    return { success: true };
  }

  async getPerformance(id) {
    const strategy = await db.getStrategy(id);
    if (!strategy) return null;
    return strategy.performance;
  }
}

module.exports = new StrategyService();
