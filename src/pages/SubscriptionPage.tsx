import React, { useState } from 'react';
import { Check, Zap, Star, Crown, MessageCircle, Mail } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const plans = [
  {
    id: 'STARTER',
    name: 'Starter',
    price: 8990,
    icon: Star,
    popular: false,
    features: [
      'Hasta 10 alumnos',
      'Rutinas ilimitadas',
      'Chat con alumnos',
      'Notificaciones por email',
      'Gestión de cuotas',
    ],
  },
  {
    id: 'PRO',
    name: 'Pro',
    price: 15990,
    icon: Crown,
    popular: true,
    features: [
      'Hasta 30 alumnos',
      'Todo lo del plan Starter',
      'Biblioteca de rutinas avanzada',
      'Métricas y progreso detallado',
      'Soporte prioritario',
    ],
  },
  {
    id: 'UNLIMITED',
    name: 'Ilimitado',
    price: 24990,
    icon: Zap,
    popular: false,
    features: [
      'Alumnos ilimitados',
      'Todo lo del plan Pro',
      'Configuraciones avanzadas (pirámide, intervalos)',
      'Acceso anticipado a nuevas funciones',
      'Onboarding personalizado',
    ],
  },
];

const WHATSAPP_NUMBER = import.meta.env.VITE_CONTACT_WHATSAPP || '';
const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || '';

const SubscriptionPage: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const { user, logout } = useAuth();

  const handleContactWhatsapp = (planName: string) => {
    const message = encodeURIComponent(
      `Hola! Me registré en FitPro y quiero activar el plan ${planName}. Mi email es ${user?.email || ''}`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  const handleContactEmail = (planName: string) => {
    const subject = encodeURIComponent(`Activar plan ${planName} - FitPro`);
    const body = encodeURIComponent(
      `Hola! Me registré en FitPro y quiero activar el plan ${planName}.\n\nMi email: ${user?.email || ''}\nMi nombre: ${user?.name || ''}`
    );
    // Intentar abrir Gmail compose (funciona sin cliente de email instalado)
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(CONTACT_EMAIL)}&su=${subject}&body=${body}`;
    const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    // Abrir Gmail en nueva pestaña; si falla, caer a mailto
    const newTab = window.open(gmailUrl, '_blank');
    if (!newTab) window.location.href = mailtoUrl;
  };

  const selectedPlanName = plans.find(p => p.id === selectedPlan)?.name || 'Pro';

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg)', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>💪</div>
          <h1 style={{ color: 'var(--color-text)', fontSize: '1.75rem', fontWeight: 700, margin: 0 }}>
            ¡Cuenta creada con éxito{user?.name ? `, ${user.name.split(' ')[0]}` : ''}!
          </h1>
          <p style={{ color: 'var(--color-text-muted)', marginTop: 8, fontSize: '1rem' }}>
            Elegí tu plan y activá tu cuenta para empezar a gestionar tus alumnos.
          </p>
        </div>

        {/* Plans */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
          {plans.map((plan) => {
            const Icon = plan.icon;
            const isSelected = selectedPlan === plan.id;
            return (
              <div
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                style={{
                  backgroundColor: 'var(--color-surface)',
                  border: `2px solid ${isSelected ? 'var(--color-primary)' : plan.popular ? 'var(--color-primary)' : 'var(--color-border)'}`,
                  borderRadius: 12,
                  padding: '1.5rem',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'border-color 0.2s, transform 0.1s',
                  transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                }}
              >
                {plan.popular && (
                  <div style={{
                    position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)',
                    backgroundColor: 'var(--color-primary)', color: '#fff',
                    fontSize: '0.7rem', fontWeight: 700, padding: '3px 12px', borderRadius: 20,
                    whiteSpace: 'nowrap',
                  }}>
                    MÁS POPULAR
                  </div>
                )}

                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <Icon size={22} color='var(--color-primary)' />
                  <span style={{ color: 'var(--color-text)', fontWeight: 700, fontSize: '1.1rem' }}>{plan.name}</span>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <span style={{ color: 'var(--color-text)', fontSize: '1.75rem', fontWeight: 800 }}>
                    ${plan.price.toLocaleString('es-AR')}
                  </span>
                  <span style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}> ARS/mes</span>
                </div>

                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {plan.features.map((feature, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                      <Check size={16} color='var(--color-primary)' style={{ marginTop: 2, flexShrink: 0 }} />
                      <span style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 12,
          padding: '1.5rem',
          textAlign: 'center',
        }}>
          <p style={{ color: 'var(--color-text)', fontWeight: 600, marginBottom: 8 }}>
            {selectedPlan
              ? `Seleccionaste el plan ${selectedPlanName} — contactanos para activarlo`
              : 'Seleccioná un plan y contactanos para activar tu cuenta'}
          </p>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginBottom: 20 }}>
            Te respondemos en menos de 24hs y activamos tu cuenta al instante una vez confirmado el pago.
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            {WHATSAPP_NUMBER && (
              <button
                onClick={() => handleContactWhatsapp(selectedPlanName)}
                style={{
                  backgroundColor: '#25D366', color: '#fff',
                  border: 'none', borderRadius: 8, padding: '0.75rem 1.5rem',
                  fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
                  fontSize: '0.95rem',
                }}
              >
                <MessageCircle size={18} />
                Contactar por WhatsApp
              </button>
            )}
            {CONTACT_EMAIL && (
              <button
                onClick={() => handleContactEmail(selectedPlanName)}
                style={{
                  backgroundColor: 'var(--color-surface-2)', color: 'var(--color-text)',
                  border: '1px solid var(--color-border)', borderRadius: 8, padding: '0.75rem 1.5rem',
                  fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
                  fontSize: '0.95rem',
                }}
              >
                <Mail size={18} />
                Contactar por Email
              </button>
            )}
          </div>

          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', marginTop: 16 }}>
            Aceptamos MercadoPago y transferencia bancaria.
          </p>
        </div>

        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <button
            onClick={logout}
            style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer', fontSize: '0.85rem' }}
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
