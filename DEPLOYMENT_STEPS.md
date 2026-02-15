# 🚀 ShadowTrade - Deployment Steps

## 📋 Wave 1 Completion Checklist

### ✅ Completed
- [x] Smart contracts code
- [x] Backend API structure
- [x] Frontend React app
- [x] Documentation

### 🔨 Next Steps (Priority Order)

---

## 1️⃣ Deploy Smart Contract to Testnet

### Prerequisites
```bash
# Install Aleo CLI
curl -L https://aleo.tools/install | bash

# Verify installation
aleo --version

# Create/import account
aleo account new
# Save private key, view key, address
```

### Build & Deploy
```bash
cd blockchain

# Build contract
leo build

# Deploy to testnet
snarkos developer deploy shadowtrade.aleo \
  --private-key YOUR_PRIVATE_KEY \
  --query https://api.explorer.aleo.org/v1 \
  --path ./build/ \
  --broadcast https://api.explorer.aleo.org/v1/testnet3/transaction/broadcast \
  --fee 1000000 \
  --record RECORD_STRING
```

### Test Functions
```bash
# Test register_strategy
leo run register_strategy 1u64 100u64

# Test subscribe_with_payment
leo run subscribe_with_payment 1u64 30u64 aleo1... 100u64

# Test publish_signal
leo run publish_signal 1u64 12345field

# Test verify_access
leo run verify_access 1u64 aleo1...

# Test update_performance
leo run update_performance 1u64 150u64 120u64

# Test withdraw_earnings
leo run withdraw_earnings 1u64
```

### Save Deployment Info
```
Program ID: shadowtrade.aleo
Network: testnet3
Deployed at: [timestamp]
Transaction: [tx_hash]
```

---

## 2️⃣ Setup & Test Backend

### Install Dependencies
```bash
cd backend
npm install
```

### Configure Environment
```bash
# Create .env file
cat > .env << EOF
PORT=3000
NODE_ENV=development

# Database (optional for MVP)
# DATABASE_URL=postgresql://user:pass@localhost:5432/shadowtrade

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this

# Aleo
ALEO_PROGRAM_ID=shadowtrade.aleo
ALEO_PRIVATE_KEY=YOUR_PRIVATE_KEY
ALEO_VIEW_KEY=YOUR_VIEW_KEY
ALEO_ADDRESS=YOUR_ADDRESS
ALEO_NETWORK=testnet3
ALEO_API_URL=https://api.explorer.aleo.org/v1

# CORS
CORS_ORIGIN=http://localhost:5173
EOF
```

### Start Server
```bash
npm run dev
```

### Test Endpoints
```bash
# Health check
curl http://localhost:3000/health

# Get strategies
curl http://localhost:3000/api/strategies

# Register user
curl -X POST http://localhost:3000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"address":"aleo1...","username":"testuser"}'

# Create strategy
curl -X POST http://localhost:3000/api/strategies \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT" \
  -d '{
    "name":"BTC Scalping",
    "description":"Short-term BTC strategy",
    "price":100,
    "category":"scalping"
  }'
```

---

## 3️⃣ Setup & Test Frontend

### Install Dependencies
```bash
cd frontend
npm install
```

### Configure Environment
```bash
# Create .env file
cat > .env << EOF
VITE_API_URL=http://localhost:3000/api
VITE_ALEO_PROGRAM_ID=shadowtrade.aleo
VITE_ALEO_NETWORK=testnet3
EOF
```

### Start Development Server
```bash
npm run dev
```

### Test Pages
```
✓ Open http://localhost:5173
✓ Test navigation (Home, Marketplace, Dashboard)
✓ Check responsive design
✓ Test wallet connection (if available)
✓ Test strategy browsing
```

---

## 4️⃣ Deploy Frontend to Vercel

### Prepare for Deployment
```bash
cd frontend

# Build production
npm run build

# Test production build locally
npm run preview
```

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod

# Set environment variables in Vercel dashboard
# - VITE_API_URL
# - VITE_ALEO_PROGRAM_ID
# - VITE_ALEO_NETWORK
```

### Alternative: Manual Deploy
```
1. Push code to GitHub
2. Go to vercel.com
3. Import repository
4. Set environment variables
5. Deploy
```

---

## 5️⃣ Deploy Backend to Railway

### Prepare for Deployment
```bash
cd backend

# Create Procfile (if needed)
echo "web: npm start" > Procfile

