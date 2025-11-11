import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Clock, Star, Gamepad2, Trophy } from 'lucide-react';
import { obtenerJuegos, obtenerResenas } from '../services/api';
import '../styles/Estadisticas.css';

const Estadisticas = () => {
  const [juegos, setJuegos] = useState([]);
  const [resenas, setResenas] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      setCargando(true);
      const [juegosData, resenasData] = await Promise.all([
        obtenerJuegos(),
        obtenerResenas()
      ]);
      setJuegos(juegosData);
      setResenas(resenasData);
    } catch (error) {
      console.error('Error al cargar datos:', error);
    } finally {
      setCargando(false);
    }
  };

  // Calcular estadísticas
  const stats = {
    totalJuegos: juegos.length,
    juegosPorEstado: {
      jugando: juegos.filter(j => j.estado === 'jugando').length,
      completados: juegos.filter(j => j.estado === 'completado').length,
      pendientes: juegos.filter(j => j.estado === 'pendiente').length,
      abandonados: juegos.filter(j => j.estado === 'abandonado').length
    },
    horasTotales: juegos.reduce((sum, j) => sum + (j.horasJugadas || 0), 0),
    promedioHoras: juegos.length > 0 
      ? (juegos.reduce((sum, j) => sum + (j.horasJugadas || 0), 0) / juegos.length).toFixed(1)
      : 0,
    totalResenas: resenas.length,
    promedioCalificacion: juegos.length > 0
      ? (juegos.reduce((sum, j) => sum + (j.puntuacion || 0), 0) / juegos.length).toFixed(1)
      : 0,
    juegosMasJugados: [...juegos]
      .filter(j => j.horasJugadas > 0)
      .sort((a, b) => b.horasJugadas - a.horasJugadas)
      .slice(0, 5),
    juegosMejorCalificados: [...juegos]
      .filter(j => j.puntuacion > 0)
      .sort((a, b) => b.puntuacion - a.puntuacion)
      .slice(0, 5),
    plataformas: {}
  };

  // Contar juegos por plataforma
  juegos.forEach(juego => {
    const plataforma = juego.plataforma || 'Desconocida';
    stats.plataformas[plataforma] = (stats.plataformas[plataforma] || 0) + 1;
  });

  const plataformasOrdenadas = Object.entries(stats.plataformas)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const renderBarraProgreso = (valor, total, color) => {
    const porcentaje = total > 0 ? (valor / total) * 100 : 0;
    return (
      <div className="barra-progreso-container">
        <div 
          className="barra-progreso-fill" 
          style={{ 
            width: `${porcentaje}%`,
            background: color 
          }}
        />
      </div>
    );
  };

  if (cargando) {
    return (
      <div className="estadisticas-container">
        <div className="cargando">Cargando estadísticas...</div>
      </div>
    );
  }

  return (
    <div className="estadisticas-container">
      {/* Header */}
      <div className="estadisticas-header">
        <div className="header-titulo">
          <BarChart3 size={40} />
          <h1>Estadísticas y Análisis</h1>
        </div>
      </div>

      {/* Stats principales */}
      <div className="stats-principales">
        <div className="stat-card-grande">
          <div className="stat-icono">
            <Gamepad2 size={32} />
          </div>
          <div className="stat-info">
            <div className="stat-valor">{stats.totalJuegos}</div>
            <div className="stat-label">Total de Juegos</div>
          </div>
        </div>

        <div className="stat-card-grande">
          <div className="stat-icono">
            <Clock size={32} />
          </div>
          <div className="stat-info">
            <div className="stat-valor">{stats.horasTotales}h</div>
            <div className="stat-label">Horas Jugadas</div>
          </div>
        </div>

        <div className="stat-card-grande">
          <div className="stat-icono">
            <Star size={32} />
          </div>
          <div className="stat-info">
            <div className="stat-valor">{stats.promedioCalificacion}/5</div>
            <div className="stat-label">Calificación Promedio</div>
          </div>
        </div>

        <div className="stat-card-grande">
          <div className="stat-icono">
            <Trophy size={32} />
          </div>
          <div className="stat-info">
            <div className="stat-valor">{stats.juegosPorEstado.completados}</div>
            <div className="stat-label">Juegos Completados</div>
          </div>
        </div>
      </div>

      {/* Distribución por estado */}
      <div className="seccion-grafico">
        <h2>Distribución por Estado</h2>
        <div className="grafico-barras">
          <div className="barra-item">
            <div className="barra-label">
              <span>Jugando</span>
              <span className="barra-valor">{stats.juegosPorEstado.jugando}</span>
            </div>
            {renderBarraProgreso(
              stats.juegosPorEstado.jugando, 
              stats.totalJuegos, 
              'linear-gradient(135deg, #ff6ea3ff 0%, #d81d68ff 100%)'
            )}
          </div>

          <div className="barra-item">
            <div className="barra-label">
              <span>Completados</span>
              <span className="barra-valor">{stats.juegosPorEstado.completados}</span>
            </div>
            {renderBarraProgreso(
              stats.juegosPorEstado.completados, 
              stats.totalJuegos, 
              'linear-gradient(135deg, #b9104bff 0%, #960557ff 100%)'
            )}
          </div>

          <div className="barra-item">
            <div className="barra-label">
              <span>Pendientes</span>
              <span className="barra-valor">{stats.juegosPorEstado.pendientes}</span>
            </div>
            {renderBarraProgreso(
              stats.juegosPorEstado.pendientes, 
              stats.totalJuegos, 
              'linear-gradient(135deg, #ff8eccff 0%, #ea74b5ff 100%)'
            )}
          </div>

          <div className="barra-item">
            <div className="barra-label">
              <span>Abandonados</span>
              <span className="barra-valor">{stats.juegosPorEstado.abandonados}</span>
            </div>
            {renderBarraProgreso(
              stats.juegosPorEstado.abandonados, 
              stats.totalJuegos, 
              'linear-gradient(135deg, #db2a77ff 0%, #ef93b7ff 100%)'
            )}
          </div>
        </div>
      </div>

      {/* Grid de rankings */}
      <div className="rankings-grid">
        {/* Juegos más jugados */}
        <div className="ranking-card">
          <h3>
            <Clock size={24} />
            Juegos Más Jugados
          </h3>
          {stats.juegosMasJugados.length > 0 ? (
            <div className="ranking-lista">
              {stats.juegosMasJugados.map((juego, index) => (
                <div key={juego._id} className="ranking-item">
                  <div className="ranking-posicion">{index + 1}</div>
                  <div className="ranking-info">
                    <div className="ranking-titulo">{juego.titulo}</div>
                    <div className="ranking-subtitulo">{juego.plataforma}</div>
                  </div>
                  <div className="ranking-valor">{juego.horasJugadas}h</div>
                </div>
              ))}
            </div>
          ) : (
            <p className="sin-datos">No hay datos de horas jugadas</p>
          )}
        </div>

        {/* Juegos mejor calificados */}
        <div className="ranking-card">
          <h3>
            <Star size={24} />
            Mejor Calificados
          </h3>
          {stats.juegosMejorCalificados.length > 0 ? (
            <div className="ranking-lista">
              {stats.juegosMejorCalificados.map((juego, index) => (
                <div key={juego._id} className="ranking-item">
                  <div className="ranking-posicion">{index + 1}</div>
                  <div className="ranking-info">
                    <div className="ranking-titulo">{juego.titulo}</div>
                    <div className="ranking-subtitulo">{juego.plataforma}</div>
                  </div>
                  <div className="ranking-valor">
                    <Star size={16} fill="#fbbf24" stroke="#fbbf24" />
                    {juego.puntuacion}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="sin-datos">No hay juegos calificados</p>
          )}
        </div>

        {/* Plataformas */}
        <div className="ranking-card">
          <h3>
            <TrendingUp size={24} />
            Plataformas Más Usadas
          </h3>
          {plataformasOrdenadas.length > 0 ? (
            <div className="ranking-lista">
              {plataformasOrdenadas.map(([plataforma, cantidad], index) => (
                <div key={plataforma} className="ranking-item">
                  <div className="ranking-posicion">{index + 1}</div>
                  <div className="ranking-info">
                    <div className="ranking-titulo">{plataforma}</div>
                  </div>
                  <div className="ranking-valor">{cantidad} juegos</div>
                </div>
              ))}
            </div>
          ) : (
            <p className="sin-datos">No hay datos de plataformas</p>
          )}
        </div>
      </div>

      {/* Información adicional */}
      <div className="info-adicional">
        <div className="info-card">
          <h4>Promedio de Horas por Juego</h4>
          <p className="info-valor">{stats.promedioHoras}h</p>
        </div>
        <div className="info-card">
          <h4>Total de Reseñas Escritas</h4>
          <p className="info-valor">{stats.totalResenas}</p>
        </div>
        <div className="info-card">
          <h4>Porcentaje de Completados</h4>
          <p className="info-valor">
            {stats.totalJuegos > 0 
              ? ((stats.juegosPorEstado.completados / stats.totalJuegos) * 100).toFixed(1)
              : 0}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default Estadisticas;