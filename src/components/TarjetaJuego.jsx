import React from 'react';
import { Star, Clock, Edit2, Trash2, Eye } from 'lucide-react';
import '../styles/TarjetaJuego.css';

const TarjetaJuego = ({ juego, onEdit, onDelete, onView }) => {
  const { titulo, plataforma, estado, puntuacion, horasJugadas, portada } = juego;

  const estadoColores = {
    jugando: '#3b82f6',
    completado: '#10b981',
    pendiente: '#6b7280',
    abandonado: '#ef4444'
  };

  const estadoTextos = {
    jugando: 'Jugando',
    completado: 'Completado',
    pendiente: 'Pendiente',
    abandonado: 'Abandonado'
  };

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

  return (
    <div className="tarjeta-juego">
      <div className="tarjeta-portada">
        {portada ? (
          <img src={portada} alt={titulo} />
        ) : (
          <div className="portada-placeholder">
            <span>Sin portada</span>
          </div>
        )}
        <div className="tarjeta-overlay">
          <button onClick={() => onView(juego)} className="btn-overlay">
            <Eye size={20} />
          </button>
          <button onClick={() => onEdit(juego)} className="btn-overlay">
            <Edit2 size={20} />
          </button>
          <button onClick={() => onDelete(juego._id)} className="btn-overlay btn-delete">
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      <div className="tarjeta-contenido">
        <h3 className="tarjeta-titulo">{titulo}</h3>
        <p className="tarjeta-plataforma">{plataforma}</p>

        <div className="tarjeta-info">
          <span 
            className="tarjeta-estado"
            style={{ backgroundColor: estadoColores[estado] }}
          >
            {estadoTextos[estado]}
          </span>

          <div className="tarjeta-estrellas">
            {renderEstrellas(puntuacion)}
          </div>
        </div>

        {horasJugadas > 0 && (
          <div className="tarjeta-horas">
            <Clock size={16} />
            <span>{horasJugadas}h jugadas</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TarjetaJuego;