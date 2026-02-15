const aleoService = require('./aleoService');
const db = require('../database/inMemoryDB');

class SignalService {
  async publish(strategyId, signalData) {
    // Publish signal to blockchain
    const result = await aleoService.publishSignal(strategyId, signalData);

    // Save to database
    const signal = await db.createSignal({
      strategyId,
      ...signalData,
      signalHash: result.signalHash,
      transactionId: result.transactionId
    });

    return signal;
  }

  async getByStrategy(strategyId, userId) {
    // TODO: Check if user is subscribed
    return await db.getSignalsByStrategy(strategyId);
  }

  async verify(data) {
    const { signalHash, strategyId } = data;
    const result = await aleoService.verifySignal(signalHash, strategyId);
    return result.valid;
  }
}

module.exports = new SignalService();
