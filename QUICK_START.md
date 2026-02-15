# ⚡ Quick Start - Deploy ShadowTrade

## 🎯 Goal: Deploy dalam 2 jam

---

## Step 1: Deploy Smart Contract (30 menit)

```bash
# Install Aleo CLI
curl -L https://aleo.tools/install | bash

# Create account
aleo account new
# SIMPAN: private key, view key, address

# Build contract
cd blockchain
leo build

# Deploy (ganti YOUR_PRIVATE_KEY)
snarkos developer deploy shadowtrade.aleo \
  --private-key YOUR_PRIVATE_KEY \
  --query https://api.explorer.aleo.org/v1 \
  --path ./build/ \
  --broadcast https://api.explorer.aleo.org/v1/testnet3/transaction/broadcast \
  --fee 1000000

# SIMPAN program ID dan transaction hash
```

---

## Step 2: Deploy Backend ke Railway (20 menit)

```bash
# 1. Push code ke GitHub (jika belum)
cd backend
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_GITHUB_REPO
git push -u origin main

# 2. Deploy ke Railway
# - Buka railway.app
# - Login dengan GitHub
# - New Project → Deploy from GitHub
# - Pilih repo shadowtrade
# - Pilih folder: backend

# 3. Add environment variables di Railway:
PORT=3000
NODE_ENV=production
JWT_SECRET=ganti-dengan-random-string-panjang
ALEO_PROGRAM_ID=shadowtrade.aleo
ALEO_PRIVATE_KEY=your-private-key-from-step1
ALEO_VIEW_KEY=your-view-key-from-step1
ALEO_ADDRESS=your-address-from-step1
ALEO_NETWORK=testnet3
ALEO_API_URL=https://api.explorer.aleo.org/v1
CORS_ORIGIN=*

# 4. Deploy
# Railway akan auto-deploy
# SIMPAN URL: https://shadowtrade-backend.railway.app
```

---

## Step 3: Deploy Frontend ke Vercel (20 menit)

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Login
vercel login

# 3. Deploy
cd frontend
vercel --prod

# 4. Set environment variables (saat deploy atau di dashboard):
VITE_API_URL=https://shadowtrade-backend.railway.app/api
VITE_ALEO_PROGRAM_ID=shadowtrade.aleo
VITE_ALEO_NETWORK=testnet3

# 5. Redeploy jika perlu
vercel --prod

# SIMPAN URL: https://shadowtrade.vercel.app
```

---

## Step 4: Update CORS di Backend (5 menit)

```bash
# Di Railway dashboard, update environment variable:
CORS_ORIGIN=https://shadowtrade.vercel.app

# Railway akan auto-redeploy
```

---

## Step 5: Test Everything (15 menit)

```bash
# 1. Test backend
curl https://shadowtrade-backend.railway.app/health

# 2. Test frontend
# Buka https://shadowtrade.vercel.app
# - Check semua page load
# - Check console tidak ada error
# - Test navigation

# 3. Test API dari frontend
# - Buka Network tab di browser
# - Browse marketplace
# - Check API calls berhasil
```

---

## Step 6: Create Pitch Deck (60 menit)

### Option A: Google Slides (Recommended)
```
1. Buka Google Slides
2. Pilih template modern/minimal
3. Ikuti PITCH_DECK_OUTLINE.md
4. 15 slides total
5. Export ke PDF
```

### Option B: Canva
```
1. Buka canva.com
2. Search "Pitch Deck"
3. Pilih template
4. Edit dengan content dari PITCH_DECK_OUTLINE.md
5. Download PDF
```

### Slide Checklist
```
✓ Title & tagline
✓ Problem (4 pain points)
✓ Solution (4 features)
✓ How it works (flow diagram)
✓ Technical architecture
✓ Privacy features
✓ Competitive advantage
✓ Market opportunity
✓ Business model
✓ Traction
✓ Roadmap
✓ Demo (live URL + screenshots)
✓ Why Aleo
✓ Team
✓ Contact & ask
```

---

## Step 7: Update Documentation (10 menit)

```bash
# Update README.md dengan live URLs
cd shadowtrade

cat >> README.md << EOF

## 🌐 Live Demo

- **Website**: https://shadowtrade.vercel.app
- **API**: https://shadowtrade-backend.railway.app
- **Smart Contract**: shadowtrade.aleo (testnet3)
- **Transaction**: [your-tx-hash]

## 🚀 Quick Links

- [Pitch Deck](./PITCH_DECK.pdf)
- [Technical Docs](./docs/TECHNICAL.md)
- [Deployment Guide](./DEPLOYMENT_STEPS.md)
- [API Reference](./docs/API.md)

EOF

# Commit dan push
git add .
git commit -m "Add live demo URLs"
git push
```

---

## Step 8: Prepare Submission (10 menit)

### Checklist
```
✓ GitHub repo public
✓ README updated dengan live URLs
✓ Pitch deck PDF di repo
✓ Smart contract deployed
✓ Frontend live
✓ Backend live
✓ All documentation complete
✓ Screenshots di README
```

### Submission Package
```
1. GitHub URL: https://github.com/yourusername/shadowtrade
2. Live Demo: https://shadowtrade.vercel.app
3. Pitch Deck: Link to PDF in repo
4. Smart Contract: shadowtrade.aleo on testnet3
5. Description: "Private trading signal marketplace using Aleo ZK proofs"
```

---

## 🎯 Total Time: ~2 hours

```
Deploy Contract:    30 min ████████░░
Deploy Backend:     20 min ██████░░░░
Deploy Frontend:    20 min ██████░░░░
Test:               15 min █████░░░░░
Pitch Deck:         60 min ████████████████████
Documentation:      10 min ███░░░░░░░
Submission:         10 min ███░░░░░░░
```

---

## 🆘 Troubleshooting

### Contract deployment gagal
```bash
# Check balance
aleo account balance --address YOUR_ADDRESS

# Request testnet tokens
# Visit Aleo faucet

# Try deploy lagi dengan fee lebih tinggi
--fee 2000000
```

### Backend error di Railway
```bash
# Check logs di Railway dashboard
# Common issues:
# - Missing environment variables
# - Wrong Node version (use 18.x)
# - Port not set correctly
```

### Frontend tidak connect ke backend
```bash
# Check CORS settings di backend
# Check VITE_API_URL di Vercel
# Check browser console untuk error
```

### API calls gagal
```bash
# Test backend langsung
curl https://your-backend.railway.app/health

# Check environment variables
# Check CORS_ORIGIN includes frontend URL
```

---

## ✅ Success Criteria

```
✓ Smart contract deployed on testnet
✓ Frontend accessible via HTTPS
✓ Backend API responding
✓ No console errors
✓ All pages load correctly
✓ Pitch deck completed
✓ Documentation updated
✓ Ready for submission
```

---

## 🚀 Next Steps After Deployment

1. Test end-to-end flow
2. Take screenshots untuk pitch deck
3. Record demo (optional)
4. Share dengan community
5. Submit to hackathon
6. Gather feedback
7. Iterate for Wave 2

---

## 💪 You Got This!

**Current Status**: Code ready ✅
**Next Action**: Deploy contract
**Time Needed**: 2 hours
**Difficulty**: Easy

```bash
# Start now!
cd blockchain
leo build
```

**Let's ship it! 🚀**
