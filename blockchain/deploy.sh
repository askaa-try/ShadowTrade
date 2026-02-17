#!/bin/bash

# ShadowTrade Contract Deployment Script
# Usage: ./deploy.sh <YOUR_PRIVATE_KEY>

set -e

if [ -z "$1" ]; then
    echo "❌ Error: Private key required"
    echo "Usage: ./deploy.sh <YOUR_PRIVATE_KEY>"
    exit 1
fi

PRIVATE_KEY=$1

echo "🚀 Deploying ShadowTrade Contract to Aleo Testnet..."
echo ""

# Check if Leo is installed
if ! command -v leo &> /dev/null; then
    echo "❌ Leo CLI not found. Installing..."
    curl -L https://raw.githubusercontent.com/AleoHQ/leo/testnet/install.sh | bash
    source ~/.bashrc
fi

echo "✅ Leo CLI found"
echo ""

# Build contract
echo "📦 Building contract..."
leo build

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

echo "✅ Build successful"
echo ""

# Deploy to testnet
echo "🌐 Deploying to testnet..."
leo deploy --network testnet --private-key $PRIVATE_KEY

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Deployment successful!"
    echo ""
    echo "📝 Next steps:"
    echo "1. Save the program ID from the output above"
    echo "2. Update frontend/src/App.jsx with the program ID"
    echo "3. Update backend/src/services/AleoService.js with the program ID"
    echo "4. Test the contract functions"
else
    echo ""
    echo "❌ Deployment failed"
    echo "Check the error message above"
    exit 1
fi
