// Giordana
import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTime } from '../context/TimeContext';

function Navbar() {
  const { usuario, logout } = useAuth();
  const { time } = useTime();
  const [menuAberto, setMenuAberto] = useState(false);
  const navigate = useNavigate();

  function fecharMenu() {
    setMenuAberto(false);
  }

  function sair() {
    logout();
    fecharMenu();
    navigate('/');
  }

  return (
    <header className="navbar">
      <div className="container navbar-conteudo">
        <Link to="/" className="logo" onClick={fecharMenu}>
          <span className="pokebola" />
          Pokédex
        </Link>

        <button className="botao-menu" onClick={() => setMenuAberto(!menuAberto)}>
          {menuAberto ? 'X' : '☰'}
        </button>

        <nav className={menuAberto ? 'links aberto' : 'links'}>
          <NavLink to="/" end onClick={fecharMenu}>Início</NavLink>
          <NavLink to="/pokedex" onClick={fecharMenu}>Pokédex</NavLink>
          <NavLink to="/meu-time" onClick={fecharMenu}>
            Meu Time <span className="contador">{time.length}/6</span>
          </NavLink>
          <NavLink to="/sobre" onClick={fecharMenu}>Sobre</NavLink>
          <NavLink to="/contato" onClick={fecharMenu}>Contato</NavLink>

          {usuario ? (
            <div className="usuario">
              <span>Olá, {usuario.nome}</span>
              <button className="btn btn-claro" onClick={sair}>Sair</button>
            </div>
          ) : (
            <Link to="/login" className="btn btn-claro" onClick={fecharMenu}>Entrar</Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
