// Isaac
import { useEffect, useState } from 'react';
import type { PokemonResumo } from '../types/pokemon';
import PokemonCard from './PokemonCard';

interface PokemonListProps {
  pokemons: PokemonResumo[];
  porPagina?: number;
}

function PokemonList({ pokemons, porPagina = 20 }: PokemonListProps) {
  const [quantidade, setQuantidade] = useState(porPagina);

  // quando muda a busca/filtro volta a mostrar so a primeira pagina
  useEffect(() => {
    setQuantidade(porPagina);
  }, [pokemons, porPagina]);

  if (pokemons.length === 0) {
    return <p className="vazio">Nenhum Pokémon encontrado.</p>;
  }

  return (
    <div>
      <div className="grid">
        {pokemons.slice(0, quantidade).map((p) => (
          <PokemonCard key={p.id} id={p.id} name={p.name} />
        ))}
      </div>

      {quantidade < pokemons.length && (
        <div className="centro">
          <button className="btn" onClick={() => setQuantidade(quantidade + porPagina)}>
            Carregar mais ({pokemons.length - quantidade} restantes)
          </button>
        </div>
      )}
    </div>
  );
}

export default PokemonList;
