import React from "react";
import "./TrainerDashboard.css";
import { FaUserFriends, FaDumbbell, FaMoneyBill, FaTasks } from "react-icons/fa";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const TrainerDashboard = () => {
  const progress = 78; // ejemplo

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <h1 className="logo">FITPRO</h1>
        <div className="header-info">
          <h2 className="greeting">¡Hola, Maga!</h2>
          <p className="subtitle">Aquí tienes un resumen de tu actividad</p>
        </div>
        <div className="header-actions">
          <span className="notification">🔔</span>
          <button className="btn btn-logout">Cerrar sesión</button>
        </div>
      </header>

      {/* Summary Cards */}
      <section className="summary-section">
        <div className="summary-card">
          <FaUserFriends className="card-icon" />
          <h3>Alumnos Activos</h3>
          <p className="card-number">15</p>
          <span className="variation positive">+5%</span>
        </div>
        <div className="summary-card">
          <FaDumbbell className="card-icon" />
          <h3>Sesiones Activas Hoy</h3>
          <p className="card-number">3</p>
          <span className="info-text">Última: hace 2h</span>
        </div>
        <div className="summary-card">
          <h3>Progreso Promedio</h3>
          <div className="gauge-container">
            <CircularProgressbar
              value={progress}
              text={`${progress}%`}
              styles={buildStyles({
                textColor: "#fff",
                pathColor: "#E63946",
                trailColor: "#333",
              })}
            />
          </div>
        </div>
        <div className="summary-card">
          <FaMoneyBill className="card-icon" />
          <h3>Cuotas Vencidas</h3>
          <p className="card-number">0</p>
          <span className="info-text">Todos al día</span>
        </div>
        <div className="summary-card">
          <FaTasks className="card-icon" />
          <h3>Rutinas sin Asignar</h3>
          <p className="card-number">0</p>
          <span className="info-text">Todas asignadas</span>
        </div>
      </section>

      {/* Quick Actions */}
      <section>
        <h2 className="section-title">Acciones Rápidas</h2>
        <div className="actions">
          <button className="btn btn-primary">Agregar Alumno</button>
          <button className="btn btn-secondary">Alumnos</button>
          <button className="btn btn-primary">Crear Nueva Rutina</button>
          <button className="btn btn-secondary">Biblioteca de Rutinas</button>
          <button className="btn btn-secondary">Calendario</button>
          <button className="btn btn-secondary">Mensajes</button>
        </div>
      </section>

      {/* Charts */}
      <section>
        <h2 className="section-title">Gráficos de Progreso</h2>
        <div className="charts-placeholder">
          {/* Acá irían tus componentes reales de charts */}
          <div className="chart">📈 Progreso de Peso</div>
          <div className="chart">📊 Entrenamientos Completados</div>
          <div className="chart">📊 Nuevos Clientes por Mes</div>
        </div>
      </section>

      {/* Performance Analytics */}
      <section>
        <h2 className="section-title">Analíticas de Rendimiento</h2>
        <div className="analytics">
          <div className="summary-card small">
            <h3>Rutinas Creadas</h3>
            <p className="card-number">0</p>
            <span className="info-text">Esta semana</span>
          </div>
          <div className="summary-card small">
            <h3>Nuevos Clientes</h3>
            <p className="card-number">0</p>
            <span className="info-text">Promedio semanal</span>
          </div>
          <div className="summary-card small">
            <h3>Actualizaciones de Progreso</h3>
            <p className="card-number">0</p>
            <span className="info-text">Última actualización</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TrainerDashboard;