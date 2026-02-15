#!/bin/bash

# 🚀 ShadowTrade - One Command Deploy

echo "🌑 SHADOWTRADE - DEPLOY EVERYTHING"
echo "=================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Check if backend is running
echo -e "${YELLOW}⏳ Checking backend...${NC}"
if curl -s http://localhost:3000/health > /dev/null; then
    echo -e "${GREEN}✅ Backend is running!${NC}"
else
    echo -e "${RED}❌ Backend not running. Start it first:${NC}"
    echo "   cd backend && npm run dev"
    exit 1
fi

# Check if frontend is running
echo -e "${YELLOW}⏳ Checking frontend...${NC}"
if curl -s http://localhost:5173 > /dev/null; then
    echo -e "${GREEN}✅ Frontend is running!${NC}"
else
    echo -e "${RED}❌ Frontend not running. Start it first:${NC}"
    echo "   cd frontend && npm run dev"
    exit 1
fi

echo ""
echo -e "${GREEN}🎉 Everything is ready!${NC}"
echo ""
echo "📋 Next steps:"
echo "1. Deploy contract: cd blockchain && aleo deploy"
echo "2. Deploy backend: cd backend && railway up"
echo "3. Deploy frontend: cd frontend && vercel --prod"
echo ""
echo "🎮 Or try the interactive demo:"
echo "   cd backend && node demo.js"
echo ""
