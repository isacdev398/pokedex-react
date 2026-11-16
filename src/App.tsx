import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Contato from './pages/Contato';
import Home from './pages/Home';
import Login from './pages/Login';
import MeuTime from './pages/MeuTime';
import NaoEncontrada from './pages/NaoEncontrada';
import Pokedex from './pages/Pokedex';
import PokemonDetalhes from './pages/PokemonDetalhes';
import Sobre from './pages/Sobre';

function App() {
  const { pathname } = useLocation();

  // volta pro topo quando troca de pagina
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="app">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokedex" element={<Pokedex />} />
          <Route path="/pokemon/:id" element={<PokemonDetalhes />} />
          <Route
            path="/meu-time"
            element={
              <ProtectedRoute>
                <MeuTime />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="*" element={<NaoEncontrada />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
