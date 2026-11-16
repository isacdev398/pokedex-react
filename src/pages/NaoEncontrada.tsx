import { Link } from 'react-router-dom';

function NaoEncontrada() {
  return (
    <section className="container secao centro">
      <h1>404</h1>
      <p>Essa página não existe.</p>
      <Link to="/" className="btn">Voltar para o início</Link>
    </section>
  );
}

export default NaoEncontrada;
