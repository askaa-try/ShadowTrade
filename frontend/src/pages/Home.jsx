import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>SHADOWTRADE</h1>
          <p className="tagline">Private Trading Signal Marketplace</p>
          <p className="subtitle">TRADE WITHOUT EXPOSURE</p>
          
          <div className="cta-buttons">
            <Link to="/marketplace" className="btn btn-primary">
              Explore Strategies
            </Link>
            <Link to="/dashboard" className="btn btn-secondary">
              Get Started
            </Link>
          </div>
        </div>
      </section>

      <section className="features">
        <h2>Why ShadowTrade?</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Private Execution</h3>
            <p>Your trading strategies remain completely private using Zero-Knowledge Proofs</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">✅</div>
            <h3>Verified Performance</h3>
            <p>All performance metrics are cryptographically verified on-chain</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Anti Front-Running</h3>
            <p>Encrypted signals prevent front-running and copy-trading</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h3>Monetize Strategies</h3>
            <p>Earn passive income from your profitable trading strategies</p>
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="stat">
          <h3>$2.5M+</h3>
          <p>Total Trading Volume</p>
        </div>
        <div className="stat">
          <h3>150+</h3>
          <p>Active Strategies</p>
        </div>
        <div className="stat">
          <h3>5,000+</h3>
          <p>Subscribers</p>
        </div>
      </section>
    </div>
  );
}

export default Home;
