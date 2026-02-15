#!/usr/bin/env node

const axios = require('axios');

const API_URL = process.env.API_URL || 'http://localhost:3000';

async function testAPI() {
  console.log('🧪 Testing ShadowTrade API...\n');

  try {
    // 1. Health Check
    console.log('1️⃣ Testing health endpoint...');
    const health = await axios.get(`${API_URL}/health`);
    console.log('✅ Health:', health.data);

    // 2. Get Strategies
    console.log('\n2️⃣ Testing get strategies...');
    const strategies = await axios.get(`${API_URL}/api/strategies`);
    console.log('✅ Strategies:', strategies.data.length, 'found');
    console.log('   First strategy:', strategies.data[0]?.name);

    // 3. Get Strategy Detail
    if (strategies.data.length > 0) {
      console.log('\n3️⃣ Testing get strategy detail...');
      const strategyId = strategies.data[0].id;
      const detail = await axios.get(`${API_URL}/api/strategies/${strategyId}`);
      console.log('✅ Strategy detail:', detail.data.name);
    }

    // 4. Login (Wallet Connect)
    console.log('\n4️⃣ Testing wallet login...');
    const login = await axios.post(`${API_URL}/api/users/login`, {
      walletAddress: 'aleo1test123456789'
    });
    console.log('✅ Login successful');
    const token = login.data.token;

    // 5. Get Profile
    console.log('\n5️⃣ Testing get profile...');
    const profile = await axios.get(`${API_URL}/api/users/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Profile:', profile.data);

    // 6. Create Strategy
    console.log('\n6️⃣ Testing create strategy...');
    const newStrategy = await axios.post(
      `${API_URL}/api/strategies`,
      {
        name: 'Test Strategy',
        description: 'Test strategy for API testing',
        price: 50,
        provider: 'aleo1test123456789'
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log('✅ Strategy created:', newStrategy.data.id);

    // 7. Subscribe
    console.log('\n7️⃣ Testing subscription...');
    const subscription = await axios.post(
      `${API_URL}/api/subscriptions`,
      {
        strategyId: strategies.data[0].id,
        duration: 30,
        provider: strategies.data[0].provider,
        price: strategies.data[0].price
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log('✅ Subscription created:', subscription.data.id);

    // 8. Get Subscriptions
    console.log('\n8️⃣ Testing get subscriptions...');
    const subs = await axios.get(`${API_URL}/api/subscriptions`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Subscriptions:', subs.data.length, 'found');

    console.log('\n✅ All tests passed! 🎉\n');
  } catch (error) {
    console.error('\n❌ Test failed:', error.response?.data || error.message);
    process.exit(1);
  }
}

testAPI();
