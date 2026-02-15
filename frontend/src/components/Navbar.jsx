import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const connectWallet = () => {
    alert('Wallet connection coming soon!');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          SHADOWTRADE
        </Link>
        
        <ul className="nav-menu">
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/marketplace" className="nav-link">Marketplace</Link></li>
          <li><Link to="/dashboard" className="nav-link">Dashboard</Link></li>
        </ul>

        <button className="connect-wallet" onClick={connectWallet}>
          Connect Wallet
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
