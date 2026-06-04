import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  Dumbbell, Users, MessageCircle, CreditCard,
  BarChart2, Calendar, Check, ChevronDown, ChevronUp,
  Zap, Star, Crown
} from 'lucide-react';

const features = [
  {
    icon: Users,
    title: 'Dos dashboards conectados',
    description: 'Vos ves todo desde tu panel. Tu alumno ve el suyo. Sincronización en tiempo real.',
  },
  {
    icon: Dumbbell,
    title: 'Builder de rutinas completo',
    description: '+400 ilustraciones de ejercicios. Pirámide, intervalos, circuitos y más.',
  },
  {
    icon: CreditCard,
    title: 'Gestión de cuotas',
    description: 'Registrá pagos y mandá recordatorios automáticos por email.',
  },
  {
    icon: MessageCircle,
    title: 'Chat interno',
    description: 'Mensajes directos con tus alumnos dentro de la plataforma.',
  },
  {
    icon: Calendar,
    title: 'Calendario de rutinas',
    description: 'Asigná rutinas por día. El alumno ve exactamente qué hacer cada día.',
  },
  {
    icon: BarChart2,
    title: 'Seguimiento de progreso',
    description: 'Métricas, peso y evolución de cada alumno a lo largo del tiempo.',
  },
];

const plans = [
  {
    id: 'STARTER',
    name: 'Starter',
    price: 30000,
    icon: Star,
    popular: false,
    features: ['Hasta 10 alumnos', 'Rutinas ilimitadas', 'Chat con alumnos', 'Gestión de cuotas'],
  },
  {
    id: 'PRO',
    name: 'Pro',
    price: 55000,
    icon: Crown,
    popular: true,
    features: ['Hasta 30 alumnos', 'Todo lo del Starter', 'Métricas y progreso', 'Soporte prioritario'],
  },
  {
    id: 'UNLIMITED',
    name: 'Ilimitado',
    price: 90000,
    icon: Zap,
    popular: false,
    features: ['Alumnos ilimitados', 'Todo lo del Pro', 'Configuraciones avanzadas', 'Onboarding personalizado'],
  },
];

const faqs = [
  {
    q: '¿Necesito saber de tecnología para usar FitPro?',
    a: 'No. Está diseñado para personal trainers, no para programadores. Si sabés usar WhatsApp, podés usar FitPro.',
  },
  {
    q: '¿Mis alumnos tienen que pagar algo?',
    a: 'No. Tus alumnos acceden gratis. Vos pagás una suscripción mensual por la plataforma.',
  },
  {
    q: '¿Puedo probarlo antes de pagar?',
    a: 'Sí. Creás tu cuenta gratis y te contactamos para activarla con un período de prueba sin costo.',
  },
  {
    q: '¿Funciona en el celular?',
    a: 'Sí. Funciona bien tanto en desktop como en móvil para vos y para tus alumnos.',
  },
];

