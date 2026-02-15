# ✅ Deployment Checklist

## Pre-Deploy

- [ ] Backend tested locally (`npm run dev`)
- [ ] Frontend tested locally (`npm run dev`)
- [ ] API test passes (`node test-api.js`)
- [ ] All pages load correctly
- [ ] No console errors

## Deploy Backend

```bash
cd backend
railway login
railway init
railway up
```

- [ ] Backend deployed
- [ ] Health check works: `curl https://YOUR-URL/health`
- [ ] Copy backend URL: `_______________________`

## Deploy Frontend

```bash
cd frontend
echo "VITE_API_URL=https://YOUR-BACKEND-URL/api" > .env.production
npm run build
vercel --prod
```

- [ ] Frontend deployed
- [ ] Homepage loads
- [ ] Marketplace works
- [ ] Copy frontend URL: `_______________________`

## Post-Deploy Test

- [ ] Visit frontend URL
- [ ] Browse marketplace
- [ ] View strategy detail
- [ ] Check provider dashboard
- [ ] Check subscriber dashboard
- [ ] Test on mobile

## URLs

```
Backend:  https://_____________________.up.railway.app
Frontend: https://_____________________.vercel.app
GitHub:   https://github.com/___________________
```

## Next Steps

- [ ] Record demo video (3-5 min)
- [ ] Create pitch deck (10-15 slides)
- [ ] Prepare submission
- [ ] Submit to hackathon

## Quick Commands

```bash
# Deploy everything
./quick-deploy.sh

# Test backend
curl https://YOUR-BACKEND-URL/health

# Test frontend
open https://YOUR-FRONTEND-URL
```

Done! 🚀
