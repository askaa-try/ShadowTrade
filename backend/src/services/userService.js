const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../database/inMemoryDB');

class UserService {
  async register(data) {
    const { email, password, walletAddress } = data;

    // Check if user exists
    const existing = await db.getUserByAddress(walletAddress);
    if (existing) {
      throw new Error('User already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save to database
    const user = await db.createUser({
      email,
      password: hashedPassword,
      address: walletAddress
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'dev-secret-key',
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    return {
      user: { id: user.id, email: user.email, address: user.address },
      token
    };
  }

  async login(data) {
    const { walletAddress } = data;

    // Get or create user
    let user = await db.getUserByAddress(walletAddress);
    if (!user) {
      user = await db.createUser({ address: walletAddress });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, address: user.address },
      process.env.JWT_SECRET || 'dev-secret-key',
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    return {
      user: { id: user.id, address: user.address },
      token
    };
  }

  async getProfile(userId) {
    const subscriptions = await db.getSubscriptionsByUser(userId);
    const strategies = (await db.getAllStrategies()).filter(s => s.provider === userId);

    return {
      id: userId,
      subscriptions: subscriptions.length,
      strategies: strategies.length
    };
  }
}

module.exports = new UserService();
