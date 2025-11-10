import React from 'react';
import { Star, Edit2, Trash2, Calendar } from 'lucide-react';
import '../styles/TarjetaResena.css';

const TarjetaResena = ({ resena, onEdit, onDelete }) => {
  const { titulo, contenido, puntuacion, fecha, juegoId } = resena;

  const renderEstrellas = (puntos) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        size={16}
        fill={index < puntos ? '#fbbf24' : 'none'}
        stroke={index < puntos ? '#fbbf24' : '#d1d5db'}
      />
    ));
  };

  const formatearFecha = (fechaString) => {
    const fecha = new Date(fechaString);
    return fecha.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="tarjeta-resena">
      <div className="resena-header">
        <div className="resena-info">
          <h3 className="resena-titulo">{titulo}</h3>
          {juegoId && (
            <p className="resena-juego">
              Juego: {juegoId.titulo || 'Desconocido'}
            </p>
          )}
        </div>
        <div className="resena-acciones">
          <button onClick={() => onEdit(resena)} className="btn-editar">
            <Edit2 size={18} />
          </button>
          <button onClick={() => onDelete(resena._id)} className="btn-eliminar">
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div className="resena-puntuacion">
        {renderEstrellas(puntuacion)}
        <span className="puntuacion-texto">{puntuacion}/5</span>
      </div>

      <p className="resena-contenido">{contenido}</p>

      <div className="resena-footer">
        <div className="resena-fecha">
          <Calendar size={16} />
          <span>{formatearFecha(fecha)}</span>
        </div>
      </div>
    </div>
  );
};

export default TarjetaResena;