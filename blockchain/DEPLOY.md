# Deploy ShadowTrade Contract to Aleo Testnet

## Prerequisites

1. **Leo CLI installed**
```bash
curl -L https://raw.githubusercontent.com/AleoHQ/leo/testnet/install.sh | bash
```

2. **Aleo wallet with testnet credits**
   - Get testnet credits from: https://faucet.aleo.org/

3. **Your private key ready**

## Deployment Steps

### 1. Fix Platform Address

Edit `shadowtrade.aleo` line 139 and replace `aleo1platform_address_here` with your actual platform address.

### 2. Build Contract

```bash
cd shadowtrade/blockchain
leo build
```

### 3. Deploy to Testnet

```bash
leo deploy --network testnet --private-key <YOUR_PRIVATE_KEY>
```

Or use the deploy script:

```bash
chmod +x deploy.sh
./deploy.sh <YOUR_PRIVATE_KEY>
```

### 4. Save Program ID

After successful deployment, save the program ID (it will be shown in the output).

Example output:
```
✅ Successfully deployed program 'shadowtrade.aleo'
Program ID: shadowtrade.aleo
```

### 5. Update Frontend & Backend

Update the program ID in:
- `frontend/src/App.jsx` - line 33: `programs={['shadowtrade.aleo']}`
- `backend/src/services/AleoService.js` - PROGRAM_ID constant

## Contract Functions

### Strategy Management
- `register_strategy(strategy_id, price)` - Register new strategy
- `update_performance(strategy, win_rate, roi)` - Update stats
- `toggle_strategy(strategy)` - Pause/unpause

### Subscription
- `subscribe_with_payment(strategy_id, duration, payment, provider, price)` - Subscribe with payment split
- `cancel_subscription(subscription)` - Cancel subscription

### Signal Distribution
- `execute_strategy(strategy, market_data, ...)` - Generate signal
- `transfer_signal(strategy_id, subscriber, ...)` - Send signal to subscriber
- `verify_signal(signal, strategy_id)` - Verify signal authenticity

### Revenue
- `withdraw_earnings(amount)` - Provider withdraws earnings
- `check_subscription(subscription)` - Check if subscription is active

## Testing on Testnet

After deployment, test the contract:

```bash
# Register a strategy
leo run register_strategy <strategy_id> <price>

# Subscribe to strategy
leo run subscribe_with_payment <strategy_id> <duration> <payment> <provider> <price>
```

## Troubleshooting

**Error: Insufficient credits**
- Get more testnet credits from faucet

**Error: Program already exists**
- Change program name in `program.json`

**Error: Invalid private key**
- Check your private key format

## Next Steps

1. ✅ Deploy contract
2. Update program ID in frontend/backend
3. Test contract functions
4. Document deployed contract address in README
