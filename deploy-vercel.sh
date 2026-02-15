#!/bin/bash

echo "🚀 Deploying to Vercel..."

cd frontend

# Check if vercel is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Build
echo "🔨 Building..."
npm run build

# Deploy
echo "🚀 Deploying..."
vercel --prod

echo "✅ Done!"
