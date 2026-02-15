# ShadowTrade Backend API

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment
```bash
cp .env.example .env
```

Edit `.env` if needed (defaults work for development).

### 3. Start Server
```bash
npm run dev
```

Server will run on `http://localhost:3000`

### 4. Test API
```bash
node test-api.js
```

## 📡 API Endpoints

### Health Check
```
GET /health
```

### Strategies
```
GET    /api/strategies          - List all strategies
GET    /api/strategies/:id      - Get strategy detail
POST   /api/strategies          - Create strategy (auth required)
PUT    /api/strategies/:id      - Update strategy (auth required)
DELETE /api/strategies/:id      - Delete strategy (auth required)
```

### Signals
```
GET  /api/signals/:strategyId   - Get signals for strategy (auth required)
POST /api/signals               - Publish signal (auth required)
POST /api/signals/verify        - Verify signal
```

### Subscriptions
```
GET    /api/subscriptions       - Get user subscriptions (auth required)
POST   /api/subscriptions       - Create subscription (auth required)
DELETE /api/subscriptions/:id   - Cancel subscription (auth required)
```

### Users
```
POST /api/users/register         - Register user
POST /api/users/login            - Login (wallet connect)
GET  /api/users/profile          - Get profile (auth required)
```

## 🔐 Authentication

Use JWT token in Authorization header:
```
Authorization: Bearer <token>
```

## 📦 Project Structure

```
backend/
├── src/
│   ├── controllers/      # Request handlers
│   ├── services/         # Business logic
│   ├── routes/           # API routes
│   ├── middleware/       # Auth, validation
│   ├── database/         # In-memory DB (MVP)
│   └── index.js          # Server entry
├── test-api.js           # API test script
└── package.json
```

## 🧪 Testing

Run the test script to verify all endpoints:
```bash
node test-api.js
```

Expected output:
```
🧪 Testing ShadowTrade API...

1️⃣ Testing health endpoint...
✅ Health: { status: 'ok', timestamp: '...' }

2️⃣ Testing get strategies...
✅ Strategies: 2 found
   First strategy: BTC Momentum Pro

...

✅ All tests passed! 🎉
```

## 🔧 Development

### Start in development mode (auto-reload):
```bash
npm run dev
```

### Start in production mode:
```bash
npm start
```

## 📝 Notes

- Currently using in-memory database for MVP
- Aleo integration is mocked for development
- Real blockchain integration requires Aleo SDK setup
- For production, replace in-memory DB with PostgreSQL

## 🚀 Deployment

### Deploy to Railway:
1. Connect GitHub repo
2. Add environment variables
3. Deploy

### Environment Variables:
```
PORT=3000
JWT_SECRET=your-secret-key
ALEO_PROGRAM_ID=shadowtrade.aleo
ALEO_NETWORK=testnet3
```

## 📚 Next Steps

1. ✅ Backend API working
2. ⏳ Deploy to Railway
3. ⏳ Connect frontend
4. ⏳ Test end-to-end flow
