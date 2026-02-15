// In-memory database for MVP
class InMemoryDB {
  constructor() {
    this.users = new Map();
    this.strategies = new Map();
    this.signals = new Map();
    this.subscriptions = new Map();
    
    // Mock data
    this.initMockData();
  }

  initMockData() {
    // Mock strategies
    this.strategies.set('1', {
      id: '1',
      name: 'BTC Momentum Pro',
      description: 'Advanced momentum strategy for Bitcoin',
      provider: 'aleo1provider123',
      price: 100,
      performance: { winRate: 72, totalSignals: 150, avgReturn: 8.5 },
      subscribers: 45,
      createdAt: new Date('2024-01-01')
    });

    this.strategies.set('2', {
      id: '2',
      name: 'ETH Swing Trader',
      description: 'Swing trading signals for Ethereum',
      provider: 'aleo1provider456',
      price: 75,
      performance: { winRate: 68, totalSignals: 120, avgReturn: 6.2 },
      subscribers: 32,
      createdAt: new Date('2024-01-15')
    });
  }

  // Users
  async createUser(user) {
    const id = Date.now().toString();
    this.users.set(id, { ...user, id, createdAt: new Date() });
    return this.users.get(id);
  }

  async getUserByAddress(address) {
    return Array.from(this.users.values()).find(u => u.address === address);
  }

  // Strategies
  async createStrategy(strategy) {
    const id = (this.strategies.size + 1).toString();
    this.strategies.set(id, { ...strategy, id, createdAt: new Date(), subscribers: 0 });
    return this.strategies.get(id);
  }

  async getStrategy(id) {
    return this.strategies.get(id);
  }

  async getAllStrategies() {
    return Array.from(this.strategies.values());
  }

  async updateStrategy(id, updates) {
    const strategy = this.strategies.get(id);
    if (!strategy) return null;
    const updated = { ...strategy, ...updates };
    this.strategies.set(id, updated);
    return updated;
  }

  // Signals
  async createSignal(signal) {
    const id = Date.now().toString();
    this.signals.set(id, { ...signal, id, createdAt: new Date() });
    return this.signals.get(id);
  }

  async getSignalsByStrategy(strategyId) {
    return Array.from(this.signals.values()).filter(s => s.strategyId === strategyId);
  }

  // Subscriptions
  async createSubscription(subscription) {
    const id = Date.now().toString();
    this.subscriptions.set(id, { ...subscription, id, createdAt: new Date() });
    
    // Update strategy subscriber count
    const strategy = this.strategies.get(subscription.strategyId);
    if (strategy) {
      strategy.subscribers += 1;
    }
    
    return this.subscriptions.get(id);
  }

  async getSubscriptionsByUser(userId) {
    return Array.from(this.subscriptions.values()).filter(s => s.userId === userId);
  }

  async getSubscriptionsByStrategy(strategyId) {
    return Array.from(this.subscriptions.values()).filter(s => s.strategyId === strategyId);
  }
}

module.exports = new InMemoryDB();
