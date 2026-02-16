# 🔧 Fix GitHub Permission

## Problem
- Logged in as: `IdcuqS07`
- Trying to push to: `0xYamando/ShadowTrade`
- Result: Permission denied (403)

## Solution: Use Your Own Account

### Option 1: Push to IdcuqS07 Account (Recommended)

```bash
cd shadowtrade

# Create repo at: https://github.com/IdcuqS07/ShadowTrade
# Then:
git remote add origin https://github.com/IdcuqS07/ShadowTrade.git
git push -u origin main
```

### Option 2: Get Access to 0xYamando

Ask `0xYamando` to:
1. Add you as collaborator
2. Or transfer repo ownership
3. Or give you write access

### Option 3: Fork the Repo

1. Ask `0xYamando` to create the repo
2. Fork it to your account
3. Push to your fork

---

## Quick Fix (Use Your Account)

```bash
# 1. Create new repo
# Go to: https://github.com/new
# Name: ShadowTrade
# Public
# Don't initialize

# 2. Push
cd shadowtrade
git remote add origin https://github.com/IdcuqS07/ShadowTrade.git
git push -u origin main
```

---

## Deploy to Vercel

After push, deploy with:
```
https://vercel.com/new/clone?repository-url=https://github.com/IdcuqS07/ShadowTrade&root-directory=shadowtrade/frontend
```

---

Which option do you want?
