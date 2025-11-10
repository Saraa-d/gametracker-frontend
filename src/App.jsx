import React, { useState } from 'react';
import Navegacion from './components/Navegacion';
import BibliotecaJuegos from './pages/BibliotecaJuegos';
import ListaResenas from './pages/ListaResenas';
import Estadisticas from './pages/Estadisticas';
import './App.css';

function App() {
  const [paginaActual, setPaginaActual] = useState('biblioteca');

  return (
    <div className="App">
      <Navegacion paginaActual={paginaActual} onCambiarPagina={setPaginaActual} />
      
      {paginaActual === 'biblioteca' && <BibliotecaJuegos />}
      {paginaActual === 'resenas' && <ListaResenas />}
      {paginaActual === 'estadisticas' && <Estadisticas />}
    </div>
  );
}

export default App;