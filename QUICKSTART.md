# 🚀 ShadowTrade - Quick Start Guide

## Selamat Datang!

Aplikasi ShadowTrade telah berhasil dibuat berdasarkan dokumentasi. Berikut adalah panduan cepat untuk memulai.

## 📁 Struktur Proyek

```
shadowtrade/
├── blockchain/         # Aleo Smart Contracts
├── backend/           # Node.js API Server  
├── frontend/          # React Web App
└── docs/             # Dokumentasi
```

## ⚡ Quick Start (Development)

### 1️⃣ Install Aleo CLI

```bash
# Install Aleo
curl -L https://aleo.tools/install | bash

# Verify installation
aleo --version
```

### 2️⃣ Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env dengan konfigurasi Anda:
# - Database credentials
# - JWT secret
# - Aleo configuration

# Start development server
npm run dev
```

Backend akan berjalan di: http://localhost:3000

### 3️⃣ Setup Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

Frontend akan berjalan di: http://localhost:3001

### 4️⃣ Build Smart Contract

```bash
cd blockchain

# Build Aleo program
aleo build

# Test program
aleo test
```

## 🔧 Konfigurasi Database

### PostgreSQL Setup:

```bash
# Install PostgreSQL (macOS)
brew install postgresql@14

# Start PostgreSQL
brew services start postgresql@14

# Create database
createdb shadowtrade

# Create user (optional)
psql postgres
CREATE USER shadowtrade WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE shadowtrade TO shadowtrade;
```

### Redis Setup:

```bash
# Install Redis (macOS)
brew install redis

# Start Redis
brew services start redis
```

## 🌐 Environment Variables

Edit `backend/.env`:

```env
# Server
PORT=3000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=shadowtrade
DB_USER=postgres
DB_PASSWORD=your_password

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# JWT
JWT_SECRET=your_secret_key_here
JWT_EXPIRES_IN=7d

# Aleo
ALEO_NETWORK=testnet3
ALEO_PRIVATE_KEY=your_private_key
ALEO_PROGRAM_ID=shadowtrade_strategy.aleo
```

## 📝 Testing

### Test Smart Contract:
```bash
cd blockchain
aleo test
```

### Test Backend:
```bash
cd backend
npm test
```

### Test Frontend:
```bash
cd frontend
npm test
```

## 🎯 Fitur yang Sudah Dibuat

### ✅ Smart Contract (Aleo):
- Register strategy
- Execute strategy & generate signals
- Subscribe to strategies
- Verify signals
- Update performance metrics

### ✅ Backend API:
- User authentication (register/login)
- Strategy management (CRUD)
- Signal distribution
- Subscription management
- Performance tracking

### ✅ Frontend:
- Landing page
- Marketplace untuk browse strategies
- Navigation component
- API integration
- Responsive design

## 🔐 Keamanan

- ✅ Zero-Knowledge Proofs untuk private computation
- ✅ JWT authentication untuk API
- ✅ Encrypted signal delivery
- ✅ Private strategy execution

## 📚 Dokumentasi Lengkap

- **README.md**: Overview proyek
- **PROJECT_SUMMARY.md**: Summary lengkap
- **docs/TECHNICAL.md**: Dokumentasi teknis
- **docs/DEPLOYMENT.md**: Panduan deployment

## 🐛 Troubleshooting

### Port sudah digunakan:
```bash
# Cek port yang digunakan
lsof -i :3000
lsof -i :3001

# Kill process
kill -9 <PID>
```

### Database connection error:
```bash
# Cek PostgreSQL status
brew services list

# Restart PostgreSQL
brew services restart postgresql@14
```

### Aleo build error:
```bash
# Clean build
rm -rf build/

# Rebuild
aleo build
```

## 🚀 Next Steps

1. **Customize**: Edit konfigurasi sesuai kebutuhan
2. **Develop**: Tambahkan fitur baru
3. **Test**: Jalankan testing lengkap
4. **Deploy**: Deploy ke production

## 📞 Bantuan

Jika ada pertanyaan atau masalah:
- Baca dokumentasi di folder `docs/`
- Check PROJECT_SUMMARY.md untuk overview
- Review kode di setiap folder

## 🎉 Selamat!

Aplikasi ShadowTrade siap untuk dikembangkan lebih lanjut!

---

**Happy Coding! 🚀**