const API_URL = import.meta.env.VITE_API_URL || '';
const WA_NUMBER = '541156578922';
const WA_MESSAGE = encodeURIComponent('Hola! Vi fitpro.ar y quiero saber más 💪');
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [demoLoading, setDemoLoading] = useState(false);

  const handleDemo = async () => {
    setDemoLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/demo`);
      const json = await res.json();
      if (json.success && json.token) {
        // Usamos window.location para forzar recarga completa y que
        // AuthContext detecte al usuario demo desde localStorage
        localStorage.setItem('token', json.token);
        localStorage.setItem('user', JSON.stringify(json.user));
        window.location.href = '/trainer-dashboard';
      } else {
        alert('La demo no está disponible en este momento.');
      }
    } catch {
      alert('No se pudo conectar con el servidor.');
    } finally {
      setDemoLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>

      {/* NAV */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        backgroundColor: 'rgba(18,18,18,0.92)', backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--color-border)',
        padding: '0 1.5rem', height: 60,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Dumbbell size={22} color='var(--color-primary)' />
          <span style={{ fontWeight: 800, fontSize: '1.1rem' }}>FitPro</span>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => navigate('/login')} style={{
            background: 'none', border: '1px solid var(--color-border)',
            color: 'var(--color-text)', borderRadius: 8, padding: '0.4rem 1rem',
            cursor: 'pointer', fontSize: '0.9rem',
          }}>
            Iniciar sesión
          </button>
          <button onClick={() => navigate('/trainer-signup')} style={{
            backgroundColor: 'var(--color-primary)', border: 'none',
            color: '#fff', borderRadius: 8, padding: '0.4rem 1rem',
            cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem',
          }}>
            Crear cuenta
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ padding: '5rem 1.5rem 4rem', textAlign: 'center', maxWidth: 760, margin: '0 auto' }}>
        <div style={{
          display: 'inline-block', backgroundColor: 'rgba(214,40,40,0.12)',
          color: 'var(--color-primary)', borderRadius: 20, padding: '4px 14px',
          fontSize: '0.8rem', fontWeight: 600, marginBottom: 20,
        }}>
          Para personal trainers
        </div>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 800, lineHeight: 1.2, margin: '0 0 1.2rem' }}>
          Gestioná tus alumnos sin hojas de cálculo ni mensajes de WhatsApp
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', lineHeight: 1.6, margin: '0 auto 2.5rem', maxWidth: 560 }}>
          Rutinas, pagos, progreso y mensajes en un solo lugar. Tu panel y el de tu alumno, todo conectado en tiempo real.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => navigate('/trainer-signup')} style={{
            backgroundColor: 'var(--color-primary)', color: '#fff', border: 'none',
            borderRadius: 10, padding: '0.85rem 2rem', fontWeight: 700,
            fontSize: '1rem', cursor: 'pointer',
          }}>
            Crear cuenta gratis
          </button>
          <button
            onClick={handleDemo}
            disabled={demoLoading}
            style={{
              backgroundColor: 'var(--color-surface)', color: 'var(--color-text)',
              border: '1px solid var(--color-border)', borderRadius: 10,
              padding: '0.85rem 2rem', fontWeight: 600, fontSize: '1rem',
              cursor: demoLoading ? 'wait' : 'pointer',
              opacity: demoLoading ? 0.7 : 1,
            }}
          >
            {demoLoading ? 'Cargando...' : '👀 Ver demo'}
          </button>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding: '4rem 1.5rem', backgroundColor: 'var(--color-surface)' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '1.7rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            Todo lo que necesitás en un solo lugar
          </h2>
          <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', marginBottom: '3rem' }}>
            Sin apps extra, sin planillas, sin caos.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} style={{
                  backgroundColor: 'var(--color-surface-2)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 12, padding: '1.25rem',
                }}>
                  <Icon size={24} color='var(--color-primary)' style={{ marginBottom: 10 }} />
                  <h3 style={{ fontWeight: 700, fontSize: '1rem', margin: '0 0 6px' }}>{f.title}</h3>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', margin: 0, lineHeight: 1.5 }}>{f.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section style={{ padding: '4rem 1.5rem' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '1.7rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            Planes y precios
          </h2>
          <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', marginBottom: '3rem' }}>
            Cancelás cuando quieras. Sin contratos.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {plans.map((plan) => {
              const Icon = plan.icon;
              return (
                <div key={plan.id} style={{
                  backgroundColor: 'var(--color-surface)',
                  border: `2px solid ${plan.popular ? 'var(--color-primary)' : 'var(--color-border)'}`,
                  borderRadius: 12, padding: '1.5rem', position: 'relative',
                }}>
                  {plan.popular && (
                    <div style={{
                      position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)',
                      backgroundColor: 'var(--color-primary)', color: '#fff',
                      fontSize: '0.7rem', fontWeight: 700, padding: '3px 12px', borderRadius: 20,
                      whiteSpace: 'nowrap',
                    }}>MÁS POPULAR</div>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                    <Icon size={20} color='var(--color-primary)' />
                    <span style={{ fontWeight: 700 }}>{plan.name}</span>
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <span style={{ fontSize: '1.75rem', fontWeight: 800 }}>${plan.price.toLocaleString('es-AR')}</span>
                    <span style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}> ARS/mes</span>
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.25rem', display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {plan.features.map((feat, i) => (
                      <li key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                        <Check size={15} color='var(--color-primary)' style={{ marginTop: 2, flexShrink: 0 }} />
                        <span style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>{feat}</span>
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => navigate('/trainer-signup')} style={{
                    width: '100%', padding: '0.7rem',
                    backgroundColor: plan.popular ? 'var(--color-primary)' : 'var(--color-surface-2)',
                    color: plan.popular ? '#fff' : 'var(--color-text)',
                    border: `1px solid ${plan.popular ? 'var(--color-primary)' : 'var(--color-border)'}`,
                    borderRadius: 8, fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem',
                  }}>
                    Empezar ahora
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '4rem 1.5rem', backgroundColor: 'var(--color-surface)' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '1.7rem', fontWeight: 700, marginBottom: '2.5rem' }}>
            Preguntas frecuentes
          </h2>
          {faqs.map((faq, i) => (
            <div key={i} style={{
              borderBottom: '1px solid var(--color-border)', padding: '1rem 0', cursor: 'pointer',
            }} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{faq.q}</span>
                {openFaq === i
                  ? <ChevronUp size={18} color='var(--color-text-muted)' />
                  : <ChevronDown size={18} color='var(--color-text-muted)' />}
              </div>
              {openFaq === i && (
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', marginTop: 10, marginBottom: 0, lineHeight: 1.6 }}>
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.7rem', fontWeight: 700, marginBottom: '0.75rem' }}>
          ¿Listo para organizar tu negocio?
        </h2>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', fontSize: '1rem' }}>
          Creá tu cuenta en menos de 2 minutos.
        </p>
        <button onClick={() => navigate('/trainer-signup')} style={{
          backgroundColor: 'var(--color-primary)', color: '#fff', border: 'none',
          borderRadius: 10, padding: '0.9rem 2.5rem', fontWeight: 700,
          fontSize: '1.05rem', cursor: 'pointer',
        }}>
          Crear cuenta gratis
        </button>
      </section>

      {/* FOOTER */}
      <footer style={{
        borderTop: '1px solid var(--color-border)',
        padding: '1.5rem', textAlign: 'center',
        color: 'var(--color-text-muted)', fontSize: '0.8rem',
      }}>
        © {new Date().getFullYear()} FitPro. Todos los derechos reservados.
      </footer>

      {/* WHATSAPP FLOTANTE */}
      <a
        href={WA_URL}
        target="_blank"
        rel="noopener noreferrer"
        title="Consultanos por WhatsApp"
        style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 999,
          width: 56, height: 56, borderRadius: '50%',
          backgroundColor: '#25D366',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(37,211,102,0.45)',
          textDecoration: 'none',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.1)';
          (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 6px 20px rgba(37,211,102,0.6)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1)';
          (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 4px 16px rgba(37,211,102,0.45)';
        }}
      >
        {/* WhatsApp SVG icon */}
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  );
};

export default LandingPage;
