# 🚀 Deploy ShadowTrade - 3 Steps

## Option 1: Automated (Recommended)

```bash
./quick-deploy.sh
```

Pilih option yang kamu mau!

---

## Option 2: Manual Deploy

### Step 1: Deploy Backend (Railway)

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Deploy
cd backend
railway init
railway up
```

**Copy URL backend** (contoh: `https://shadowtrade-api.up.railway.app`)

---

### Step 2: Deploy Frontend (Vercel)

```bash
# Install Vercel CLI
npm install -g vercel

# Update API URL
cd frontend
echo "VITE_API_URL=https://YOUR-BACKEND-URL/api" > .env.production

# Deploy
vercel --prod
```

**Copy URL frontend** (contoh: `https://shadowtrade.vercel.app`)

---

### Step 3: Test

Visit frontend URL dan test:
- ✅ Homepage loads
- ✅ Marketplace shows strategies
- ✅ Dashboards work
- ✅ API calls succeed

---

## Alternative: Netlify + Railway

### Backend (Railway)
```bash
cd backend
railway up
```

### Frontend (Netlify)
```bash
npm install -g netlify-cli
cd frontend
npm run build
netlify deploy --prod
```

---

## Environment Variables

### Backend (Railway)
```
PORT=3000
JWT_SECRET=your-secret-key-here
ALEO_PROGRAM_ID=shadowtrade.aleo
ALEO_NETWORK=testnet3
```

### Frontend (Vercel/Netlify)
```
VITE_API_URL=https://your-backend-url/api
```

---

## Quick Test

```bash
# Test backend
curl https://your-backend-url/health

# Test frontend
open https://your-frontend-url
```

---

## Troubleshooting

### Backend won't start
- Check Railway logs: `railway logs`
- Verify environment variables
- Check package.json start script

### Frontend can't connect to backend
- Check VITE_API_URL is correct
- Verify CORS is enabled in backend
- Check backend is running

### Build fails
- Clear node_modules: `rm -rf node_modules && npm install`
- Check Node version: `node -v` (should be 18+)
- Rebuild: `npm run build`

---

## 🎉 Success!

Once deployed:
1. ✅ Backend live on Railway
2. ✅ Frontend live on Vercel/Netlify
3. ✅ All features working

**Next:**
- Record demo video
- Create pitch deck
- Submit to hackathon!

---

## URLs to Save

```
Backend:  https://_____.up.railway.app
Frontend: https://_____.vercel.app
GitHub:   https://github.com/yourusername/shadowtrade
```

Ready to win! 🏆
