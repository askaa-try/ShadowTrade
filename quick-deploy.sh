#!/bin/bash

echo "🚀 ShadowTrade - Quick Deploy"
echo "=============================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

echo -e "${BLUE}📋 Deployment Options:${NC}"
echo ""
echo "1. 🎯 Deploy Frontend to Vercel"
echo "2. 🚂 Deploy Backend to Railway"
echo "3. 🌐 Deploy Frontend to Netlify"
echo "4. 📦 Deploy Everything"
echo "5. 🧪 Test Local Setup"
echo ""

read -p "Choose option (1-5): " choice

case $choice in
    1)
        echo -e "${YELLOW}🎯 Deploying Frontend to Vercel...${NC}"
        
        if ! command_exists vercel; then
            echo -e "${YELLOW}Installing Vercel CLI...${NC}"
            npm install -g vercel
        fi
        
        cd frontend
        echo -e "${GREEN}✅ Building frontend...${NC}"
        npm run build
        
        echo -e "${GREEN}✅ Deploying to Vercel...${NC}"
        vercel --prod
        
        echo -e "${GREEN}🎉 Frontend deployed!${NC}"
        ;;
        
    2)
        echo -e "${YELLOW}🚂 Deploying Backend to Railway...${NC}"
        
        if ! command_exists railway; then
            echo -e "${YELLOW}Installing Railway CLI...${NC}"
            npm install -g @railway/cli
        fi
        
        cd backend
        echo -e "${GREEN}✅ Deploying to Railway...${NC}"
        railway login
        railway link
        railway up
        
        echo -e "${GREEN}🎉 Backend deployed!${NC}"
        ;;
        
    3)
        echo -e "${YELLOW}🌐 Deploying Frontend to Netlify...${NC}"
        
        if ! command_exists netlify; then
            echo -e "${YELLOW}Installing Netlify CLI...${NC}"
            npm install -g netlify-cli
        fi
        
        cd frontend
        echo -e "${GREEN}✅ Building frontend...${NC}"
        npm run build
        
        echo -e "${GREEN}✅ Deploying to Netlify...${NC}"
        netlify deploy --prod
        
        echo -e "${GREEN}🎉 Frontend deployed!${NC}"
        ;;
        
    4)
        echo -e "${YELLOW}📦 Deploying Everything...${NC}"
        
        # Backend first
        echo -e "${BLUE}Step 1/2: Backend${NC}"
        cd backend
        if command_exists railway; then
            railway up
        else
            echo -e "${RED}Railway CLI not found. Install: npm install -g @railway/cli${NC}"
        fi
        
        # Frontend
        echo -e "${BLUE}Step 2/2: Frontend${NC}"
        cd ../frontend
        npm run build
        if command_exists vercel; then
            vercel --prod
        else
            echo -e "${RED}Vercel CLI not found. Install: npm install -g vercel${NC}"
        fi
        
        echo -e "${GREEN}🎉 Everything deployed!${NC}"
        ;;
        
    5)
        echo -e "${YELLOW}🧪 Testing Local Setup...${NC}"
        
        # Check backend
        echo -e "${BLUE}Checking backend...${NC}"
        if curl -s http://localhost:3000/health > /dev/null; then
            echo -e "${GREEN}✅ Backend is running${NC}"
        else
            echo -e "${RED}❌ Backend not running${NC}"
            echo "Start with: cd backend && npm run dev"
        fi
        
        # Check frontend
        echo -e "${BLUE}Checking frontend...${NC}"
        if curl -s http://localhost:5173 > /dev/null; then
            echo -e "${GREEN}✅ Frontend is running${NC}"
        else
            echo -e "${RED}❌ Frontend not running${NC}"
            echo "Start with: cd frontend && npm run dev"
        fi
        ;;
        
    *)
        echo -e "${RED}Invalid option${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}✅ Done!${NC}"
echo ""
echo "📝 Next steps:"
echo "1. Update frontend env with backend URL"
echo "2. Test deployed app"
echo "3. Create demo video"
echo "4. Make pitch deck"
echo ""
