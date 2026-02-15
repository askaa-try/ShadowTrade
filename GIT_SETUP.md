# 🚀 Setup GitHub Repo

## Step 1: Initialize Git

```bash
cd "/Users/idcuq/Documents/Shadow Trade/shadowtrade"
git init
git add .
git commit -m "Initial commit: ShadowTrade MVP - Wave 1 & 2 complete"
```

## Step 2: Create GitHub Repo

1. Go to https://github.com/new
2. Repository name: `ShadowTrade`
3. Description: `Private Trading Signal Marketplace on Aleo`
4. Public repository
5. Don't initialize with README (we have one)
6. Click "Create repository"

## Step 3: Push to GitHub

```bash
git remote add origin https://github.com/0xYamando/ShadowTrade.git
git branch -M main
git push -u origin main
```

## Step 4: Verify

Visit: https://github.com/0xYamando/ShadowTrade

Should see:
- ✅ All files uploaded
- ✅ README.md displayed
- ✅ Deploy button visible

## Step 5: Deploy to Vercel

Click the deploy button in README or go to:
https://vercel.com/new/clone?repository-url=https://github.com/0xYamando/ShadowTrade&root-directory=shadowtrade/frontend

Done! 🎉
