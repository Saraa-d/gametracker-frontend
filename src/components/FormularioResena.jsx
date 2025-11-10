import React, { useState, useEffect } from 'react';
import { X, Star } from 'lucide-react';
import '../styles/FormularioResena.css';

const FormularioResena = ({ resena, juegos, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    juegoId: '',
    titulo: '',
    contenido: '',
    puntuacion: 5
  });

  useEffect(() => {
    if (resena) {
      setFormData({
        juegoId: resena.juegoId._id || resena.juegoId,
        titulo: resena.titulo,
        contenido: resena.contenido,
        puntuacion: resena.puntuacion
      });
    }
  }, [resena]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'puntuacion' ? Number(value) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.juegoId) {
      alert('Por favor selecciona un juego');
      return;
    }
    if (!formData.titulo.trim()) {
      alert('Por favor escribe un título para la reseña');
      return;
    }
    if (!formData.contenido.trim()) {
      alert('Por favor escribe el contenido de la reseña');
      return;
    }
    onSubmit(formData);
  };

  const renderEstrellas = () => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        size={24}
        fill={index < formData.puntuacion ? '#fbbf24' : 'none'}
        stroke={index < formData.puntuacion ? '#fbbf24' : '#d1d5db'}
        style={{ cursor: 'pointer' }}
        onClick={() => setFormData(prev => ({ ...prev, puntuacion: index + 1 }))}
      />
    ));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{resena ? 'Editar Reseña' : 'Nueva Reseña'}</h2>
          <button onClick={onClose} className="btn-cerrar">
            <X size={24} />
          </button>
        </div>

        <div className="formulario-resena">
          <div className="form-group">
            <label>Juego *</label>
            <select
              name="juegoId"
              value={formData.juegoId}
              onChange={handleChange}
              required
              disabled={resena ? true : false}
            >
              <option value="">Selecciona un juego</option>
              {juegos.map(juego => (
                <option key={juego._id} value={juego._id}>
                  {juego.titulo} - {juego.plataforma}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Título de la reseña *</label>
            <input
              type="text"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              required
              placeholder="Ej: Una obra maestra"
            />
          </div>

          <div className="form-group">
            <label>Puntuación *</label>
            <div className="estrellas-selector">
              {renderEstrellas()}
              <span className="puntuacion-valor">{formData.puntuacion}/5</span>
            </div>
          </div>

          <div className="form-group">
            <label>Contenido de la reseña *</label>
            <textarea
              name="contenido"
              value={formData.contenido}
              onChange={handleChange}
              required
              rows="8"
              placeholder="Escribe tu reseña aquí... ¿Qué te gustó? ¿Qué no te gustó? ¿Lo recomendarías?"
            />
            <div className="contador-caracteres">
              {formData.contenido.length} caracteres
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn-cancelar">
              Cancelar
            </button>
            <button onClick={handleSubmit} className="btn-guardar">
              {resena ? 'Guardar Cambios' : 'Publicar Reseña'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormularioResena;