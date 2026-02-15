# ShadowTrade - Deployment Guide

## Prerequisites

1. **Aleo Account**
   - Create Aleo wallet: https://aleo.tools
   - Get testnet tokens from faucet
   - Save private key securely

2. **Infrastructure**
   - PostgreSQL 14+ database
   - Redis server
   - Node.js 18+ runtime
   - Domain name (optional)

## Step 1: Deploy Smart Contract

```bash
cd blockchain

# Build the program
aleo build

# Deploy to testnet
aleo deploy --network testnet3 --private-key YOUR_PRIVATE_KEY

# Save the program ID
# Example: shadowtrade_strategy.aleo
```

## Step 2: Setup Database

```bash
# Create database
createdb shadowtrade

# Run migrations
cd backend
npm run migrate
```

## Step 3: Configure Backend

```bash
cd backend

# Copy environment template
cp .env.example .env

# Edit .env file with your configuration:
# - Database credentials
# - Aleo program ID
# - JWT secret
# - API keys
```

## Step 4: Deploy Backend

### Option A: Docker
```bash
docker build -t shadowtrade-backend .
docker run -p 3000:3000 shadowtrade-backend
```

### Option B: PM2
```bash
npm install -g pm2
pm2 start src/index.js --name shadowtrade-api
pm2 save
```

### Option C: Cloud Platform
- **AWS**: Deploy to Elastic Beanstalk or ECS
- **GCP**: Deploy to Cloud Run or App Engine
- **Azure**: Deploy to App Service

## Step 5: Deploy Frontend

```bash
cd frontend

# Build production bundle
npm run build

# Deploy to hosting platform
```

### Hosting Options:

**Vercel** (Recommended):
```bash
npm install -g vercel
vercel --prod
```

**Netlify**:
```bash
npm install -g netlify-cli
netlify deploy --prod
```

**AWS S3 + CloudFront**:
```bash
aws s3 sync build/ s3://your-bucket-name
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

## Step 6: Configure DNS

Point your domain to:
- Frontend: Vercel/Netlify URL or CloudFront distribution
- Backend API: Load balancer or server IP

Example DNS records:
```
A     shadowtrade.io          -> Frontend IP
CNAME api.shadowtrade.io      -> Backend URL
```

## Step 7: SSL/TLS Setup

- Use Let's Encrypt for free SSL certificates
- Or use cloud provider's certificate manager
- Ensure HTTPS is enforced

## Step 8: Monitoring Setup

### Backend Monitoring:
```bash
# Install monitoring agent
npm install --save @sentry/node

# Configure in backend
```

### Blockchain Monitoring:
- Use Aleo Explorer: https://explorer.aleo.org
- Set up alerts for failed transactions

## Step 9: Testing

```bash
# Test blockchain
cd blockchain
aleo test

# Test backend
cd backend
npm test

# Test frontend
cd frontend
npm test

# Integration test
curl https://api.shadowtrade.io/health
```

## Step 10: Go Live

1. Update environment to production
2. Enable rate limiting
3. Configure CORS properly
4. Set up backup systems
5. Monitor logs and metrics

## Maintenance

### Regular Tasks:
- Monitor blockchain transactions
- Check database performance
- Review error logs
- Update dependencies
- Backup database regularly

### Scaling:
- Add more backend instances
- Use CDN for frontend
- Implement caching strategy
- Optimize database queries

## Troubleshooting

### Common Issues:

**Blockchain connection failed**:
- Check Aleo network status
- Verify private key
- Ensure sufficient balance

**Database connection error**:
- Check credentials
- Verify network access
- Check connection pool settings

**Frontend not loading**:
- Clear browser cache
- Check API endpoint configuration
- Verify CORS settings

## Support

For deployment assistance:
- Email: devops@shadowtrade.io
- Discord: discord.gg/shadowtrade
- Documentation: docs.shadowtrade.io
