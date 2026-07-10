import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from '../../services/axiosConfig';

const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    setStatus('loading');
    try {
      await axios.put(`/auth/resetpassword/${token}`, { password });
      setStatus('done');
    } catch (err: any) {
      setError(err.response?.data?.message || 'El link es inválido o expiró. Solicitá uno nuevo.');
      setStatus('error');
    }
  };

  return (
    <div style={{
      minHeight: '100vh', backgroundColor: '#0d0d24',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem',
    }}>
      <div style={{
        backgroundColor: '#18182f', border: '1px solid #26264a',
        borderRadius: 12, padding: '2rem', width: '100%', maxWidth: 380,
      }}>
        <h1 style={{ color: '#fff', fontWeight: 800, fontSize: '1.3rem', marginBottom: 4 }}>
          Fit<span style={{ color: '#8b5cf6' }}>Pro</span>
        </h1>
        <h2 style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem', marginTop: '1rem', marginBottom: 8 }}>
          Crear nueva contraseña
        </h2>

        {status === 'done' ? (
          <>
            <p style={{ color: '#a1a1aa', fontSize: '0.9rem', lineHeight: 1.5 }}>
              ✅ Tu contraseña se actualizó. Ya podés iniciar sesión con la nueva.
            </p>
            <button
              onClick={() => navigate('/login')}
              style={{
                width: '100%', padding: '0.75rem', borderRadius: 8, marginTop: '1.25rem',
                backgroundColor: '#8b5cf6', color: '#fff', border: 'none',
                fontWeight: 700, cursor: 'pointer', fontSize: '0.95rem',
              }}
            >
              Iniciar sesión
            </button>
          </>
        ) : (
          <>
            <p style={{ color: '#a1a1aa', fontSize: '0.9rem', marginBottom: '1.25rem', lineHeight: 1.5 }}>
              Elegí una nueva contraseña para tu cuenta.
            </p>
            <form onSubmit={handleSubmit}>
              <input
                type="password"
                placeholder="Nueva contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={status === 'loading'}
                style={{
                  width: '100%', padding: '0.75rem', borderRadius: 8,
                  border: '1px solid #35355e', backgroundColor: '#111128',
                  color: '#fff', fontSize: '0.95rem', marginBottom: 12,
                  boxSizing: 'border-box',
                }}
              />
              <input
                type="password"
                placeholder="Repetir contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={status === 'loading'}
                style={{
                  width: '100%', padding: '0.75rem', borderRadius: 8,
                  border: '1px solid #35355e', backgroundColor: '#111128',
                  color: '#fff', fontSize: '0.95rem', marginBottom: 12,
                  boxSizing: 'border-box',
                }}
              />
              {error && (
                <p style={{ color: '#a855f7', fontSize: '0.85rem', marginBottom: 12 }}>{error}</p>
              )}
              <button
                type="submit"
                disabled={status === 'loading'}
                style={{
                  width: '100%', padding: '0.75rem', borderRadius: 8,
                  backgroundColor: '#8b5cf6', color: '#fff', border: 'none',
                  fontWeight: 700, cursor: status === 'loading' ? 'default' : 'pointer',
                  fontSize: '0.95rem', opacity: status === 'loading' ? 0.7 : 1,
                }}
              >
                {status === 'loading' ? 'Guardando…' : 'Guardar nueva contraseña'}
              </button>
            </form>
            {status === 'error' && (
              <Link
                to="/forgot-password"
                style={{ display: 'block', marginTop: 16, fontSize: '0.82rem', color: '#8b5cf6', textAlign: 'center' }}
              >
                Pedir un link nuevo
              </Link>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordPage;
