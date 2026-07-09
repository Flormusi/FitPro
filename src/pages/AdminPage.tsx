import React, { useState, useEffect } from 'react';
import { Check, X, RefreshCw, LogOut, Users, Mail, KeyRound } from 'lucide-react';

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

interface Lead {
  id: string;
  email: string;
  name: string | null;
  source: string | null;
  createdAt: string;
}

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  ACTIVE:   { label: 'Activo',    color: '#22c55e' },
  INACTIVE: { label: 'Inactivo',  color: '#a855f7' },
  TRIALING: { label: 'Trial',     color: '#f59e0b' },
  CANCELLED:{ label: 'Cancelado', color: '#6b7280' },
  PAST_DUE: { label: 'Vencido',   color: '#f97316' },
};

const PLAN_OPTIONS = ['BASIC', 'PREMIUM', 'PROFESSIONAL'];

type Tab = 'trainers' | 'leads' | 'reset';

const AdminPage: React.FC = () => {
  const [adminKey, setAdminKey] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [keyInput, setKeyInput] = useState('');
  const [error, setError] = useState('');

  const [activeTab, setActiveTab] = useState<Tab>('trainers');

  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState<string | null>(null);
  const [successId, setSuccessId] = useState<string | null>(null);

  const [leads, setLeads] = useState<Lead[]>([]);
  const [leadsLoading, setLeadsLoading] = useState(false);

  const [resetEmail, setResetEmail] = useState('');
  const [resetResult, setResetResult] = useState<{ tempPassword: string; name: string; email: string } | null>(null);
  const [resetError, setResetError] = useState('');
  const [resetLoading, setResetLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
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

  const fetchLeads = async () => {
    setLeadsLoading(true);
    try {
      const res = await fetch(`${ADMIN_API}/admin/leads`, {
        headers: { 'X-Admin-Key': adminKey },
      });
      const json = await res.json();
      if (json.success) setLeads(json.data);
    } catch {
      console.error('Error fetching leads');
    } finally {
      setLeadsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetError('');
    setResetResult(null);
    setResetLoading(true);
    try {
      const res = await fetch(`${ADMIN_API}/admin/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Admin-Key': adminKey },
        body: JSON.stringify({ email: resetEmail }),
      });
      const json = await res.json();
      if (json.success) {
        setResetResult(json);
        setResetEmail('');
      } else {
        setResetError(json.message || 'Error al resetear.');
      }
    } catch {
      setResetError('No se pudo conectar al servidor.');
    } finally {
      setResetLoading(false);
    }
  };

  useEffect(() => {
    if (authenticated) {
      fetchTrainers();
      fetchLeads();
    }
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
        minHeight: '100vh', backgroundColor: '#0d0d24',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{
          backgroundColor: '#18182f', border: '1px solid #26264a',
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
                border: '1px solid #2f2f55', backgroundColor: '#111',
                color: '#fff', fontSize: '0.95rem', marginBottom: 12,
                boxSizing: 'border-box',
              }}
              autoFocus
            />
            {error && (
              <p style={{ color: '#a855f7', fontSize: '0.85rem', marginBottom: 12 }}>{error}</p>
            )}
            <button
              type="submit"
              style={{
                width: '100%', padding: '0.75rem', borderRadius: 8,
                backgroundColor: '#8b5cf6', color: '#fff',
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
    <div style={{ minHeight: '100vh', backgroundColor: '#0d0d24', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <h1 style={{ color: '#fff', fontWeight: 800, fontSize: '1.4rem', margin: 0 }}>
            Panel Admin · FitPro
          </h1>
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              onClick={() => { fetchTrainers(); fetchLeads(); }}
              disabled={loading || leadsLoading}
              style={{
                backgroundColor: '#18182f', color: '#aaa',
                border: '1px solid #2f2f55', borderRadius: 8, padding: '0.5rem 1rem',
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

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4, marginBottom: '1.5rem', borderBottom: '1px solid #26264a', paddingBottom: 0 }}>
          <button
            onClick={() => setActiveTab('trainers')}
            style={{
              backgroundColor: 'transparent',
              color: activeTab === 'trainers' ? '#8b5cf6' : '#6b7280',
              border: 'none',
              borderBottom: activeTab === 'trainers' ? '2px solid #8b5cf6' : '2px solid transparent',
              padding: '0.6rem 1.1rem',
              cursor: 'pointer',
              fontWeight: activeTab === 'trainers' ? 700 : 400,
              fontSize: '0.9rem',
              display: 'flex', alignItems: 'center', gap: 7,
              marginBottom: -1,
            }}
          >
            <Users size={15} />
            Trainers
            <span style={{
              backgroundColor: activeTab === 'trainers' ? '#8b5cf622' : '#26264a',
              color: activeTab === 'trainers' ? '#8b5cf6' : '#6b7280',
              borderRadius: 20, padding: '1px 8px', fontSize: '0.75rem', fontWeight: 700,
            }}>
              {trainers.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('leads')}
            style={{
              backgroundColor: 'transparent',
              color: activeTab === 'leads' ? '#8b5cf6' : '#6b7280',
              border: 'none',
              borderBottom: activeTab === 'leads' ? '2px solid #8b5cf6' : '2px solid transparent',
              padding: '0.6rem 1.1rem',
              cursor: 'pointer',
              fontWeight: activeTab === 'leads' ? 700 : 400,
              fontSize: '0.9rem',
              display: 'flex', alignItems: 'center', gap: 7,
              marginBottom: -1,
            }}
          >
            <Mail size={15} />
            Leads
            <span style={{
              backgroundColor: activeTab === 'leads' ? '#8b5cf622' : '#26264a',
              color: activeTab === 'leads' ? '#8b5cf6' : '#6b7280',
              borderRadius: 20, padding: '1px 8px', fontSize: '0.75rem', fontWeight: 700,
            }}>
              {leads.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('reset')}
            style={{
              backgroundColor: 'transparent',
              color: activeTab === 'reset' ? '#8b5cf6' : '#6b7280',
              border: 'none',
              borderBottom: activeTab === 'reset' ? '2px solid #8b5cf6' : '2px solid transparent',
              padding: '0.6rem 1.1rem',
              cursor: 'pointer',
              fontWeight: activeTab === 'reset' ? 700 : 400,
              fontSize: '0.9rem',
              display: 'flex', alignItems: 'center', gap: 7,
              marginBottom: -1,
            }}
          >
            <KeyRound size={15} />
            Resetear clave
          </button>
        </div>

        {/* ── TRAINERS TAB ── */}
        {activeTab === 'trainers' && (
          loading ? (
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
                      backgroundColor: '#18182f', border: '1px solid #26264a',
                      borderRadius: 10, padding: '1rem 1.25rem',
                      display: 'flex', flexWrap: 'wrap', alignItems: 'center',
                      gap: '1rem', justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.95rem' }}>{trainer.name}</div>
                      <div style={{ color: '#6b7280', fontSize: '0.8rem' }}>{trainer.email}</div>
                      <div style={{ color: '#444', fontSize: '0.75rem', marginTop: 2 }}>
                        Registro: {new Date(trainer.createdAt).toLocaleDateString('es-AR')}
                      </div>
                    </div>

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

                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                      <select
                        defaultValue={currentPlan}
                        id={`plan-${trainer.id}`}
                        style={{
                          backgroundColor: '#111', color: '#aaa',
                          border: '1px solid #2f2f55', borderRadius: 6, padding: '0.4rem 0.6rem',
                          fontSize: '0.82rem',
                        }}
                      >
                        {PLAN_OPTIONS.map(p => (
                          <option key={p} value={p}>{p}</option>
                        ))}
                      </select>

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

                      <button
                        disabled={isUpdating || currentStatus === 'INACTIVE'}
                        onClick={() => updateSubscription(trainer.id, 'INACTIVE', currentPlan)}
                        style={{
                          backgroundColor: '#18182f', color: '#a855f7',
                          border: '1px solid #a855f744', borderRadius: 6,
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
          )
        )}

        {/* ── LEADS TAB ── */}
        {activeTab === 'leads' && (
          leadsLoading ? (
            <p style={{ color: '#6b7280', textAlign: 'center' }}>Cargando…</p>
          ) : leads.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 0' }}>
              <Mail size={32} color="#26264a" style={{ marginBottom: 12 }} />
              <p style={{ color: '#6b7280', margin: 0 }}>Todavía no hay leads capturados.</p>
              <p style={{ color: '#444', fontSize: '0.8rem', marginTop: 6 }}>
                Cuando alguien complete el formulario de la landing, aparecerá acá.
              </p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #26264a' }}>
                    {['Email', 'Nombre', 'Fuente', 'Fecha'].map(h => (
                      <th key={h} style={{
                        textAlign: 'left', color: '#6b7280', fontWeight: 600,
                        padding: '0.5rem 0.75rem', whiteSpace: 'nowrap',
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead, i) => (
                    <tr
                      key={lead.id}
                      style={{
                        borderBottom: '1px solid #1d1d3a',
                        backgroundColor: i % 2 === 0 ? 'transparent' : '#141414',
                      }}
                    >
                      <td style={{ padding: '0.65rem 0.75rem', color: '#e2e8f0' }}>{lead.email}</td>
                      <td style={{ padding: '0.65rem 0.75rem', color: '#9ca3af' }}>{lead.name || '—'}</td>
                      <td style={{ padding: '0.65rem 0.75rem' }}>
                        <span style={{
                          backgroundColor: '#1e3a5f', color: '#60a5fa',
                          borderRadius: 20, padding: '2px 10px', fontSize: '0.75rem',
                        }}>
                          {lead.source || 'landing'}
                        </span>
                      </td>
                      <td style={{ padding: '0.65rem 0.75rem', color: '#6b7280', whiteSpace: 'nowrap' }}>
                        {new Date(lead.createdAt).toLocaleDateString('es-AR', {
                          day: '2-digit', month: '2-digit', year: '2-digit',
                          hour: '2-digit', minute: '2-digit',
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        )}

        {/* ── RESET TAB ── */}
        {activeTab === 'reset' && (
          <div style={{ maxWidth: 420 }}>
            <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '1.25rem' }}>
              Ingresá el email del usuario para generar una contraseña temporal. El usuario deberá cambiarla después de ingresar.
            </p>
            <form onSubmit={handleResetPassword} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <input
                type="email"
                placeholder="Email del usuario"
                value={resetEmail}
                onChange={e => setResetEmail(e.target.value)}
                required
                style={{
                  backgroundColor: '#111', color: '#fff',
                  border: '1px solid #2f2f55', borderRadius: 8,
                  padding: '0.75rem', fontSize: '0.9rem',
                }}
              />
              <button
                type="submit"
                disabled={resetLoading}
                style={{
                  backgroundColor: '#8b5cf6', color: '#fff',
                  border: 'none', borderRadius: 8,
                  padding: '0.75rem', fontWeight: 700,
                  cursor: resetLoading ? 'default' : 'pointer',
                  opacity: resetLoading ? 0.7 : 1,
                }}
              >
                {resetLoading ? 'Reseteando…' : 'Resetear contraseña'}
              </button>
            </form>

            {resetError && (
              <p style={{ color: '#a855f7', marginTop: 12, fontSize: '0.875rem' }}>{resetError}</p>
            )}

            {resetResult && (
              <div style={{
                marginTop: 16, backgroundColor: '#052e16', border: '1px solid #16a34a',
                borderRadius: 10, padding: '1rem 1.25rem',
              }}>
                <p style={{ color: '#22c55e', fontWeight: 700, margin: '0 0 6px' }}>✅ Contraseña reseteada</p>
                <p style={{ color: '#9ca3af', fontSize: '0.85rem', margin: '0 0 4px' }}>
                  Usuario: <span style={{ color: '#fff' }}>{resetResult.name} ({resetResult.email})</span>
                </p>
                <p style={{ color: '#9ca3af', fontSize: '0.85rem', margin: 0 }}>
                  Nueva contraseña temporal:{' '}
                  <span style={{
                    color: '#fff', fontFamily: 'monospace', fontSize: '1rem',
                    backgroundColor: '#0a3a1a', padding: '2px 8px', borderRadius: 4,
                  }}>
                    {resetResult.tempPassword}
                  </span>
                </p>
                <p style={{ color: '#6b7280', fontSize: '0.75rem', marginTop: 8 }}>
                  Copiá esta contraseña y mandásela al usuario. Solo se muestra una vez.
                </p>
              </div>
            )}
          </div>
        )}

        <p style={{ color: '#26264a', fontSize: '0.75rem', textAlign: 'center', marginTop: '2rem' }}>
          /admin · uso interno FitPro
        </p>
      </div>
    </div>
  );
};

export default AdminPage;
