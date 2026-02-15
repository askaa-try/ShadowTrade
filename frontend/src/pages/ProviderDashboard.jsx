import { useState, useEffect } from 'react';
import { getStrategies, getSignals } from '../services/api';
import './ProviderDashboard.css';

function ProviderDashboard() {
  const [strategies, setStrategies] = useState([]);
  const [stats, setStats] = useState({ revenue: 0, subscribers: 0, signals: 0 });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await getStrategies();
    setStrategies(data);
    
    const totalRevenue = data.reduce((sum, s) => sum + (s.price * s.subscribers * 0.75), 0);
    const totalSubs = data.reduce((sum, s) => sum + s.subscribers, 0);
    const totalSignals = data.reduce((sum, s) => sum + (s.performance?.totalSignals || 0), 0);
    
    setStats({ revenue: totalRevenue, subscribers: totalSubs, signals: totalSignals });
  };

  return (
    <div className="provider-dashboard">
      <h1>📊 Provider Dashboard</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">${stats.revenue}</div>
          <div className="stat-label">Monthly Revenue</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.subscribers}</div>
          <div className="stat-label">Total Subscribers</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.signals}</div>
          <div className="stat-label">Signals Published</div>
        </div>
      </div>

      <div className="strategies-section">
        <h2>Your Strategies</h2>
        {strategies.map(s => (
          <div key={s.id} className="strategy-item">
            <h3>{s.name}</h3>
            <div className="strategy-stats">
              <span>💰 ${s.price}/mo</span>
              <span>👥 {s.subscribers} subs</span>
              <span>📈 {s.performance?.winRate || 0}% win rate</span>
            </div>
            <button className="btn-publish">Publish Signal</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProviderDashboard;