# Ensure package.json has start script
# "start": "node src/server.js"
```

### Deploy to Railway
```
1. Go to railway.app
2. New Project → Deploy from GitHub
3. Select shadowtrade/backend
4. Add environment variables:
   - PORT=3000
   - NODE_ENV=production
   - JWT_SECRET=...
   - ALEO_PROGRAM_ID=...
   - ALEO_PRIVATE_KEY=...
   - ALEO_NETWORK=testnet3
   - CORS_ORIGIN=https://your-vercel-app.vercel.app
5. Deploy
```

### Alternative: Render.com
```
1. Go to render.com
2. New Web Service
3. Connect GitHub repo
4. Build: npm install
5. Start: npm start
6. Add environment variables
7. Deploy
```

---

## 6️⃣ Update Frontend with Production API

### Update Vercel Environment
```
VITE_API_URL=https://your-railway-app.railway.app/api
```

### Redeploy Frontend
```bash
vercel --prod
```

---

## 7️⃣ Create Pitch Deck

### Slide Structure (10-15 slides)
```
1. Title
   - ShadowTrade
   - Private Trading Signal Marketplace

2. Problem
   - $3.5B market
   - Strategy theft, fake signals, front-running

3. Solution
   - ZK-based privacy
   - Verified performance
   - Anti-MEV

4. How It Works
   - Provider flow
   - Subscriber flow

5. Technical Architecture
   - Aleo smart contracts
   - Hybrid distribution
   - 75/25 split

6. Privacy Features
   - ZK proofs
   - Watermarking
   - Encryption

7. Competitive Advantage
   - First ZK-based platform
   - vs TradingView, Numerai

8. Market Opportunity
   - TAM: $3.5B
   - Target users

9. Business Model
   - Revenue streams
   - Sustainability

10. Roadmap
    - Wave 1-10
    - Mainnet launch

11. Demo
    - Live demo link
    - Screenshots

12. Team & Contact
    - Team intro
    - Links
```

### Tools
- Google Slides
- Canva
- PowerPoint
- Pitch.com

---

## 8️⃣ Final Testing

### End-to-End Test
```
1. Open live website
2. Browse marketplace
3. View strategy details
4. Connect wallet (if available)
5. Test subscribe flow
6. Check all pages load
7. Test on mobile
8. Test on different browsers
```

### Performance Check
```
- Lighthouse score > 90
- Load time < 3s
- No console errors
- All links work
```

---

## 9️⃣ Documentation Update

### Update README.md
```markdown
# ShadowTrade

## Live Demo
- Website: https://shadowtrade.vercel.app
- API: https://shadowtrade-api.railway.app
- Contract: shadowtrade.aleo (testnet3)

## Quick Start
[Installation instructions]

## Documentation
- [Technical Docs](docs/TECHNICAL.md)
- [Deployment Guide](docs/DEPLOYMENT.md)
- [API Reference](docs/API.md)
```

---

## 🔟 Hackathon Submission

### Prepare Submission Package
```
✓ GitHub repository (public)
✓ Live demo URL
✓ Pitch deck (PDF)
✓ README with clear instructions
✓ Documentation
✓ Smart contract address
✓ Test accounts (if needed)
```

### Submission Checklist
```
[ ] All code pushed to GitHub
[ ] Frontend deployed and working
[ ] Backend deployed and working
[ ] Smart contract on testnet
[ ] Pitch deck completed
[ ] README updated
[ ] All links tested
[ ] Screenshots added
[ ] Contact info included
```

---

## 📊 Progress Tracking

### Current Status
```
Smart Contract:  ████████░░ 80% (code done, need deploy)
Backend:         ████████░░ 80% (code done, need deploy)
Frontend:        ████████░░ 80% (code done, need deploy)
Documentation:   █████████░ 90% (mostly done)
Pitch Deck:      ░░░░░░░░░░  0% (not started)
```

### Estimated Time
```
1. Deploy contract:    2 hours
2. Setup backend:      1 hour
3. Setup frontend:     1 hour
4. Deploy frontend:    30 min
5. Deploy backend:     30 min
6. Pitch deck:         2 hours
7. Final testing:      1 hour
8. Documentation:      30 min

Total: ~8-9 hours
```

---

## 🎯 Success Criteria

### Must Have
- ✅ Smart contract deployed on testnet
- ✅ Frontend live and accessible
- ✅ Backend API working
- ✅ Documentation complete
- ✅ Pitch deck ready

### Nice to Have
- ⭐ Wallet integration working
- ⭐ Real transactions on testnet
- ⭐ Mobile responsive
- ⭐ High Lighthouse score

---

## 🚀 Ready to Deploy!

**Next Action**: Deploy smart contract to testnet

```bash
cd blockchain
leo build
# Then deploy with snarkos
```

**Let's ship it! 💪**
