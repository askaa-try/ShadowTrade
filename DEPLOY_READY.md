# 🚀 READY TO DEPLOY!

## 3 Ways to Deploy

### 1️⃣ Automated Script (Easiest)
```bash
./quick-deploy.sh
```

### 2️⃣ Manual Commands
```bash
# Backend
cd backend && railway up

# Frontend
cd frontend && vercel --prod
```

### 3️⃣ GitHub Actions
Push to main branch → Auto deploy

---

## Files Created

✅ `vercel.json` - Vercel config
✅ `railway.json` - Railway config
✅ `netlify.toml` - Netlify config (alternative)
✅ `quick-deploy.sh` - One-command deploy
✅ `.github/workflows/deploy.yml` - Auto deploy
✅ `DEPLOY_NOW.md` - Step-by-step guide
✅ `DEPLOY_CHECKLIST.md` - Deployment checklist

---

## Quick Start

```bash
# Option 1: Interactive
./quick-deploy.sh

# Option 2: Direct
cd backend && railway up
cd frontend && vercel --prod
```

---

## What Happens

1. **Backend** → Railway
   - Installs dependencies
   - Starts server
   - Gets public URL

2. **Frontend** → Vercel
   - Builds React app
   - Deploys to CDN
   - Gets public URL

---

## After Deploy

Test URLs:
```bash
# Backend
curl https://YOUR-URL/health

# Frontend
open https://YOUR-URL
```

---

## Environment Setup

### Railway (Backend)
```
JWT_SECRET=your-secret
ALEO_PROGRAM_ID=shadowtrade.aleo
```

### Vercel (Frontend)
```
VITE_API_URL=https://your-backend-url/api
```

---

## Next: Demo & Pitch

1. ✅ Deploy (you are here)
2. 📹 Record demo (2 hours)
3. 📊 Make pitch deck (2 hours)
4. 🏆 Submit hackathon

**Total time: 4-6 hours to submission!**

---

## Commands Reference

```bash
# Install CLIs
npm install -g @railway/cli vercel netlify-cli

# Login
railway login
vercel login
netlify login

# Deploy
railway up          # Backend
vercel --prod       # Frontend
netlify deploy --prod  # Frontend (alt)

# Test
railway logs        # Backend logs
vercel logs         # Frontend logs
```

---

## Ready?

Run this now:
```bash
./quick-deploy.sh
```

Let's ship it! 🚀
