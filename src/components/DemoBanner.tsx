import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye } from 'lucide-react';

const DemoBanner: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      backgroundColor: '#78350f',
      borderBottom: '1px solid #92400e',
      padding: '0.6rem 1rem',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      gap: 12, flexWrap: 'wrap',
      position: 'sticky', top: 0, zIndex: 200,
    }}>
      <Eye size={15} color="#fbbf24" />
      <span style={{ color: '#fde68a', fontSize: '0.85rem', fontWeight: 600 }}>
        Modo Demo — solo lectura
      </span>
      <span style={{ color: '#d97706', fontSize: '0.85rem' }}>
        Los datos son de ejemplo y no se pueden modificar.
      </span>
      <button
        onClick={() => navigate('/trainer-signup')}
        style={{
          backgroundColor: '#f59e0b', color: '#1c1917',
          border: 'none', borderRadius: 6, padding: '0.3rem 0.9rem',
          fontWeight: 700, cursor: 'pointer', fontSize: '0.82rem',
        }}
      >
        Crear mi cuenta gratis →
      </button>
    </div>
  );
};

export default DemoBanner;
