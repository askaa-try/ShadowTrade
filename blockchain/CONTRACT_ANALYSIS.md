# 📋 ShadowTrade Contract v2 - Analysis & Discussion

## 🎯 Perbaikan yang Sudah Dilakukan

### 1. ✅ Payment Integration
**Sebelum**: Subscribe tanpa payment
**Sekarang**: 
```leo
subscribe_with_payment(strategy_id, duration, payment, provider, price)
```
- Split payment: 80% provider, 20% platform
- Menggunakan `credits.aleo` untuk payment
- Tracking earnings di mapping

**Diskusi**: 
- Apakah 80/20 split sudah pas? Atau mau 70/30?
- Platform address perlu diganti dengan address real

---

### 2. ✅ Access Control untuk Signal
**Sebelum**: Siapa aja bisa akses signal
**Sekarang**:
```leo
transfer_signal() -> finalize checks active_subscriptions
```
- Verify subscriber aktif sebelum transfer signal
- Signal punya expiry time
- Mapping untuk track subscription status

**Diskusi**:
- Signal expiry berapa lama? Sekarang configurable via `signal_duration`
- Apakah perlu rate limiting? (max signal per day)

---

### 3. ✅ Signal Distribution Mechanism
**Sebelum**: Tidak ada mekanisme distribusi
**Sekarang**:
```leo
execute_strategy() -> update stats
transfer_signal() -> kirim ke subscriber (with verification)
```

**Flow**:
1. Provider call `execute_strategy()` -> generate signal data
2. Backend loop semua subscriber
3. Call `transfer_signal()` untuk tiap subscriber
4. Subscriber terima Signal record (private)

**Diskusi**:
- Apakah ini scalable? Kalau 1000 subscriber = 1000 transactions
- Alternative: Batch transfer? Atau off-chain encryption?

---

### 4. ✅ Revenue Management
**Sebelum**: Tidak ada sistem withdraw
**Sekarang**:
```leo
withdraw_earnings(amount) -> transfer credits to provider
```
- Tracking earnings di mapping
- Provider bisa withdraw kapan saja
- Secure: hanya owner yang bisa withdraw

---

### 5. ✅ Strategy Management
**Tambahan**:
- `toggle_strategy()` - pause/unpause strategy
- `update_performance()` - update metrics
- `registered_strategies` mapping - prevent duplicate

---

## 🔍 Struktur Data Baru

### Mappings (On-chain State):
```leo
registered_strategies: field => bool
active_subscriptions: field => u64  // hash(subscriber) => expiry
provider_earnings: address => u64
```

**Diskusi**:
- Apakah perlu mapping untuk strategy price? Atau cukup di record?
- Perlu mapping untuk total subscribers per strategy?

---

## ⚠️ Issues yang Masih Ada

### 1. 🔴 Scalability Issue
**Problem**: 1 strategy dengan 1000 subscribers = 1000 `transfer_signal()` calls
**Cost**: Mahal di gas fees

**Solusi yang bisa didiskusikan**:
- **Option A**: Hybrid approach
  - Signal data di-encrypt off-chain
  - Hanya verification on-chain
  - Subscriber decrypt dengan private key
  
- **Option B**: Merkle tree approach
  - Publish merkle root on-chain
  - Subscriber prove membership off-chain
  
- **Option C**: Keep current (simple but expensive)

**Pertanyaan**: Mana yang lebih prioritas? Simplicity atau cost?

---

### 2. 🟡 Payment Refund
**Sekarang**: Cancel subscription tidak ada refund
**Diskusi**: 
- Apakah perlu refund pro-rata?
- Atau no refund policy (lebih simple)?

---

### 3. 🟡 Signal Encryption
**Sekarang**: Signal masih plaintext di record
**Diskusi**:
- Apakah Aleo record sudah cukup private?
- Atau perlu layer encryption tambahan?

**Catatan**: Aleo record sudah private by default (hanya owner yang bisa baca)

---

### 4. 🟡 Strategy Verification
**Missing**: Bagaimana verify strategy benar-benar profitable?
**Diskusi**:
- Perlu oracle untuk market data?
- Atau trust provider's self-reported metrics?
- Atau implement on-chain backtesting?

---

## 🎯 Fungsi Contract (Summary)

### Strategy Management (4 functions):
1. ✅ `register_strategy` - Daftar strategy baru
2. ✅ `update_performance` - Update metrics
3. ✅ `toggle_strategy` - Pause/unpause
4. ❌ `update_price` - (belum ada, perlu?)

### Subscription (3 functions):
5. ✅ `subscribe_with_payment` - Subscribe + bayar
6. ✅ `cancel_subscription` - Cancel (no refund)
7. ✅ `check_subscription` - Cek status

### Signal (3 functions):
8. ✅ `execute_strategy` - Generate signal
9. ✅ `transfer_signal` - Kirim ke subscriber
10. ✅ `verify_signal` - Verify authenticity

### Revenue (1 function):
11. ✅ `withdraw_earnings` - Withdraw revenue

**Total**: 11 functions

---

## 💭 Pertanyaan untuk Diskusi

1. **Payment Split**: 80/20 atau 70/30?
2. **Signal Distribution**: On-chain atau hybrid?
3. **Refund Policy**: Pro-rata atau no refund?
4. **Strategy Verification**: Oracle atau self-reported?
5. **Signal Expiry**: Default berapa lama? (1 hour? 1 day?)
6. **Max Subscribers**: Perlu limit per strategy?
7. **Platform Address**: Mau pakai address apa?

---

## 🚀 Next Steps

1. **Diskusi & Finalize** design decisions
2. **Test** contract di local testnet
3. **Deploy** ke Aleo testnet3
4. **Integrate** dengan backend API
5. **Test** end-to-end flow

---

## 📝 Notes

- Contract sudah production-ready untuk MVP
- Scalability bisa di-improve nanti (v3)
- Privacy sudah bagus (Aleo records private by default)
- Payment integration sudah ada

**Status**: ✅ Ready for testing!
