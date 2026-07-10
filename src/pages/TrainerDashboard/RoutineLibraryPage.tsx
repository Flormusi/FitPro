import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '../../services/axiosConfig';
import { trainerApi } from '../../services/api';
import './RoutineLibraryPage.css';

type RoutineType = 'personal' | 'preset';

interface RoutineItem {
  id: string;
  name: string;
  description?: string;
  trainingObjective?: string;
  level?: string;
  gender?: string;
  daysPerWeek?: number;
  type: RoutineType;
  exercises?: any[]; // lista plana de ejercicios (para precargar el creador)
}

interface ObjectiveFolder {
  value: string; // normalized value
  label: string; // human readable
  icon: string; // emoji/icon
}

// Normaliza objetivos para agrupar correctamente
const normalizeObjective = (raw?: string) => {
  const s = (raw || '').toLowerCase().trim();
  if (!s) return '';
  if (s.includes('full')) return 'full_body';
  if (s.includes('adulto') || s.includes('mayores')) return 'adultos_mayores';
  if (s.includes('casa')) return 'en_casa';
  if (s.includes('funcional')) return 'funcional';
  if (s.includes('torso')) return 'torso_pierna';
  if (s.includes('descenso') || (s.includes('quema') && s.includes('grasa'))) return 'quema_grasa';
  if (s.includes('fuerza') && s.includes('resistencia')) return 'fuerza_resistencia';
  if (s.includes('resistencia') && s.includes('cardio')) return 'resistencia_cardio';
  if (s.includes('estética') || s.includes('estetica')) return 'estetica_salud';
  if (s.includes('hipertrofia')) return 'hipertrofia';
  if (s.includes('potencia')) return 'potencia';
  if (s.includes('movilidad')) return 'movilidad';
  if (s.includes('fuerza')) return 'fuerza';
  if (s.includes('resistencia')) return 'resistencia';
  return s;
};

const OBJECTIVE_FOLDERS: ObjectiveFolder[] = [
  { value: 'full_body', label: 'Full Body / Principiantes', icon: '🙌' },
  { value: 'fuerza', label: 'Fuerza', icon: '💪' },
  { value: 'hipertrofia', label: 'Hipertrofia', icon: '🏋️' },
  { value: 'torso_pierna', label: 'Torso / Pierna', icon: '🦵' },
  { value: 'funcional', label: 'Funcional', icon: '🤸' },
  { value: 'en_casa', label: 'Entrenamiento en Casa', icon: '🏠' },
  { value: 'adultos_mayores', label: 'Adultos Mayores', icon: '🧓' },
  { value: 'quema_grasa', label: 'Descenso de Peso', icon: '🔥' },
  { value: 'resistencia', label: 'Resistencia', icon: '🏃' },
  { value: 'potencia', label: 'Potencia', icon: '⚡' },
  { value: 'movilidad', label: 'Movilidad', icon: '🧘' },
  { value: 'estetica_salud', label: 'Estética y Salud', icon: '✨' },
  { value: 'fuerza_resistencia', label: 'Fuerza y Resistencia', icon: '💪🏃' },
  { value: 'resistencia_cardio', label: 'Resistencia y Cardio', icon: '🏃❤️' },
];

interface ClientOption {
  id: string;
  name: string;
}

const RoutineLibraryPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [allRoutines, setAllRoutines] = useState<RoutineItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Asignación rápida (multi-cliente) desde la biblioteca
  const [assignTarget, setAssignTarget] = useState<RoutineItem | null>(null);
  const [clients, setClients] = useState<ClientOption[]>([]);
  const [selectedClientIds, setSelectedClientIds] = useState<string[]>([]);
  const [assigning, setAssigning] = useState(false);
  const [assignResult, setAssignResult] = useState<{ ok: number; fail: number } | null>(null);

  // UI state
  const [activeFolder, setActiveFolder] = useState<ObjectiveFolder | null>(null);
  const [filterLevel, setFilterLevel] = useState('');
  const [filterGender, setFilterGender] = useState('');
  const [filterType, setFilterType] = useState<RoutineType | ''>('');
  const [folderSort, setFolderSort] = useState<'alphabetical' | 'frequency'>('alphabetical');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Personales
        let personal: RoutineItem[] = [];
        try {
          const personalRes = await trainerApi.getRoutines();
          const personalData = (personalRes?.data || []) as any[];
          personal = personalData.map((r: any) => ({
            id: r.id,
            name: r.name,
            description: r.description,
            trainingObjective: r.trainingObjective || r.objective,
            level: r.level || r.difficulty, // algunas rutinas personales usan 'difficulty'
            gender: r.gender,
            daysPerWeek: r.daysPerWeek,
            type: 'personal',
          }));
        } catch (e) {
          // Si falla, continuar solo con prediseñadas
          console.warn('No se pudieron cargar rutinas personales:', e);
        }

        // Prediseñadas
        let presets: RoutineItem[] = [];
        try {
          const presetsRes = await axios.get('/routine-templates', { params: { includePresets: 'true' } });
          const presetsData = (presetsRes?.data?.data || []) as any[];
          presets = presetsData.map((r: any) => ({
            id: r.id,
            name: r.name,
            description: r.description,
            trainingObjective: r.trainingObjective,
            level: r.level,
            gender: r.gender,
            daysPerWeek: r.daysPerWeek,
            type: 'preset',
            exercises: r.flatExercises || [],
          }));
        } catch (e: any) {
          console.error('Error cargando rutinas prediseñadas:', e?.response?.data || e);
          throw new Error(e?.response?.data?.message || 'Error al cargar rutinas prediseñadas');
        }

        setAllRoutines([...personal, ...presets]);
      } catch (err: any) {
        setError(err.message || 'Error al cargar la Biblioteca de Rutinas');
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    trainerApi.getClients()
      .then((res: any) => {
        const list = (res?.data || res || []) as any[];
        setClients(list.map(c => ({ id: c.id, name: c.name || c.clientProfile?.name || c.email })));
      })
      .catch(() => setClients([]));
  }, []);

  const openAssignModal = (routine: RoutineItem) => {
    setAssignTarget(routine);
    setSelectedClientIds([]);
    setAssignResult(null);
  };

  const closeAssignModal = () => {
    setAssignTarget(null);
    setSelectedClientIds([]);
    setAssignResult(null);
  };

  const toggleClientSelected = (id: string) => {
    setSelectedClientIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const confirmAssign = async () => {
    if (!assignTarget || selectedClientIds.length === 0) return;
    setAssigning(true);
    let ok = 0, fail = 0;
    for (const clientId of selectedClientIds) {
      try {
        await trainerApi.createRoutine({
          clientId,
          name: assignTarget.name,
          exercises: assignTarget.exercises as any,
          ...(assignTarget.description ? { description: assignTarget.description } : {}),
        } as any);
        ok++;
      } catch {
        fail++;
      }
    }
    setAssigning(false);
    setAssignResult({ ok, fail });
  };

  // Si regresamos desde detalles de rutina con una carpeta indicada, activarla
  useEffect(() => {
    const folderFromState = (location.state as any)?.folder as string | undefined;
    if (folderFromState) {
      const found = OBJECTIVE_FOLDERS.find(f => f.value === folderFromState);
      if (found) setActiveFolder(found);
    }
  }, [location.state]);

  // Derivar datos dinámicos
  const availableLevels = useMemo(() => {
    const set = new Set<string>();
    allRoutines.forEach(r => { if (r.level) set.add((r.level || '').toLowerCase()); });
    return Array.from(set).map(v => ({ value: v, label: v.charAt(0).toUpperCase() + v.slice(1) }));
  }, [allRoutines]);

  const availableGenders = useMemo(() => {
    const set = new Set<string>();
    allRoutines.forEach(r => { if (r.gender) set.add(r.gender); });
    return Array.from(set).map(v => ({ value: v, label: v.charAt(0).toUpperCase() + v.slice(1) }));
  }, [allRoutines]);

  const folderCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    OBJECTIVE_FOLDERS.forEach(f => { counts[f.value] = 0; });
    allRoutines.forEach(r => {
      const n = normalizeObjective(r.trainingObjective);
      if (n) counts[n] = (counts[n] || 0) + 1;
    });
    return counts;
  }, [allRoutines]);

  const sortedFolders = useMemo(() => {
    const arr = [...OBJECTIVE_FOLDERS];
    if (folderSort === 'alphabetical') {
      return arr.sort((a, b) => a.label.localeCompare(b.label, 'es'));
    }
    return arr.sort((a, b) => (folderCounts[b.value] || 0) - (folderCounts[a.value] || 0));
  }, [folderSort, folderCounts]);

  const filteredRoutines = useMemo(() => {
    let arr = allRoutines;
    // por carpeta
    if (activeFolder) {
      arr = arr.filter(r => normalizeObjective(r.trainingObjective) === activeFolder.value);
    }
    // búsqueda
    if (searchTerm) {
      const s = searchTerm.toLowerCase();
      arr = arr.filter(r => (r.name || '').toLowerCase().includes(s) || (r.description || '').toLowerCase().includes(s));
    }
    // filtros
    if (filterLevel) {
      arr = arr.filter(r => (r.level || '').toLowerCase() === filterLevel.toLowerCase());
    }
    if (filterGender) {
      arr = arr.filter(r => (r.gender || '') === filterGender);
    }
    if (filterType) {
      arr = arr.filter(r => r.type === filterType);
    }
    return arr;
  }, [allRoutines, activeFolder, searchTerm, filterLevel, filterGender, filterType]);

  const clearFilters = () => {
    setSearchTerm('');
    setFilterLevel('');
    setFilterGender('');
    setFilterType('');
  };

  const renderRoutineCard = (r: RoutineItem) => (
    <div className="routine-card tf-card" key={`${r.type}-${r.id}`}>
      <div className="routine-title gradient-text">{r.name}</div>
      <div className="routine-meta">
        {r.level && (<span className="meta-chip">Nivel: {r.level}</span>)}
        {r.gender && r.gender !== 'unisex' && (<span className="meta-chip">Género: {r.gender}</span>)}
        {typeof r.daysPerWeek === 'number' && (<span className="meta-chip">{r.daysPerWeek} días/sem</span>)}
        <span className="meta-chip type-chip">{r.type === 'preset' ? 'Plantilla FitPro' : 'Personal'}</span>
      </div>
      {r.description && (<p className="routine-desc">{r.description}</p>)}
      <div className="routine-actions">
        {r.type === 'preset' ? (
          <button
            className="tf-btn tf-btn-primary"
            onClick={() =>
              navigate('/trainer/create-routine', {
                state: { presetRoutine: r, fromLibrary: true, folder: activeFolder?.value }
              })
            }
          >
            Usar Plantilla
          </button>
        ) : null}
        {r.type === 'preset' && (
          <button
            className="tf-btn tf-btn-secondary"
            onClick={() => openAssignModal(r)}
          >
            Asignar a clientes
          </button>
        )}
        {r.type === 'personal' && (
          <button
            className="tf-btn tf-btn-secondary"
            onClick={() =>
              navigate(`/trainer/routines/${r.id}`, {
                state: { fromLibrary: true, folder: activeFolder?.value }
              })
            }
          >
            Ver
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="routine-library-page">
      {/* Header */}
      <header className="library-header tf-header-gradient">
        <div className="header-left">
          <button
            className="back-btn"
            onClick={() => {
              if (activeFolder) { setActiveFolder(null); clearFilters(); }
              else { navigate('/trainer-dashboard'); }
            }}
          >
            ← {activeFolder ? 'Volver a la biblioteca' : 'Volver al dashboard'}
          </button>
          <div className="title-wrap">
            <h1 className="page-title">Biblioteca de Rutinas</h1>
            <p className="page-subtitle">Explora carpetas por objetivo y filtra dinámicamente</p>
          </div>
        </div>
        {activeFolder && (
          <button className="clear-btn" onClick={() => { setActiveFolder(null); clearFilters(); }}>Cerrar carpeta</button>
        )}
      </header>

      {/* Content */}
      <div className="library-content">
        {!activeFolder ? (
          <>
          <div className="sort-row">
            <span className="sort-label">Ordenar por:</span>
            <select className="filter-select sort-select" value={folderSort} onChange={(e) => setFolderSort(e.target.value as 'alphabetical' | 'frequency')}>
              <option value="alphabetical">Alfabético</option>
              <option value="frequency">Frecuencia</option>
            </select>
          </div>
          <div className="folders-grid">
            {sortedFolders.map(folder => (
              <button
                key={folder.value}
                className="folder-card tf-card"
                onClick={() => setActiveFolder(folder)}
              >
                <div className="folder-icon" aria-hidden>{folder.icon}</div>
                <div className="folder-info">
                  <div className="folder-title gradient-text">{folder.label}</div>
                  <div className="folder-count">{folderCounts[folder.value] || 0} rutinas</div>
                </div>
                <div className="folder-arrow" aria-hidden>→</div>
              </button>
            ))}
          </div>
          <div className="library-cta-row">
            <button
              className="tf-btn tf-btn-primary cta-btn"
              onClick={() => navigate('/trainer/routines')}
            >
              Ver todas las rutinas
            </button>
            <button
              className="tf-btn tf-btn-primary cta-btn"
              onClick={() => navigate('/trainer/create-routine')}
            >
              Agregar nueva categoría
            </button>
          </div>
            {loading && (
              <div className="loading-container"><div className="loading-spinner" /> Cargando rutinas...</div>
            )}
            {error && (
              <div className="error-container"><span className="error-text">{error}</span></div>
            )}
          </>
        ) : (
          <>
            <div className="folder-header">
              <div className="folder-badge">
                <span className="folder-emoji" aria-hidden>{activeFolder.icon}</span>
                <span className="folder-label">{activeFolder.label}</span>
              </div>
              <div className="filters-row">
                <input
                  type="text"
                  className="search-input"
                  placeholder="Buscar rutinas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select className="filter-select" value={filterLevel} onChange={(e) => setFilterLevel(e.target.value)}>
                  <option value="">Todos los niveles</option>
                  {availableLevels.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                <select className="filter-select" value={filterGender} onChange={(e) => setFilterGender(e.target.value)}>
                  <option value="">Todos</option>
                  {availableGenders.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                <select className="filter-select" value={filterType} onChange={(e) => setFilterType(e.target.value as RoutineType | '')}>
                  <option value="">Todas</option>
                  <option value="preset">Prediseñada</option>
                  <option value="personal">Personal</option>
                </select>
                {(filterLevel || filterGender || filterType || searchTerm) && (
                  <button className="clear-filters" onClick={clearFilters}>Limpiar filtros</button>
                )}
              </div>
            </div>

            {loading ? (
              <div className="loading-container"><div className="loading-spinner" /> Cargando rutinas...</div>
            ) : error ? (
              <div className="error-container"><span className="error-text">{error}</span></div>
            ) : filteredRoutines.length === 0 ? (
              <div className="empty-state">No se encontraron rutinas para estos filtros.</div>
            ) : (
              <div className="routines-grid">
                {filteredRoutines.map(renderRoutineCard)}
              </div>
            )}
          </>
        )}
      </div>
      <footer className="library-footer">
        <p className="footer-note">Agrupá tus rutinas por objetivo para mantener tu biblioteca ordenada</p>
      </footer>

      {assignTarget && (
        <div className="assign-modal-overlay" onClick={closeAssignModal}>
          <div className="assign-modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="assign-modal-title">Asignar "{assignTarget.name}"</h3>
            {assignResult ? (
              <>
                <p className="assign-modal-result">
                  ✅ Asignada a {assignResult.ok} cliente{assignResult.ok === 1 ? '' : 's'}
                  {assignResult.fail > 0 ? ` · ⚠️ ${assignResult.fail} falló${assignResult.fail === 1 ? '' : 'ron'}` : ''}
                </p>
                <button className="tf-btn tf-btn-primary" onClick={closeAssignModal}>Cerrar</button>
              </>
            ) : (
              <>
                <p className="assign-modal-subtitle">
                  Se crea una copia editable de la plantilla para cada cliente que elijas. Después podés personalizar cada una desde su perfil.
                </p>
                {clients.length === 0 ? (
                  <p className="assign-modal-empty">Todavía no tenés alumnos cargados.</p>
                ) : (
                  <div className="assign-client-list">
                    {clients.map(c => (
                      <label key={c.id} className="assign-client-item">
                        <input
                          type="checkbox"
                          checked={selectedClientIds.includes(c.id)}
                          onChange={() => toggleClientSelected(c.id)}
                        />
                        {c.name}
                      </label>
                    ))}
                  </div>
                )}
                <div className="assign-modal-actions">
                  <button className="tf-btn tf-btn-secondary" onClick={closeAssignModal}>Cancelar</button>
                  <button
                    className="tf-btn tf-btn-primary"
                    disabled={selectedClientIds.length === 0 || assigning}
                    onClick={confirmAssign}
                  >
                    {assigning ? 'Asignando…' : `Asignar a ${selectedClientIds.length || ''} cliente${selectedClientIds.length === 1 ? '' : 's'}`.trim()}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RoutineLibraryPage;