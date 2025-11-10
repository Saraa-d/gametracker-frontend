import React, { useState, useEffect } from 'react';
import { Plus, BookOpen, Search } from 'lucide-react';
import TarjetaResena from '../components/TarjetaResena';
import FormularioResena from '../components/FormularioResena';
import { obtenerResenas, obtenerJuegos, crearResena, actualizarResena, eliminarResena } from '../services/api';
import '../styles/ListaResenas.css';

const ListaResenas = () => {
  const [resenas, setResenas] = useState([]);
  const [juegos, setJuegos] = useState([]);
  const [resenasFiltradas, setResenasFiltradas] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [resenaEditando, setResenaEditando] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarDatos();
  }, []);

  useEffect(() => {
    filtrarResenas();
  }, [resenas, busqueda]);

  const cargarDatos = async () => {
    try {
      setCargando(true);
      const [resenasData, juegosData] = await Promise.all([
        obtenerResenas(),
        obtenerJuegos()
      ]);
      setResenas(resenasData);
      setJuegos(juegosData);
    } catch (error) {
      console.error('Error al cargar datos:', error);
      alert('Error al cargar las reseñas');
    } finally {
      setCargando(false);
    }
  };

  const filtrarResenas = () => {
    if (busqueda.trim() === '') {
      setResenasFiltradas(resenas);
      return;
    }

    const resultado = resenas.filter(r => {
      const tituloResena = r.titulo.toLowerCase();
      const contenido = r.contenido.toLowerCase();
      const tituloJuego = r.juegoId?.titulo?.toLowerCase() || '';
      const busquedaLower = busqueda.toLowerCase();

      return tituloResena.includes(busquedaLower) ||
        contenido.includes(busquedaLower) ||
        tituloJuego.includes(busquedaLower);
    });

    setResenasFiltradas(resultado);
  };

  const handleSubmit = async (formData) => {
    try {
      if (resenaEditando) {
        await actualizarResena(resenaEditando._id, formData);
        alert('Reseña actualizada exitosamente');
      } else {
        await crearResena(formData);
        alert('Reseña publicada exitosamente');
      }
      setShowForm(false);
      setResenaEditando(null);
      cargarDatos();
    } catch (error) {
      console.error('Error al guardar reseña:', error);
      alert('Error al guardar la reseña');
    }
  };

  const handleEdit = (resena) => {
    setResenaEditando(resena);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta reseña?')) {
      try {
        await eliminarResena(id);
        alert('Reseña eliminada exitosamente');
        cargarDatos();
      } catch (error) {
        console.error('Error al eliminar reseña:', error);
        alert('Error al eliminar la reseña');
      }
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setResenaEditando(null);
  };

  return (
    <div className="resenas-container">
      <div className="resenas-header">
        <div className="header-titulo">
          <BookOpen size={40} />
          <h1>Mis Reseñas</h1>
        </div>

        <div className="resenas-stats">
          <div className="stat-card">
            <div className="stat-label">Total de Reseñas</div>
            <div className="stat-value">{resenas.length}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Promedio de Puntuación</div>
            <div className="stat-value">
              {resenas.length > 0
                ? (resenas.reduce((sum, r) => sum + r.puntuacion, 0) / resenas.length).toFixed(1)
                : '0'}
              /5
            </div>
          </div>
        </div>
      </div>

      <div className="resenas-controles">
        <div className="busqueda">
          <Search size={20} />
          <input
            type="text"
            placeholder="Buscar reseñas..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>

        <button className="btn-nueva-resena" onClick={() => setShowForm(true)}>
          <Plus size={20} />
          Nueva Reseña
        </button>
      </div>

      {cargando ? (
        <div className="cargando">Cargando reseñas...</div>
      ) : resenasFiltradas.length === 0 ? (
        <div className="sin-resenas">
          <BookOpen size={64} />
          <p>No hay reseñas todavía</p>
          <button className="btn-nueva-resena" onClick={() => setShowForm(true)}>
            <Plus size={20} />
            Escribe tu primera reseña
          </button>
        </div>
      ) : (
        <div className="resenas-grid">
          {resenasFiltradas.map(resena => (
            <TarjetaResena
              key={resena._id}
              resena={resena}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {showForm && (
        <FormularioResena
          resena={resenaEditando}
          juegos={juegos}
          onSubmit={handleSubmit}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
};

export default ListaResenas;