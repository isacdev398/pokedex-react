// Giordana
import { Link } from 'react-router-dom';

function Footer() {
  const ano = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-conteudo">
        <div>
          <h4>Pokédex</h4>
          <p>Trabalho final de Front-end Frameworks - Ciência da Computação</p>
        </div>

        <div>
          <h4>Páginas</h4>
          <Link to="/pokedex">Pokédex</Link>
          <Link to="/meu-time">Meu Time</Link>
          <Link to="/sobre">Sobre</Link>
          <Link to="/contato">Contato</Link>
        </div>

        <div>
          <h4>Dados</h4>
          <a href="https://pokeapi.co" target="_blank" rel="noreferrer">PokéAPI</a>
          <p className="pequeno">Pokémon e seus nomes são marcas da Nintendo/Game Freak. Projeto sem fins lucrativos.</p>
        </div>
      </div>
      <p className="copyright">{ano} - Feito com React e TypeScript</p>
    </footer>
  );
}

export default Footer;
