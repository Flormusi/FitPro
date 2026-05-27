import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../contexts/AuthContext';
import './TrainerSignup.css';

const TrainerSignup: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    businessName: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Las contraseñas no coinciden');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);
    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: 'trainer',
      });
    } catch (error: any) {
      console.error('Error en registro de trainer:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="trainer-signup-container">
      <form onSubmit={handleSubmit} className="trainer-signup-form">
        <div className="trainer-signup-header">
          <div className="trainer-signup-icon">💪</div>
          <h1 className="trainer-signup-title">Crear tu cuenta</h1>
          <p className="trainer-signup-subtitle">Empezá a gestionar tus alumnos hoy</p>
        </div>

        <div className="trainer-signup-fields">
          <div className="field-group">
            <label htmlFor="name">Nombre completo</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="María García"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="field-group">
            <label htmlFor="businessName">Nombre de tu gimnasio o negocio <span className="optional">(opcional)</span></label>
            <input
              id="businessName"
              name="businessName"
              type="text"
              placeholder="Ej: Studio Fit, Personal Training MG..."
              value={formData.businessName}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div className="field-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="maria@ejemplo.com"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="field-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Mínimo 6 caracteres"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="field-group">
            <label htmlFor="confirmPassword">Confirmar contraseña</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Repetí tu contraseña"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
        </div>

        <button type="submit" className="trainer-signup-btn" disabled={loading}>
          {loading ? 'Creando cuenta...' : 'Crear cuenta gratis'}
        </button>

        <p className="trainer-signup-login">
          ¿Ya tenés cuenta?{' '}
          <span onClick={() => navigate('/login')}>Iniciar sesión</span>
        </p>
      </form>
    </div>
  );
};

export default TrainerSignup;
