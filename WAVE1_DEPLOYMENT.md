# 🚀 ShadowTrade - Wave 1 Deployment Guide

## 📋 Pre-Deployment Checklist

### ✅ Backend Ready
- [x] API endpoints implemented
- [x] In-memory database working
- [x] Aleo service mocked
- [x] Test script created
- [ ] Environment variables configured
- [ ] Tested locally

### ✅ Frontend Ready
- [x] React app built
- [x] API integration complete
- [x] Wallet service ready
- [x] All pages implemented
- [ ] Environment variables configured
- [ ] Tested locally

### ✅ Smart Contract Ready
- [x] shadowtrade.aleo written
- [x] All functions implemented
- [ ] Built successfully
- [ ] Deployed to testnet

---

## 🔧 Step 1: Test Locally

### Backend
```bash
cd backend
npm install
npm run dev
```

Test API:
```bash
node test-api.js
```

Expected: All tests pass ✅

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Visit: http://localhost:5173

Expected: App loads, can browse marketplace ✅

---

## ⛓️ Step 2: Deploy Smart Contract to Aleo Testnet

### Install Aleo CLI
```bash
# Install Aleo
curl -L https://aleo.tools/install | bash

# Verify installation
aleo --version
```

### Create Aleo Account
```bash
# Generate new account
aleo account new

# Save the output:
# Private Key: APrivateKey1...
# View Key: AViewKey1...
# Address: aleo1...
```

### Get Testnet Tokens
Visit: https://faucet.aleo.org
- Enter your address
- Request testnet tokens
- Wait for confirmation

### Build & Deploy Contract
```bash
cd blockchain

# Build contract
aleo build

# Deploy to testnet
aleo deploy shadowtrade.aleo \
  --private-key YOUR_PRIVATE_KEY \
  --network testnet3 \
  --priority-fee 1000

# Save the program ID from output
```

### Test Contract Functions
```bash
# Test register_strategy
aleo execute shadowtrade.aleo register_strategy \
  "strategy_001" 100u64 \
  --private-key YOUR_PRIVATE_KEY \
  --network testnet3

# Test subscribe_with_payment
aleo execute shadowtrade.aleo subscribe_with_payment \
  "strategy_001" 30u64 "aleo1provider..." 100u64 \
  --private-key YOUR_PRIVATE_KEY \
  --network testnet3
```

---

## 🖥️ Step 3: Deploy Backend to Railway

### Option A: Via Railway CLI
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize project
cd backend
railway init

# Add environment variables
railway variables set PORT=3000
railway variables set JWT_SECRET=your-secret-key-here
railway variables set ALEO_PROGRAM_ID=shadowtrade.aleo
railway variables set ALEO_PRIVATE_KEY=YOUR_PRIVATE_KEY
railway variables set ALEO_NETWORK=testnet3

# Deploy
railway up
```

### Option B: Via Railway Dashboard
1. Go to https://railway.app
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Connect your GitHub account
5. Select shadowtrade repository
6. Set root directory: `backend`
7. Add environment variables:
   ```
   PORT=3000
   JWT_SECRET=your-secret-key-here
   ALEO_PROGRAM_ID=shadowtrade.aleo
   ALEO_PRIVATE_KEY=YOUR_PRIVATE_KEY
   ALEO_NETWORK=testnet3
   ```
8. Click "Deploy"

### Get Backend URL
After deployment, Railway will provide a URL like:
```
https://shadowtrade-backend-production.up.railway.app
```

Save this URL for frontend configuration.

---

## 🌐 Step 4: Deploy Frontend to Vercel

### Prepare Frontend
```bash
cd frontend

# Create .env.production
echo "VITE_API_URL=https://your-backend-url.railway.app/api" > .env.production

# Test build
npm run build
```

### Deploy to Vercel

#### Option A: Via Vercel CLI
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

#### Option B: Via Vercel Dashboard
1. Go to https://vercel.com
2. Click "Add New Project"
3. Import from GitHub
4. Select shadowtrade repository
5. Configure:
   - Framework Preset: Vite
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Add Environment Variable:
   ```
   VITE_API_URL=https://your-backend-url.railway.app/api
   ```
7. Click "Deploy"

### Get Frontend URL
Vercel will provide a URL like:
```
https://shadowtrade.vercel.app
```

---

## 🧪 Step 5: End-to-End Testing

### Test Flow
1. Visit frontend URL
2. Browse marketplace
3. Click on a strategy
4. Connect wallet (mock for now)
5. Subscribe to strategy
6. Check subscription in dashboard

### Verify Backend
```bash
# Test health
curl https://your-backend-url.railway.app/health

