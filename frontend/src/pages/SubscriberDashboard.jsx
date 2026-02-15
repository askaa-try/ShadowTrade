import { useState, useEffect } from 'react';
import { getMySubscriptions } from '../services/api';
import './SubscriberDashboard.css';

function SubscriberDashboard() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [signals, setSignals] = useState([
    { id: 1, strategy: 'BTC Momentum Pro', type: 'BUY', price: 45000, time: '2 min ago' },
    { id: 2, strategy: 'ETH Swing Trader', type: 'SELL', price: 2800, time: '15 min ago' },
    { id: 3, strategy: 'BTC Momentum Pro', type: 'BUY', price: 44500, time: '1 hour ago' }
  ]);

  useEffect(() => {
    loadSubscriptions();
  }, []);

  const loadSubscriptions = async () => {
    try {
      const data = await getMySubscriptions();
      setSubscriptions(data);
    } catch (error) {
      console.error('Failed to load subscriptions');
    }
  };

  return (
    <div className="subscriber-dashboard">
      <h1>💼 My Dashboard</h1>

      <div className="dashboard-grid">
        <div className="signals-feed">
          <h2>📡 Live Signals</h2>
          {signals.map(signal => (
            <div key={signal.id} className={`signal-card ${signal.type.toLowerCase()}`}>
              <div className="signal-header">
                <span className="signal-type">{signal.type}</span>
                <span className="signal-time">{signal.time}</span>
              </div>
              <div className="signal-strategy">{signal.strategy}</div>
              <div className="signal-price">${signal.price.toLocaleString()}</div>
              <button className="btn-execute">Execute Trade</button>
            </div>
          ))}
        </div>

        <div className="subscriptions-panel">
          <h2>📋 Active Subscriptions</h2>
          {subscriptions.length === 0 ? (
            <p className="empty-state">No active subscriptions</p>
          ) : (
            subscriptions.map(sub => (
              <div key={sub.id} className="subscription-card">
                <h3>{sub.strategyName || 'Strategy'}</h3>
                <div className="sub-info">
                  <span>💰 ${sub.price}/mo</span>
                  <span>⏰ {Math.floor((sub.expiry - Date.now()) / (1000 * 60 * 60 * 24))} days left</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default SubscriberDashboard;
