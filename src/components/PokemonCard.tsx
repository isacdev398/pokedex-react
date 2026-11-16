// Isaac
import { Link } from 'react-router-dom';
import { useTime } from '../context/TimeContext';
import { useFetch } from '../hooks/useFetch';
import { api, imagemPokemon } from '../services/api';
import type { Pokemon } from '../types/pokemon';
import { TIPOS, formatarNome, formatarNumero } from '../utils/pokemon';

interface PokemonCardProps {
  id: number;
  name?: string;
}

function PokemonCard({ id, name }: PokemonCardProps) {
  // cada card busca os dados do seu pokemon pra mostrar os tipos
  const { data: pokemon } = useFetch<Pokemon>(api.pokemon(id));
  const { estaNoTime, adicionar, remover } = useTime();

  const noTime = estaNoTime(id);
  const tipoPrincipal = pokemon?.types[0].type.name ?? 'normal';
  const nome = pokemon?.name ?? name ?? '';

  function clicarTime() {
    if (!pokemon) return;
    if (noTime) {
      remover(id);
    } else if (!adicionar(pokemon)) {
      alert('Seu time já tem 6 Pokémon! Remova um antes de adicionar outro.');
    }
  }

  return (
    <div className="card" style={{ borderTopColor: TIPOS[tipoPrincipal].cor }}>
      <Link to={`/pokemon/${id}`} className="card-link">
        <span className="card-numero">{formatarNumero(id)}</span>
        <img src={imagemPokemon(id)} alt={nome} loading="lazy" />
        <h3>{formatarNome(nome)}</h3>
        <div className="tipos">
          {pokemon?.types.map((t) => (
            <span key={t.type.name} className="tipo" style={{ background: TIPOS[t.type.name].cor }}>
              {TIPOS[t.type.name].nome}
            </span>
          ))}
        </div>
      </Link>

      <button
        className={noTime ? 'btn-time no-time' : 'btn-time'}
        onClick={clicarTime}
        disabled={!pokemon}
        title={noTime ? 'Remover do time' : 'Adicionar ao time'}
      >
        {noTime ? '- Time' : '+ Time'}
      </button>
    </div>
  );
}

export default PokemonCard;