# Test strategies
curl https://your-backend-url.railway.app/api/strategies
```

### Verify Smart Contract
```bash
# Check program on Aleo explorer
# Visit: https://explorer.aleo.org/testnet3
# Search for: shadowtrade.aleo
```

---

## 📹 Step 6: Create Demo Video

### Script (3-5 minutes)

**[0:00-0:30] Problem**
- Show trading signal market stats
- Explain pain points: theft, fake signals, front-running

**[0:30-1:00] Solution**
- Introduce ShadowTrade
- Explain ZK privacy approach
- Show value proposition

**[1:00-3:00] Live Demo**
- Browse marketplace
- View strategy details
- Subscribe to strategy
- Show verified performance
- Explain privacy features

**[3:00-4:00] Technical Highlights**
- Aleo ZK proofs
- Hybrid architecture
- Smart contract features
- Security measures

**[4:00-5:00] Call to Action**
- Try demo: shadowtrade.vercel.app
- GitHub: github.com/yourusername/shadowtrade
- Join community

### Recording Tools
- Loom (easy, web-based)
- OBS Studio (professional)
- QuickTime (Mac)
- Windows Game Bar (Windows)

### Tips
- Use 1080p resolution
- Clear audio (use good mic)
- Show cursor movements
- Keep it concise
- Add captions

---

## 📊 Step 7: Create Pitch Deck

### Slides (10-15 slides)

1. **Title Slide**
   - ShadowTrade logo
   - Tagline: "Private Trading Signal Marketplace"
   - Built on Aleo

2. **Problem**
   - $3.5B trading signal market
   - 4 major pain points
   - Current solutions inadequate

3. **Solution**
   - ZK-based privacy
   - Verified performance
   - Anti front-running
   - Fair revenue split

4. **How It Works**
   - Provider flow diagram
   - Subscriber flow diagram
   - Technical architecture

5. **Privacy Technology**
   - Aleo ZK proofs explained
   - Hybrid approach
   - Watermarking system

6. **Demo Screenshots**
   - Marketplace
   - Strategy detail
   - Subscription flow
   - Dashboard

7. **Competitive Advantage**
   - vs TradingView
   - vs Numerai
   - vs Traditional platforms
   - Unique positioning

8. **Market Opportunity**
   - TAM: $3.5B
   - Target: 5K users Year 1
   - Revenue projection

9. **Business Model**
   - 75/25 split
   - Sustainable economics
   - Win-win-win

10. **Traction**
    - Hackathon submission
    - Testnet deployment
    - Community interest

11. **Roadmap**
    - Wave 1-3 highlights
    - Mainnet launch plan
    - Future features

12. **Team**
    - Team members
    - Expertise
    - Commitment

13. **Ask**
    - Hackathon prize
    - Community support
    - Feedback

14. **Contact**
    - Website
    - GitHub
    - Email
    - Social media

### Design Tools
- Canva (easy, templates)
- Figma (professional)
- Google Slides (simple)
- PowerPoint (traditional)

---

## 📝 Step 8: Prepare Documentation

### Update README.md
```markdown
# ShadowTrade

Private Trading Signal Marketplace on Aleo

## 🎯 Hackathon Submission

- **Demo**: https://shadowtrade.vercel.app
- **Video**: [YouTube link]
- **Pitch Deck**: [Link to deck]
- **GitHub**: https://github.com/yourusername/shadowtrade

## 🚀 Features

- ZK-based privacy
- Verified performance
- Anti front-running
- Fair revenue split

## 🏗️ Architecture

- Smart Contracts: Aleo Leo
- Backend: Node.js + Express
- Frontend: React + Vite
- Deployment: Railway + Vercel

## 📦 Try It

Visit: https://shadowtrade.vercel.app

## 📚 Documentation

See `/docs` folder for detailed documentation.
```

### Create SUBMISSION.md
```markdown
# Hackathon Submission

## Project Information

- **Name**: ShadowTrade
- **Category**: DeFi / Privacy
- **Blockchain**: Aleo

## Links

- **Live Demo**: https://shadowtrade.vercel.app
- **Demo Video**: [YouTube link]
- **Pitch Deck**: [Link]
- **GitHub**: https://github.com/yourusername/shadowtrade
- **Smart Contract**: shadowtrade.aleo (testnet3)

## What We Built

ShadowTrade is a private trading signal marketplace...

## Technical Highlights

- Aleo ZK proofs for privacy
- Hybrid signal distribution
- Smart contract payment split
- Scalable architecture

## Challenges

- Learning Aleo Leo
- ZK proof implementation
- Balancing privacy and verification

## What's Next

- Mainnet launch
- Mobile app
- Advanced features
```

---

## ✅ Final Checklist

### Technical
- [ ] Smart contract deployed on testnet
- [ ] Backend deployed and running
- [ ] Frontend deployed and accessible
- [ ] End-to-end flow working
- [ ] No critical bugs

### Documentation
- [ ] README.md updated
- [ ] SUBMISSION.md created
- [ ] API documentation complete
- [ ] Setup instructions clear

### Demo Materials
- [ ] Demo video recorded (3-5 min)
- [ ] Pitch deck created (10-15 slides)
- [ ] Screenshots captured
- [ ] GitHub repo public

### Submission
- [ ] All links working
- [ ] Video uploaded
- [ ] Deck uploaded
- [ ] Submission form filled

---

## 🎉 You're Ready!

### Submission URLs to Prepare:
1. Live Demo: `https://shadowtrade.vercel.app`
2. GitHub: `https://github.com/yourusername/shadowtrade`
3. Video: `https://youtube.com/watch?v=...`
4. Pitch Deck: `https://...`

### Final Test:
1. Open demo URL in incognito
2. Browse marketplace
3. View strategy
4. Test wallet connect
5. Verify everything works

### Submit!
Go to hackathon submission portal and submit all materials.

---

## 🆘 Troubleshooting

### Backend Issues
```bash
# Check logs
railway logs

# Restart service
railway restart
```

### Frontend Issues
```bash
# Check build
npm run build

# Redeploy
vercel --prod
```

### Smart Contract Issues
```bash
# Check program
aleo program show shadowtrade.aleo --network testnet3

# Check balance
aleo account balance --address YOUR_ADDRESS --network testnet3
```

---

## 📞 Support

If you encounter issues:
1. Check logs
2. Review documentation
3. Test locally first
4. Ask in Aleo Discord

---

## 🎯 Success Metrics

### Wave 1 Complete When:
- ✅ All components deployed
- ✅ Demo video ready
- ✅ Pitch deck complete
- ✅ Documentation done
- ✅ Submission submitted

### Good Luck! 🚀
