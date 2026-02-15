# 🚀 Deploy to Vercel

## Quick Deploy

```bash
cd frontend
npm install
npm run build
npx vercel --prod
```

## Step by Step

### 1. Install Vercel CLI
```bash
npm install -g vercel
```

### 2. Login
```bash
vercel login
```

### 3. Deploy
```bash
cd frontend
vercel --prod
```

### 4. Done!
Copy the URL: `https://shadowtrade.vercel.app`

---

## Test

Visit your URL and check:
- ✅ Homepage loads
- ✅ Marketplace shows strategies
- ✅ Dashboards work

---

## Update API URL (Optional)

If you have a backend:

```bash
cd frontend
echo "VITE_API_URL=https://your-backend-url/api" > .env.production
vercel --prod
```

---

## Redeploy

```bash
cd frontend
vercel --prod
```

Done! 🎉
