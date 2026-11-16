import { useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import GraficoStatus from '../components/GraficoStatus';
import Loading from '../components/Loading';
import { useTime } from '../context/TimeContext';
import { useFetch } from '../hooks/useFetch';
import { TOTAL_POKEMON, api, imagemPokemon } from '../services/api';
import type { CadeiaEvolucao, ElosEvolucao, Especie, Pokemon } from '../types/pokemon';
import { TIPOS, formatarNome, formatarNumero, idDaUrl } from '../utils/pokemon';

// transforma a arvore de evolucao em uma lista simples
function listarEvolucoes(elo: ElosEvolucao): { id: number; name: string }[] {
  const atual = { id: idDaUrl(elo.species.url), name: elo.species.name };
  const proximos = elo.evolves_to.flatMap((e) => listarEvolucoes(e));
  return [atual, ...proximos];
}

function PokemonDetalhes() {
  const { id } = useParams();
  const navigate = useNavigate();
  const numero = Number(id);
  const [shiny, setShiny] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { estaNoTime, adicionar, remover } = useTime();

  const { data: pokemon, loading, erro } = useFetch<Pokemon>(api.pokemon(numero));
  const { data: especie } = useFetch<Especie>(api.especie(numero));
  // a url da evolucao vem dentro da especie, entao so busca depois que ela chegar
  const { data: evolucao } = useFetch<CadeiaEvolucao>(especie ? especie.evolution_chain.url : null);

  if (loading) return <Loading />;

  if (erro || !pokemon) {
    return (
      <section className="container secao">
        <p className="caixa-erro">Pokémon não encontrado.</p>
        <Link to="/pokedex">Voltar para a Pokédex</Link>
      </section>
    );
  }

  const tipoPrincipal = pokemon.types[0].type.name;
  const cor = TIPOS[tipoPrincipal].cor;
  const noTime = estaNoTime(pokemon.id);

  const stats: Record<string, number> = {};
  pokemon.stats.forEach((s) => (stats[s.stat.name] = s.base_stat));

  // a api nao tem descricao em portugues, entao usamos a em ingles
  const descricao = especie?.flavor_text_entries
    .find((f) => f.language.name === 'en')
    ?.flavor_text.replace(/[\n\f]/g, ' ');
  const categoria = especie?.genera.find((g) => g.language.name === 'en')?.genus;

  function tocarSom() {
    audioRef.current?.play();
  }

  function clicarTime() {
    if (!pokemon) return;
    if (noTime) {
      remover(pokemon.id);
    } else if (!adicionar(pokemon)) {
      alert('Seu time já tem 6 Pokémon!');
    }
  }

  const imagem = shiny
    ? pokemon.sprites.other['official-artwork'].front_shiny
    : pokemon.sprites.other['official-artwork'].front_default;

  return (
    <section className="container secao">
      <div className="navegacao-detalhes">
        <button className="btn btn-secundario" onClick={() => navigate(-1)}>← Voltar</button>
        <div>
          {numero > 1 && (
            <Link className="btn btn-secundario" to={`/pokemon/${numero - 1}`}>
              {formatarNumero(numero - 1)}
            </Link>
          )}
          {numero < TOTAL_POKEMON && (
            <Link className="btn btn-secundario" to={`/pokemon/${numero + 1}`}>
              {formatarNumero(numero + 1)}
            </Link>
          )}
        </div>
      </div>

      <div className="detalhes">
        <div className="detalhes-imagem" style={{ background: cor + '33' }}>
          <img src={imagem ?? imagemPokemon(pokemon.id)} alt={pokemon.name} />
          <label className="check-shiny">
            <input type="checkbox" checked={shiny} onChange={() => setShiny(!shiny)} />
            Ver versão shiny
          </label>
        </div>

        <div className="detalhes-info">
          <span className="card-numero">{formatarNumero(pokemon.id)}</span>
          <h1>{formatarNome(pokemon.name)}</h1>
          {categoria && <p className="categoria">{categoria}</p>}

          <div className="tipos">
            {pokemon.types.map((t) => (
              <span key={t.type.name} className="tipo" style={{ background: TIPOS[t.type.name].cor }}>
                {TIPOS[t.type.name].nome}
              </span>
            ))}
            {especie?.is_legendary && <span className="tipo lendario">Lendário</span>}
            {especie?.is_mythical && <span className="tipo lendario">Mítico</span>}
          </div>

          {descricao && <p className="descricao">{descricao}</p>}

          <div className="infos">
            <div><strong>{pokemon.height / 10} m</strong><span>Altura</span></div>
            <div><strong>{pokemon.weight / 10} kg</strong><span>Peso</span></div>
            <div><strong>{pokemon.base_experience ?? '-'}</strong><span>XP base</span></div>
          </div>

          <p>
            <strong>Habilidades: </strong>
            {pokemon.abilities
              .map((a) => formatarNome(a.ability.name) + (a.is_hidden ? ' (oculta)' : ''))
              .join(', ')}
          </p>

          <div className="botoes">
            <button className={noTime ? 'btn btn-secundario' : 'btn'} onClick={clicarTime}>
              {noTime ? 'Remover do time' : 'Adicionar ao time'}
            </button>
            {pokemon.cries.latest && (
              <>
                <button className="btn btn-secundario" onClick={tocarSom}>Ouvir som</button>
                <audio ref={audioRef} src={pokemon.cries.latest} />
              </>
            )}
          </div>
        </div>
      </div>

      <h2>Status base</h2>
      <GraficoStatus stats={stats} cor={cor} />

      {evolucao && (
        <>
          <h2>Evoluções</h2>
          <div className="evolucoes">
            {listarEvolucoes(evolucao.chain).map((p) => (
              <Link
                key={p.id}
                to={`/pokemon/${p.id}`}
                className={p.id === pokemon.id ? 'evolucao atual' : 'evolucao'}
              >
                <img src={imagemPokemon(p.id)} alt={p.name} />
                <span>{formatarNome(p.name)}</span>
              </Link>
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default PokemonDetalhes;
