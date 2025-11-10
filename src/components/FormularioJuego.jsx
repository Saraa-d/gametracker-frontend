import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import '../styles/FormularioJuego.css';

const FormularioJuego = ({ juego, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    titulo: '',
    plataforma: '',
    genero: '',
    portada: '',
    estado: 'pendiente',
    puntuacion: 0,
    horasJugadas: 0
  });

  useEffect(() => {
    if (juego) {
      setFormData(juego);
    }
  }, [juego]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'puntuacion' || name === 'horasJugadas' 
        ? Number(value) 
        : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{juego ? 'Editar Juego' : 'Agregar Nuevo Juego'}</h2>
          <button onClick={onClose} className="btn-cerrar">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="formulario-juego">
          <div className="form-group">
            <label>Título *</label>
            <input
              type="text"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              required
              placeholder="Ej: The Legend of Zelda"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Plataforma *</label>
              <input
                type="text"
                name="plataforma"
                value={formData.plataforma}
                onChange={handleChange}
                required
                placeholder="Ej: Nintendo Switch"
              />
            </div>

            <div className="form-group">
              <label>Género</label>
              <input
                type="text"
                name="genero"
                value={formData.genero}
                onChange={handleChange}
                placeholder="Ej: Aventura, RPG"
              />
            </div>
          </div>

          <div className="form-group">
            <label>URL de la Portada</label>
            <input
              type="url"
              name="portada"
              value={formData.portada}
              onChange={handleChange}
              placeholder="https://ejemplo.com/imagen.jpg"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Estado</label>
              <select
                name="estado"
                value={formData.estado}
                onChange={handleChange}
              >
                <option value="pendiente">Pendiente</option>
                <option value="jugando">Jugando</option>
                <option value="completado">Completado</option>
                <option value="abandonado">Abandonado</option>
              </select>
            </div>

            <div className="form-group">
              <label>Puntuación (0-5)</label>
              <input
                type="number"
                name="puntuacion"
                min="0"
                max="5"
                step="0.5"
                value={formData.puntuacion}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Horas Jugadas</label>
              <input
                type="number"
                name="horasJugadas"
                min="0"
                value={formData.horasJugadas}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn-cancelar">
              Cancelar
            </button>
            <button type="submit" className="btn-guardar">
              {juego ? 'Guardar Cambios' : 'Agregar Juego'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioJuego;