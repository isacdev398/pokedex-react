import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import PokemonList from '../components/PokemonList';
import { useFetch } from '../hooks/useFetch';
import { TOTAL_POKEMON, api, imagemPokemon } from '../services/api';
import type { Pokemon } from '../types/pokemon';
import { TIPOS, formatarNome, formatarNumero } from '../utils/pokemon';

const INICIAIS = [
  { id: 1, name: 'bulbasaur' },
  { id: 4, name: 'charmander' },
  { id: 7, name: 'squirtle' },
  { id: 25, name: 'pikachu' },
  { id: 152, name: 'chikorita' },
  { id: 155, name: 'cyndaquil' },
  { id: 158, name: 'totodile' },
  { id: 133, name: 'eevee' },
];

function Home() {
  // o pokemon do dia muda a cada dia (usa o numero de dias desde 1970)
  const idDoDia = useMemo(() => {
    const dias = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
    return (dias % TOTAL_POKEMON) + 1;
  }, []);

  const { data: pokemon, loading } = useFetch<Pokemon>(api.pokemon(idDoDia));

  return (
    <div>
      <section className="banner">
        <div className="container">
          <h1>Pokédex</h1>
          <p>
            Pesquise todos os {TOTAL_POKEMON} Pokémon, veja seus status, evoluções e monte o seu time
            com até 6 Pokémon.
          </p>
          <div className="botoes">
            <Link to="/pokedex" className="btn btn-claro">Abrir Pokédex</Link>
            <Link to="/meu-time" className="btn btn-contorno">Meu Time</Link>
          </div>
        </div>
      </section>

      <section className="container secao">
        <h2>Pokémon do dia</h2>
        {loading && <Loading />}
        {pokemon && (
          <Link to={`/pokemon/${pokemon.id}`} className="destaque">
            <img src={imagemPokemon(pokemon.id)} alt={pokemon.name} />
            <div>
              <span className="card-numero">{formatarNumero(pokemon.id)}</span>
              <h3>{formatarNome(pokemon.name)}</h3>
              <div className="tipos">
                {pokemon.types.map((t) => (
                  <span key={t.type.name} className="tipo" style={{ background: TIPOS[t.type.name].cor }}>
                    {TIPOS[t.type.name].nome}
                  </span>
                ))}
              </div>
              <p>Altura: {pokemon.height / 10} m | Peso: {pokemon.weight / 10} kg</p>
              <span className="ver-mais">Ver detalhes →</span>
            </div>
          </Link>
        )}

        <h2>Alguns favoritos da turma</h2>
        <PokemonList pokemons={INICIAIS} />
      </section>
    </div>
  );
}

export default Home;
