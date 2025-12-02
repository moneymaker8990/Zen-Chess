import { useNavigate } from 'react-router-dom';
import { CalmPlayMode } from '@/components/CalmPlayMode';

export function CalmPlayPage() {
  const navigate = useNavigate();

  return (
    <CalmPlayMode onExit={() => navigate('/play')} />
  );
}

export default CalmPlayPage;





