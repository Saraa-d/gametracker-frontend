import React from 'react';
import { Gamepad2, BookOpen, BarChart3 } from 'lucide-react';
import '../styles/Navegacion.css';

const Navegacion = ({ paginaActual, onCambiarPagina }) => {
  return (
    <nav className="navegacion">
      <div className="nav-contenido">
        <div className="nav-logo">
          <Gamepad2 size={32} />
          <span>GameTracker</span>
        </div>

        <div className="nav-links">
          <button
            className={paginaActual === 'biblioteca' ? 'nav-link activo' : 'nav-link'}
            onClick={() => onCambiarPagina('biblioteca')}
          >
            <Gamepad2 size={20} />
            Biblioteca
          </button>
          <button
            className={paginaActual === 'resenas' ? 'nav-link activo' : 'nav-link'}
            onClick={() => onCambiarPagina('resenas')}
          >
            <BookOpen size={20} />
            Reseñas
          </button>
          <button
            className={paginaActual === 'estadisticas' ? 'nav-link activo' : 'nav-link'}
            onClick={() => onCambiarPagina('estadisticas')}
          >
            <BarChart3 size={20} />
            Estadísticas
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navegacion;