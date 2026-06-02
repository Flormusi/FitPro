import React, { useState, useEffect } from 'react';
import { Check, X, RefreshCw, LogOut, Users } from 'lucide-react';

const ADMIN_API = import.meta.env.VITE_API_URL || '';

interface Trainer {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  subscription: {
    id: string;
    plan: string;
    status: string;
    updatedAt: string;
  } | null;
}

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  ACTIVE:   { label: 'Activo',    color: '#22c55e' },
  INACTIVE: { label: 'Inactivo',  color: '#ef4444' },
  TRIALING: { label: 'Trial',     color: '#f59e0b' },
  CANCELLED:{ label: 'Cancelado', color: '#6b7280' },
  PAST_DUE: { label: 'Vencido',   color: '#f97316' },
};

const PLAN_OPTIONS = ['BASIC', 'PREMIUM', 'PROFESSIONAL'];

const AdminPage: React.FC = () => {
  const [adminKey, setAdminKey] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [keyInput, setKeyInput] = useState('');
  const [error, setError] = useState('');

  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState<string | null>(null);
  const [successId, setSuccessId] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    // Verifica la clave llamando al backend
    try {
      const res = await fetch(`${ADMIN_API}/admin/trainers`, {
        headers: { 'X-Admin-Key': keyInput },
      });
      if (res.ok) {
        setAdminKey(keyInput);
        setAuthenticated(true);
      } else {
        setError('Clave incorrecta.');
      }
    } catch {
      setError('No se pudo conectar al servidor.');
    }
  };

  const fetchTrainers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${ADMIN_API}/admin/trainers`, {
        headers: { 'X-Admin-Key': adminKey },
      });
      const json = await res.json();
      if (json.success) setTrainers(json.data);
    } catch {
      console.error('Error fetching trainers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authenticated) fetchTrainers();
  }, [authenticated]);

  const updateSubscription = async (trainerId: string, status: string, plan: string) => {
    setUpdating(trainerId);
    try {
      const res = await fetch(`${ADMIN_API}/admin/trainers/${trainerId}/subscription`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Key': adminKey,
        },
        body: JSON.stringify({ status, plan }),
      });
      const json = await res.json();
      if (json.success) {
        setSuccessId(trainerId);
        setTimeout(() => setSuccessId(null), 2000);
        fetchTrainers();
      }
    } catch {
      console.error('Error updating subscription');
    } finally {
      setUpdating(null);
    }
  };

  if (!authenticated) {
    return (
      <div style={{
        minHeight: '100vh', backgroundColor: '#0f0f0f',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{
          backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a',
          borderRadius: 12, padding: '2rem', width: '100%', maxWidth: 360,
        }}>
          <h1 style={{ color: '#fff', fontWeight: 800, fontSize: '1.4rem', marginBottom: 4 }}>
            Panel Admin · FitPro
          </h1>
          <p style={{ color: '#6b7280', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
            Ingresá la clave de administrador
          </p>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Clave de admin"
              value={keyInput}
              onChange={e => setKeyInput(e.target.value)}
              style={{
                width: '100%', padding: '0.75rem', borderRadius: 8,
                border: '1px solid #333', backgroundColor: '#111',
                color: '#fff', fontSize: '0.95rem', marginBottom: 12,
                boxSizing: 'border-box',
              }}
              autoFocus
            />
            {error && (
              <p style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: 12 }}>{error}</p>
            )}
            <button
              type="submit"
              style={{
                width: '100%', padding: '0.75rem', borderRadius: 8,
                backgroundColor: '#e11d48', color: '#fff',
                border: 'none', fontWeight: 700, cursor: 'pointer', fontSize: '0.95rem',
              }}
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f0f0f', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Users size={22} color="#e11d48" />
            <h1 style={{ color: '#fff', fontWeight: 800, fontSize: '1.4rem', margin: 0 }}>
              Panel Admin · Trainers
            </h1>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              onClick={fetchTrainers}
              disabled={loading}
              style={{
                backgroundColor: '#1a1a1a', color: '#aaa',
                border: '1px solid #333', borderRadius: 8, padding: '0.5rem 1rem',
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
              }}
            >
              <RefreshCw size={15} /> Actualizar
            </button>
            <button
              onClick={() => setAuthenticated(false)}
              style={{
                backgroundColor: 'transparent', color: '#6b7280',
                border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
              }}
            >
              <LogOut size={15} /> Salir
            </button>
          </div>
        </div>

        {/* Tabla */}
        {loading ? (
          <p style={{ color: '#6b7280', textAlign: 'center' }}>Cargando…</p>
        ) : trainers.length === 0 ? (
          <p style={{ color: '#6b7280', textAlign: 'center' }}>No hay trainers registrados todavía.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {trainers.map(trainer => {
              const sub = trainer.subscription;
              const currentStatus = sub?.status ?? 'INACTIVE';
              const currentPlan = sub?.plan ?? 'BASIC';
              const statusInfo = STATUS_LABELS[currentStatus] ?? { label: currentStatus, color: '#6b7280' };
              const isUpdating = updating === trainer.id;
              const isSuccess = successId === trainer.id;

              return (
                <div
                  key={trainer.id}
                  style={{
                    backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a',
                    borderRadius: 10, padding: '1rem 1.25rem',
                    display: 'flex', flexWrap: 'wrap', alignItems: 'center',
                    gap: '1rem', justifyContent: 'space-between',
                  }}
                >
                  {/* Info */}
                  <div>
                    <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.95rem' }}>{trainer.name}</div>
                    <div style={{ color: '#6b7280', fontSize: '0.8rem' }}>{trainer.email}</div>
                    <div style={{ color: '#444', fontSize: '0.75rem', marginTop: 2 }}>
                      Registro: {new Date(trainer.createdAt).toLocaleDateString('es-AR')}
                    </div>
                  </div>

                  {/* Estado actual */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{
                      backgroundColor: statusInfo.color + '22',
                      color: statusInfo.color,
                      borderRadius: 20, padding: '3px 12px',
                      fontSize: '0.78rem', fontWeight: 700,
                    }}>
                      {statusInfo.label}
                    </span>
                    <span style={{ color: '#444', fontSize: '0.78rem' }}>{currentPlan}</span>
                  </div>

                  {/* Acciones */}
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                    {/* Select plan */}
                    <select
                      defaultValue={currentPlan}
                      id={`plan-${trainer.id}`}
                      style={{
                        backgroundColor: '#111', color: '#aaa',
                        border: '1px solid #333', borderRadius: 6, padding: '0.4rem 0.6rem',
                        fontSize: '0.82rem',
                      }}
                    >
                      {PLAN_OPTIONS.map(p => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>

                    {/* Activar */}
                    <button
                      disabled={isUpdating || currentStatus === 'ACTIVE'}
                      onClick={() => {
                        const planSel = (document.getElementById(`plan-${trainer.id}`) as HTMLSelectElement)?.value || currentPlan;
                        updateSubscription(trainer.id, 'ACTIVE', planSel);
                      }}
                      style={{
                        backgroundColor: currentStatus === 'ACTIVE' ? '#14532d' : '#16a34a',
                        color: '#fff', border: 'none', borderRadius: 6,
                        padding: '0.4rem 0.85rem', cursor: currentStatus === 'ACTIVE' ? 'default' : 'pointer',
                        fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: 5,
                        opacity: isUpdating ? 0.6 : 1,
                      }}
                    >
                      {isSuccess ? <Check size={14} /> : <Check size={14} />}
                      Activar
                    </button>

                    {/* Desactivar */}
                    <button
                      disabled={isUpdating || currentStatus === 'INACTIVE'}
                      onClick={() => updateSubscription(trainer.id, 'INACTIVE', currentPlan)}
                      style={{
                        backgroundColor: '#1a1a1a', color: '#ef4444',
                        border: '1px solid #ef444444', borderRadius: 6,
                        padding: '0.4rem 0.85rem',
                        cursor: currentStatus === 'INACTIVE' ? 'default' : 'pointer',
                        fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: 5,
                        opacity: isUpdating ? 0.6 : 1,
                      }}
                    >
                      <X size={14} /> Desactivar
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <p style={{ color: '#2a2a2a', fontSize: '0.75rem', textAlign: 'center', marginTop: '2rem' }}>
          /admin · uso interno FitPro
        </p>
      </div>
    </div>
  );
};

export default AdminPage;
