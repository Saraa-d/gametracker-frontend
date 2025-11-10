import React, { useState, useEffect } from 'react';
import { Plus, Gamepad2, Search } from 'lucide-react';
import TarjetaJuego from '../components/TarjetaJuego';
import FormularioJuego from '../components/FormularioJuego';
import { obtenerJuegos, crearJuego, actualizarJuego, eliminarJuego } from '../services/api';
import '../styles/BibliotecaJuegos.css';

const BibliotecaJuegos = () => {
  const [juegos, setJuegos] = useState([]);
  const [juegosFiltrados, setJuegosFiltrados] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [juegoEditando, setJuegoEditando] = useState(null);
  const [filtro, setFiltro] = useState('todos');
  const [busqueda, setBusqueda] = useState('');
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarJuegos();
  }, []);

  useEffect(() => {
    filtrarJuegos();
  }, [juegos, filtro, busqueda]);

  const cargarJuegos = async () => {
    try {
      setCargando(true);
      const data = await obtenerJuegos();
      setJuegos(data);
    } catch (error) {
      console.error('Error al cargar juegos:', error);
      alert('Error al cargar los juegos');
    } finally {
      setCargando(false);
    }
  };

  const filtrarJuegos = () => {
    let resultado = juegos;

    // Filtrar por estado
    if (filtro !== 'todos') {
      resultado = resultado.filter(j => j.estado === filtro);
    }

    // Filtrar por búsqueda
    if (busqueda.trim() !== '') {
      resultado = resultado.filter(j =>
        j.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
        j.plataforma.toLowerCase().includes(busqueda.toLowerCase()) ||
        (j.genero && j.genero.toLowerCase().includes(busqueda.toLowerCase()))
      );
    }

    setJuegosFiltrados(resultado);
  };

  const handleSubmit = async (formData) => {
    try {
      if (juegoEditando) {
        await actualizarJuego(juegoEditando._id, formData);
        alert('Juego actualizado exitosamente');
      } else {
        await crearJuego(formData);
        alert('Juego agregado exitosamente');
      }
      setShowForm(false);
      setJuegoEditando(null);
      cargarJuegos();
    } catch (error) {
      console.error('Error al guardar juego:', error);
      alert('Error al guardar el juego');
    }
  };

  const handleEdit = (juego) => {
    setJuegoEditando(juego);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este juego?')) {
      try {
        await eliminarJuego(id);
        alert('Juego eliminado exitosamente');
        cargarJuegos();
      } catch (error) {
        console.error('Error al eliminar juego:', error);
        alert('Error al eliminar el juego');
      }
    }
  };

  const handleView = (juego) => {
    alert(`Ver detalles de: ${juego.titulo}\n\nEsta funcionalidad se implementará más adelante.`);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setJuegoEditando(null);
  };

  const stats = {
    total: juegos.length,
    completados: juegos.filter(j => j.estado === 'completado').length,
    jugando: juegos.filter(j => j.estado === 'jugando').length,
    pendientes: juegos.filter(j => j.estado === 'pendiente').length,
    horasTotales: juegos.reduce((sum, j) => sum + (j.horasJugadas || 0), 0)
  };

  return (
    <div className="biblioteca-container">
      {/* Header */}
      <div className="biblioteca-header">
        <div className="header-titulo">
          <Gamepad2 size={40} />
          <h1>Mi Biblioteca de Juegos</h1>
        </div>

        {/* Estadísticas */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">Total</div>
            <div className="stat-value">{stats.total}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Jugando</div>
            <div className="stat-value">{stats.jugando}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Completados</div>
            <div className="stat-value">{stats.completados}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Pendientes</div>
            <div className="stat-value">{stats.pendientes}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Horas Totales</div>
            <div className="stat-value">{stats.horasTotales}</div>
          </div>
        </div>
      </div>

      {/* Barra de búsqueda y filtros */}
      <div className="controles">
        <div className="busqueda">
          <Search size={20} />
          <input
            type="text"
            placeholder="Buscar juegos..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>

        <div className="filtros">
          <button
            className={filtro === 'todos' ? 'filtro-activo' : ''}
            onClick={() => setFiltro('todos')}
          >
            Todos
          </button>
          <button
            className={filtro === 'jugando' ? 'filtro-activo' : ''}
            onClick={() => setFiltro('jugando')}
          >
            Jugando
          </button>
          <button
            className={filtro === 'completado' ? 'filtro-activo' : ''}
            onClick={() => setFiltro('completado')}
          >
            Completados
          </button>
          <button
            className={filtro === 'pendiente' ? 'filtro-activo' : ''}
            onClick={() => setFiltro('pendiente')}
          >
            Pendientes
          </button>
        </div>

        <button className="btn-agregar" onClick={() => setShowForm(true)}>
          <Plus size={20} />
          Agregar Juego
        </button>
      </div>

      {/* Grid de juegos */}
      {cargando ? (
        <div className="cargando">Cargando juegos...</div>
      ) : juegosFiltrados.length === 0 ? (
        <div className="sin-juegos">
          <Gamepad2 size={64} />
          <p>No se encontraron juegos</p>
          <button className="btn-agregar" onClick={() => setShowForm(true)}>
            <Plus size={20} />
            Agregar tu primer juego
          </button>
        </div>
      ) : (
        <div className="juegos-grid">
          {juegosFiltrados.map(juego => (
            <TarjetaJuego
              key={juego._id}
              juego={juego}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onView={handleView}
            />
          ))}
        </div>
      )}

      {/* Formulario Modal */}
      {showForm && (
        <FormularioJuego
          juego={juegoEditando}
          onSubmit={handleSubmit}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
};

export default BibliotecaJuegos;