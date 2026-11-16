import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import GraficoStatus from '../components/GraficoStatus';
import PokemonList from '../components/PokemonList';
import { useAuth } from '../context/AuthContext';
import { TAMANHO_MAXIMO_TIME, useTime } from '../context/TimeContext';
import { STATS, TIPOS } from '../utils/pokemon';

function MeuTime() {
  const { usuario } = useAuth();
  const { time } = useTime();

  // media de cada status do time
  const media = useMemo(() => {
    const resultado: Record<string, number> = {};
    if (time.length === 0) return resultado;
    Object.keys(STATS).forEach((chave) => {
      const soma = time.reduce((total, p) => total + (p.stats[chave] ?? 0), 0);
      resultado[chave] = Math.round(soma / time.length);
    });
    return resultado;
  }, [time]);

  // quantos pokemon de cada tipo tem no time
  const contagemTipos = useMemo(() => {
    const contagem: Record<string, number> = {};
    time.forEach((p) => {
      p.types.forEach((tipo) => {
        contagem[tipo] = (contagem[tipo] ?? 0) + 1;
      });
    });
    return Object.entries(contagem).sort((a, b) => b[1] - a[1]);
  }, [time]);

  const poderTotal = time.reduce(
    (total, p) => total + Object.values(p.stats).reduce((s, v) => s + v, 0),
    0,
  );

  return (
    <section className="container secao">
      <h1>Time de {usuario?.nome}</h1>

      {time.length === 0 ? (
        <div className="vazio">
          <p>Seu time está vazio. Adicione até {TAMANHO_MAXIMO_TIME} Pokémon pela Pokédex.</p>
          <Link to="/pokedex" className="btn">Ir para a Pokédex</Link>
        </div>
      ) : (
        <>
          <div className="resumo">
            <div className="caixa-resumo">
              <strong>{time.length}/{TAMANHO_MAXIMO_TIME}</strong>
              <span>Pokémon no time</span>
            </div>
            <div className="caixa-resumo">
              <strong>{poderTotal}</strong>
              <span>Soma dos status</span>
            </div>
            <div className="caixa-resumo">
              <strong>{contagemTipos.length}</strong>
              <span>Tipos diferentes</span>
            </div>
          </div>

          <PokemonList pokemons={time} porPagina={TAMANHO_MAXIMO_TIME} />

          <div className="duas-colunas">
            <div>
              <h2>Média de status do time</h2>
              <GraficoStatus stats={media} />
            </div>
            <div>
              <h2>Tipos no time</h2>
              <div className="lista-contagem">
                {contagemTipos.map(([tipo, qtd]) => (
                  <div key={tipo} className="item-contagem">
                    <span className="tipo" style={{ background: TIPOS[tipo].cor }}>{TIPOS[tipo].nome}</span>
                    <span>{qtd}x</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default MeuTime;
