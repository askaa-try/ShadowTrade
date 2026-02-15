const WebSocket = require('ws');
const crypto = require('crypto');

class SignalDistributor {
  constructor(server) {
    this.wss = new WebSocket.Server({ server });
    this.clients = new Map(); // userId -> ws connection
    
    this.wss.on('connection', (ws, req) => {
      ws.on('message', (message) => {
        const data = JSON.parse(message);
        if (data.type === 'auth' && data.userId) {
          this.clients.set(data.userId, ws);
          ws.send(JSON.stringify({ type: 'connected', userId: data.userId }));
        }
      });
      
      ws.on('close', () => {
        for (const [userId, client] of this.clients.entries()) {
          if (client === ws) this.clients.delete(userId);
        }
      });
    });
  }

  async broadcast(strategyId, signal, subscribers) {
    subscribers.forEach(sub => {
      const ws = this.clients.get(sub.userId);
      if (ws && ws.readyState === WebSocket.OPEN) {
        const encrypted = this.encrypt(signal, sub.userId);
        ws.send(JSON.stringify({
          type: 'signal',
          strategyId,
          data: encrypted,
          timestamp: Date.now()
        }));
      }
    });
  }

  encrypt(data, userId) {
    const key = crypto.createHash('sha256').update(userId).digest();
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return { encrypted, iv: iv.toString('hex') };
  }
}

module.exports = SignalDistributor;
