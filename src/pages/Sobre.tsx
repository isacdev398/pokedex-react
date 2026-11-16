const integrantes = [
  { nome: 'Giordana Livia De Jesus Azevedo', matricula: '01798431', componentes: 'Navbar e Footer' },
  { nome: 'Isaac Rocha Sampaio', matricula: '01786071', componentes: 'PokemonCard e PokemonList' },
  { nome: 'Ana Clara Monteiro', matricula: '01771219', componentes: 'SearchBar e Filtros' },
  { nome: 'João Ricardo Braga Freitas', matricula: '01818117', componentes: 'LoginForm e ProtectedRoute' },
  { nome: 'Éricka Mara De Oliveira Silva', matricula: '01808076', componentes: 'GraficoStatus e ContactForm' },
];

function Sobre() {
  return (
    <section className="container secao">
      <h1>Sobre o projeto</h1>
      <p>
        Essa Pokédex foi feita para o trabalho final da disciplina de Front-end Frameworks. Os dados vêm
        da <a href="https://pokeapi.co" target="_blank" rel="noreferrer">PokéAPI</a>, uma API pública e
        gratuita. Dá para pesquisar os Pokémon, filtrar por tipo e geração, ver status e evoluções e montar
        um time de até 6 Pokémon.
      </p>

      <h2>Tecnologias</h2>
      <ul>
        <li>React com TypeScript</li>
        <li>React Router para as páginas</li>
        <li>Hooks: useState, useEffect, useContext, useRef, useMemo e hooks próprios (useFetch, useDebounce e useLocalStorage)</li>
        <li>PokéAPI (REST)</li>
        <li>Vite</li>
      </ul>

      <h2>Equipe</h2>
      <div className="equipe">
        {integrantes.map((i) => (
          <div key={i.matricula} className="integrante">
            <strong>{i.nome}</strong>
            <span>Matrícula: {i.matricula}</span>
            <span>Componentes: {i.componentes}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Sobre;
