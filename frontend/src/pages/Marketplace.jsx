import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getStrategies } from '../services/api';
import './Marketplace.css';

function Marketplace() {
  const [strategies, setStrategies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadStrategies();
  }, []);

  const loadStrategies = async () => {
    try {
      const data = await getStrategies();
      setStrategies(data);
    } catch (error) {
      console.error('Failed to load strategies:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="marketplace"><h1>Loading strategies...</h1></div>;
  }

  return (
    <div className="marketplace">
      <h1>Strategy Marketplace</h1>
      
      <div className="filters">
        <button 
          className={filter === 'all' ? 'filter-btn active' : 'filter-btn'}
          onClick={() => setFilter('all')}
        >
          All Strategies
        </button>
        <button 
          className={filter === 'top' ? 'filter-btn active' : 'filter-btn'}
          onClick={() => setFilter('top')}
        >
          Top Performers
        </button>
        <button 
          className={filter === 'new' ? 'filter-btn active' : 'filter-btn'}
          onClick={() => setFilter('new')}
        >
          New Strategies
        </button>
      </div>

      <div className="strategy-grid">
        {strategies.map(strategy => (
          <Link to={`/strategy/${strategy.id}`} key={strategy.id} className="strategy-card">
            <h3>{strategy.name}</h3>
            <div className="metrics">
              <div className="metric">
                <span className="label">Win Rate</span>
                <span className="value">{strategy.performance?.winRate || 0}%</span>
              </div>
              <div className="metric">
                <span className="label">Signals</span>
                <span className="value">{strategy.performance?.totalSignals || 0}</span>
              </div>
              <div className="metric">
                <span className="label">Subscribers</span>
                <span className="value">{strategy.subscribers || 0}</span>
              </div>
            </div>
            <div className="price">${strategy.price}/month</div>
            <div className="verified">✅ Verified</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Marketplace;
