import { useParams } from 'react-router-dom';
import './StrategyDetail.css';

function StrategyDetail() {
  const { id } = useParams();

  return (
    <div className="strategy-detail">
      <h1>Strategy Detail #{id}</h1>
      <p>Coming soon...</p>
    </div>
  );
}

export default StrategyDetail;
