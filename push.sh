#!/bin/bash

# Safe push script
cd shadowtrade

echo "🚀 Pushing to GitHub..."
echo ""
echo "Repo: https://github.com/askaa-try/ShadowTrade"
echo ""

# Push with token prompt
git push -u origin main

echo ""
echo "✅ Done!"
echo ""
echo "Visit: https://github.com/askaa-try/ShadowTrade"
echo "Deploy: https://vercel.com/new/clone?repository-url=https://github.com/askaa-try/ShadowTrade&root-directory=shadowtrade/frontend"
