require('dotenv').config();
const express = require('express');
const cors = require('cors');
const strategyRoutes = require('./routes/strategy');
const signalRoutes = require('./routes/signal');
const subscriptionRoutes = require('./routes/subscription');
const userRoutes = require('./routes/user');

const WebSocket = require('ws');
const http = require('http');
const SignalDistributor = require('./services/signalDistributor');

const app = express();
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

// Initialize WebSocket
const signalDistributor = new SignalDistributor(server);

// Middleware
app.use(cors());
app.use(express.json());

// Make distributor available to routes
app.set('signalDistributor', signalDistributor);

// Routes
app.use('/api/strategies', strategyRoutes);
app.use('/api/signals', signalRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/users', userRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

server.listen(PORT, () => {
  console.log(`🚀 ShadowTrade API running on port ${PORT}`);
  console.log(`🔌 WebSocket server ready`);
});
