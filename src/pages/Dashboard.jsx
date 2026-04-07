import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Dashboard() {
  const { user, logout, authFetch } = useAuth();
  const [proyectos, setProyectos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [nombre, setNombre] = useState('');
  const [genero, setGenero] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    cargarProyectos();
  }, []);

  const cargarProyectos = async () => {
    try {
      const res = await authFetch('/Proyectos');
      const data = await res.json();
      setProyectos(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const crearProyecto = async (e) => {
    e.preventDefault();
    try {
      await authFetch('/Proyectos', {
        method: 'POST',
        body: JSON.stringify({ nombre, genero, descripcion, urlAudio: '' })
      });
      setNombre('');
      setGenero('');
      setDescripcion('');
      setShowForm(false);
      cargarProyectos();
    } catch (err) {
      console.error(err);
    }
  };

  const eliminarProyecto = async (id) => {
    if (!confirm('¿Eliminar este proyecto?')) return;
    try {
      await authFetch(`/Proyectos/${id}`, { method: 'DELETE' });
      cargarProyectos();
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <nav className="dash-nav">
        <Link to="/" className="logo" style={{ textDecoration: 'none' }}>SONIQ</Link>
        <div className="dash-nav-right">
          <span className="dash-user">Hola, {user?.nombre}</span>
          <button onClick={handleLogout} className="btn-logout">Salir</button>
        </div>
      </nav>

      <main className="dash-main">
        <div className="dash-header">
          <h1>Mis Proyectos</h1>
          <button onClick={() => setShowForm(!showForm)} className="btn-new">
            {showForm ? 'Cancelar' : '+ Nuevo Proyecto'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={crearProyecto} className="project-form">
            <input
              type="text"
              placeholder="Nombre del proyecto"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Género (ej: Electronic, Hip-Hop)"
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
            />
            <textarea
              placeholder="Descripción"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              rows={3}
            />
            <button type="submit" className="btn-create">Crear proyecto</button>
          </form>
        )}

        {loading ? (
          <p className="dash-empty">Cargando...</p>
        ) : proyectos.length === 0 ? (
          <p className="dash-empty">No tienes proyectos aún. ¡Crea tu primero!</p>
        ) : (
          <div className="projects-grid">
            {proyectos.map((p) => (
              <div key={p.id} className="project-card">
                <div className="project-icon">🎵</div>
                <h3>{p.nombre}</h3>
                <span className="project-genre">{p.genero}</span>
                <p className="project-desc">{p.descripcion}</p>
                <div className="project-footer">
                  <span className="project-date">
                    {new Date(p.fechaCreacion).toLocaleDateString()}
                  </span>
                  <button onClick={() => eliminarProyecto(p.id)} className="btn-delete">
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}