# 🚀 ShadowTrade - Setup & Deployment Guide

## 📋 Prerequisites

- Node.js 18+
- Aleo CLI
- PostgreSQL 14+ (optional for MVP)
- Git

## 🔧 Quick Start

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/shadowtrade.git
cd shadowtrade
```

### 2. Install Aleo CLI

```bash
curl -L https://aleo.tools/install | bash
aleo --version
```

### 3. Setup Smart Contract

```bash
cd blockchain

# Build contract
aleo build

# Create test account
aleo account new

# Deploy to testnet (save the program ID!)
aleo deploy --network testnet3 --private-key YOUR_PRIVATE_KEY

# Test contract
aleo test
```

### 4. Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your configuration
nano .env

# Start server
npm run dev
```

Backend will run on: http://localhost:3000

### 5. Setup Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

Frontend will run on: http://localhost:5173

## 🌐 Environment Variables

### Backend (.env)

```env
# Server
PORT=3000
NODE_ENV=development

# Database (optional for MVP)
DB_HOST=localhost
DB_PORT=5432
DB_NAME=shadowtrade
DB_USER=postgres
DB_PASSWORD=your_password

# JWT
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRES_IN=7d

# Aleo
ALEO_NETWORK=testnet3
ALEO_PRIVATE_KEY=your_aleo_private_key
ALEO_PROGRAM_ID=shadowtrade.aleo
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:3000/api
VITE_ALEO_NETWORK=testnet3
```

## 📦 Project Structure

```
shadowtrade/
├── blockchain/          # Aleo smart contracts
│   ├── main.aleo       # Main contract
│   └── program.json    # Config
│
├── backend/            # Node.js API
│   ├── src/
│   │   ├── routes/    # API routes
│   │   ├── controllers/
│   │   ├── services/  # Business logic
│   │   └── index.js
│   └── package.json
│
├── frontend/           # React + Vite
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   └── package.json
│
└── docs/              # Documentation
```

## 🧪 Testing

### Smart Contract

```bash
cd blockchain
aleo test
```

### Backend

```bash
cd backend
npm test
```

### Frontend

```bash
cd frontend
npm test
```

## 🚀 Deployment

### Deploy Smart Contract to Mainnet

```bash
cd blockchain

# Build for production
aleo build --release

# Deploy to mainnet
aleo deploy --network mainnet --private-key YOUR_PRIVATE_KEY

# Save the program ID!
```

### Deploy Backend

#### Option 1: Docker

```bash
cd backend

# Build image
docker build -t shadowtrade-backend .

# Run container
docker run -p 3000:3000 --env-file .env shadowtrade-backend
```

#### Option 2: PM2

```bash
cd backend

# Install PM2
npm install -g pm2

# Start with PM2
pm2 start src/index.js --name shadowtrade-api

# Save PM2 config
pm2 save

# Setup startup script
pm2 startup
```

#### Option 3: Cloud Platforms

**Vercel:**
```bash
cd backend
vercel --prod
```

**Railway:**
```bash
cd backend
railway up
```

### Deploy Frontend

#### Vercel (Recommended)

```bash
cd frontend

# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

#### Netlify

```bash
cd frontend

# Build
npm run build

# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

## 📊 Monitoring

### Backend Health Check

```bash
curl http://localhost:3000/health
```

### Frontend

Open browser: http://localhost:5173

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

### Aleo Build Errors

```bash
# Clean build
cd blockchain
rm -rf build/
aleo clean
aleo build
```

### Node Modules Issues

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

## 📝 Development Workflow

### 1. Create Feature Branch

```bash
git checkout -b feature/your-feature
```

### 2. Make Changes

```bash
# Edit files
# Test locally
```

### 3. Commit & Push

```bash
git add .
git commit -m "feat: your feature description"
git push origin feature/your-feature
```

### 4. Create Pull Request

- Go to GitHub
- Create PR from your branch
- Wait for review

## 🎯 Hackathon Checklist

- [ ] Smart contract deployed to testnet
- [ ] Backend API running
- [ ] Frontend deployed
- [ ] Demo video recorded
- [ ] Documentation complete
- [ ] GitHub repo public
- [ ] Pitch deck ready

## 📞 Support

- GitHub Issues: https://github.com/yourusername/shadowtrade/issues
- Discord: discord.gg/shadowtrade
- Email: support@shadowtrade.io

## 📄 License

MIT License - see LICENSE file for details

---

**Built with ❤️ for Aleo Hackathon**
