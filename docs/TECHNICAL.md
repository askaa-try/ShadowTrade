# ShadowTrade - Dokumentasi Teknis

## Arsitektur Sistem

### 1. Blockchain Layer (Aleo)
- **Smart Contract**: `shadowtrade_strategy.aleo`
- **Fungsi Utama**:
  - `register_strategy`: Mendaftarkan strategi trading baru
  - `execute_strategy`: Menjalankan strategi dan generate signal
  - `subscribe`: Subscribe ke strategi
  - `verify_signal`: Verifikasi authenticity signal
  - `update_performance`: Update metrics performa

### 2. Backend Layer (Node.js)
- **API Server**: Express.js REST API
- **Database**: PostgreSQL untuk data user dan subscription
- **Cache**: Redis untuk real-time signal queue
- **Services**:
  - Strategy Service: Manage trading strategies
  - Signal Service: Handle signal distribution
  - Subscription Service: Manage subscriptions
  - User Service: Authentication & authorization

### 3. Frontend Layer (React)
- **Web App**: React + TypeScript
- **Pages**:
  - Home: Landing page
  - Marketplace: Browse strategies
  - Strategy Detail: Detail strategi dan subscribe
  - Dashboard: User dashboard
  - Create Strategy: Form untuk create strategi baru
- **Integration**: Aleo SDK untuk blockchain interaction

## Alur Kerja

### Provider (Trader) Flow:
1. Connect wallet Aleo
2. Create strategi trading (Leo program)
3. Deploy program ke Aleo blockchain
4. Register di marketplace
5. Execute strategi secara regular
6. Signal dienkrip dan dikirim ke subscriber
7. Performance metrics ter-update otomatis

### Subscriber (User) Flow:
1. Browse marketplace
2. View verified performance metrics
3. Subscribe dengan payment
4. Receive encrypted signals
5. Decrypt dan execute trades
6. Verify signal authenticity

## Keamanan

### Zero-Knowledge Proofs:
- Strategi trading di-encode sebagai private program
- Logic tidak dapat dibaca siapapun
- Hanya output (signal) yang visible
- Setiap execution menghasilkan ZK proof

### Enkripsi:
- End-to-end encryption untuk signal delivery
- Time-locked encryption (auto-expire)
- Watermarking untuk tracking redistribution

### Smart Contract Security:
- Formal verification
- Multi-sig untuk admin operations
- Time-locks untuk sensitive updates

## Development Setup

### Prerequisites:
```bash
# Install Aleo CLI
curl -L https://aleo.tools/install | bash

# Install Node.js 18+
nvm install 18

# Install PostgreSQL
brew install postgresql@14
```

### Setup Blockchain:
```bash
cd blockchain
aleo build
aleo deploy --network testnet3
```

### Setup Backend:
```bash
cd backend
npm install
cp .env.example .env
# Edit .env dengan konfigurasi Anda
npm run migrate
npm run dev
```

### Setup Frontend:
```bash
cd frontend
npm install
npm start
```

## Testing

### Smart Contract Testing:
```bash
cd blockchain
aleo test
```

### Backend Testing:
```bash
cd backend
npm test
```

### Frontend Testing:
```bash
cd frontend
npm test
```

## Deployment

### Blockchain:
```bash
aleo deploy --network mainnet
```

### Backend:
```bash
# Deploy ke cloud provider (AWS, GCP, Azure)
docker build -t shadowtrade-backend .
docker push your-registry/shadowtrade-backend
```

### Frontend:
```bash
npm run build
# Deploy ke Vercel, Netlify, atau CDN
```

## Monitoring

- **Blockchain**: Aleo Explorer
- **Backend**: CloudWatch / Datadog
- **Frontend**: Google Analytics / Mixpanel

## Support

- Email: support@shadowtrade.io
- Discord: discord.gg/shadowtrade
- Documentation: docs.shadowtrade.io
