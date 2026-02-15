import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import StrategyDetail from './pages/StrategyDetail';
import Dashboard from './pages/Dashboard';
import ProviderDashboard from './pages/ProviderDashboard';
import SubscriberDashboard from './pages/SubscriberDashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/strategy/:id" element={<StrategyDetail />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/provider" element={<ProviderDashboard />} />
          <Route path="/subscriber" element={<SubscriberDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
