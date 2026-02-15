# 🚀 Deploy ShadowTrade to Vercel

## GitHub Repo
https://github.com/0xYamando/ShadowTrade

## Quick Deploy (1 Click)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/0xYamando/ShadowTrade&root-directory=shadowtrade/frontend)

---

## Manual Deploy via Vercel Dashboard

### Step 1: Go to Vercel
https://vercel.com/new

### Step 2: Import Repository
1. Click "Import Git Repository"
2. Paste: `https://github.com/0xYamando/ShadowTrade`
3. Click "Import"

### Step 3: Configure Project
```
Project Name: shadowtrade
Root Directory: shadowtrade/frontend
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
```

### Step 4: Environment Variables (Optional)
```
VITE_API_URL = http://localhost:3000/api
```

### Step 5: Deploy
Click "Deploy" button

---

## Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Clone repo
git clone https://github.com/0xYamando/ShadowTrade.git
cd ShadowTrade/shadowtrade/frontend

# Deploy
vercel --prod
```

---

## Auto-Deploy Setup

1. Go to https://vercel.com
2. Import your GitHub repo
3. Every push to `main` branch will auto-deploy

---

## Expected Result

Your app will be live at:
```
https://shadowtrade-xxx.vercel.app
```

Test these pages:
- `/` - Homepage
- `/marketplace` - Strategy marketplace
- `/provider` - Provider dashboard
- `/subscriber` - Subscriber dashboard

---

## Troubleshooting

### Build fails
- Check root directory is set to `shadowtrade/frontend`
- Verify Node.js version is 18+

### Pages don't load
- Check build output directory is `dist`
- Verify all routes are configured

### API calls fail
- Backend is running locally (localhost:3000)
- For production, deploy backend first and update VITE_API_URL

---

## Next Steps

1. ✅ Deploy frontend to Vercel
2. 🎥 Record demo video
3. 📊 Create pitch deck
4. 🏆 Submit to hackathon

Ready to deploy! 🚀
