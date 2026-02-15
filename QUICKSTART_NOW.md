# ⚡ ShadowTrade - Quick Start Guide

## 🎯 Goal: Test Everything Locally in 5 Minutes

---

## Step 1: Backend (2 minutes)

### Terminal 1 - Start Backend
```bash
cd backend
npm install
npm run dev
```

Expected output:
```
🚀 ShadowTrade API running on port 3000
```

### Test Backend
Open new terminal:
```bash
cd backend
node test-api.js
```

Expected output:
```
🧪 Testing ShadowTrade API...
✅ All tests passed! 🎉
```

---

## Step 2: Frontend (2 minutes)

### Terminal 2 - Start Frontend
```bash
cd frontend
npm install
npm run dev
```

Expected output:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
```

### Test Frontend
1. Open browser: http://localhost:5173
2. You should see ShadowTrade homepage
3. Click "Marketplace" - should show 2 strategies
4. Click on a strategy - should show details

---

## Step 3: Test Full Flow (1 minute)

### Test Marketplace
1. Go to http://localhost:5173/marketplace
2. See 2 strategies: "BTC Momentum Pro" and "ETH Swing Trader"
3. Click on "BTC Momentum Pro"
4. See strategy details

### Test API Integration
Open browser console (F12) and run:
```javascript
// Test get strategies
fetch('http://localhost:3000/api/strategies')
  .then(r => r.json())
  .then(d => console.log('Strategies:', d));

// Test health
fetch('http://localhost:3000/health')
  .then(r => r.json())
  .then(d => console.log('Health:', d));
```

---

## ✅ Success Checklist

- [ ] Backend running on port 3000
- [ ] Test script passes all tests
- [ ] Frontend running on port 5173
- [ ] Homepage loads correctly
- [ ] Marketplace shows strategies
- [ ] Strategy detail page works
- [ ] API calls work in console

---

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check if port 3000 is in use
lsof -i :3000

# Kill process if needed
kill -9 <PID>

# Try again
npm run dev
```

### Frontend won't start
```bash
# Check if port 5173 is in use
lsof -i :5173

# Kill process if needed
kill -9 <PID>

# Clear cache and try again
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### API calls fail
```bash
# Check backend is running
curl http://localhost:3000/health

# Check CORS
# Make sure backend has cors() middleware enabled
```

---

## 🚀 Next Steps

Once everything works locally:

1. **Deploy Smart Contract**
   ```bash
   cd blockchain
   # Follow WAVE1_DEPLOYMENT.md Step 2
   ```

2. **Deploy Backend**
   ```bash
   # Follow WAVE1_DEPLOYMENT.md Step 3
   ```

3. **Deploy Frontend**
   ```bash
   # Follow WAVE1_DEPLOYMENT.md Step 4
   ```

4. **Create Demo Video**
   - Record screen showing the flow
   - 3-5 minutes
   - Follow script in PITCH_DECK_CONTENT.md

5. **Create Pitch Deck**
   - Use content from PITCH_DECK_CONTENT.md
   - Design in Canva/Figma
   - 10-15 slides

---

## 📝 Testing Checklist

### Backend Tests
- [ ] GET /health returns 200
- [ ] GET /api/strategies returns array
- [ ] GET /api/strategies/:id returns strategy
- [ ] POST /api/users/login returns token
- [ ] GET /api/users/profile with auth works
- [ ] POST /api/strategies with auth works
- [ ] POST /api/subscriptions with auth works

### Frontend Tests
- [ ] Homepage loads
- [ ] Navbar navigation works
- [ ] Marketplace loads strategies
- [ ] Strategy cards display correctly
- [ ] Strategy detail page works
- [ ] Dashboard page loads
- [ ] Responsive on mobile

### Integration Tests
- [ ] Frontend fetches strategies from backend
- [ ] API errors are handled gracefully
- [ ] Loading states work
- [ ] Navigation between pages works

---

## 🎉 You're Ready!

If all tests pass, you're ready to deploy!

### Quick Deploy Commands

```bash
# Backend to Railway
cd backend
railway login
railway init
railway up

# Frontend to Vercel
cd frontend
vercel login
vercel --prod

# Smart Contract to Aleo
cd blockchain
aleo build
aleo deploy --network testnet3
```

---

## 💡 Tips

1. **Keep terminals open** - Don't close backend/frontend terminals
2. **Check console** - Browser console shows API errors
3. **Use incognito** - Test in incognito to avoid cache issues
4. **Test on mobile** - Check responsive design
5. **Take screenshots** - For pitch deck and demo

---

## 📞 Need Help?

1. Check logs in terminal
2. Check browser console (F12)
3. Review WAVE1_DEPLOYMENT.md
4. Check backend/README.md
5. Review error messages carefully

---

## ⏱️ Time Estimate

- Backend setup: 2 min
- Frontend setup: 2 min
- Testing: 1 min
- **Total: 5 minutes**

Then:
- Deploy all: 30 min
- Demo video: 1 hour
- Pitch deck: 2 hours
- **Total to submission: 4 hours**

---

## 🏆 Let's Go!

You have everything you need. Start with:

```bash
# Terminal 1
cd backend && npm install && npm run dev

# Terminal 2
cd frontend && npm install && npm run dev

# Terminal 3
cd backend && node test-api.js
```

Good luck! 🚀
