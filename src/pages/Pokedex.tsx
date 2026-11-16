import { useMemo, useState } from 'react';
import Filtros, { type Ordem } from '../components/Filtros';
import Loading from '../components/Loading';
import PokemonList from '../components/PokemonList';
import SearchBar from '../components/SearchBar';
import { useDebounce } from '../hooks/useDebounce';
import { useFetch } from '../hooks/useFetch';
import { api } from '../services/api';
import type { ListaPokemonResponse, PokemonResumo, TipoResponse } from '../types/pokemon';
import { GERACOES, idDaUrl } from '../utils/pokemon';

function Pokedex() {
  const [busca, setBusca] = useState('');
  const [tipo, setTipo] = useState('');
  const [geracao, setGeracao] = useState(0);
  const [ordem, setOrdem] = useState<Ordem>('numero');
  const buscaAtrasada = useDebounce(busca);

  const lista = useFetch<ListaPokemonResponse>(api.lista());
  // so busca a lista do tipo quando algum tipo for escolhido
  const listaDoTipo = useFetch<TipoResponse>(tipo ? api.tipo(tipo) : null);

  const todos = useMemo<PokemonResumo[]>(() => {
    if (!lista.data) return [];
    return lista.data.results.map((p) => ({ id: idDaUrl(p.url), name: p.name }));
  }, [lista.data]);

  // useMemo pra nao refazer o filtro toda hora, so quando algo mudar
  const filtrados = useMemo(() => {
    let resultado = todos;

    if (geracao > 0) {
      const g = GERACOES[geracao - 1];
      resultado = resultado.filter((p) => p.id >= g.inicio && p.id <= g.fim);
    }

    if (tipo && listaDoTipo.data) {
      const idsDoTipo = new Set(listaDoTipo.data.pokemon.map((p) => idDaUrl(p.pokemon.url)));
      resultado = resultado.filter((p) => idsDoTipo.has(p.id));
    }

    const texto = buscaAtrasada.trim().toLowerCase();
    if (texto) {
      resultado = resultado.filter((p) => p.name.includes(texto) || String(p.id) === texto);
    }

    if (ordem === 'nome-az') {
      resultado = [...resultado].sort((a, b) => a.name.localeCompare(b.name));
    } else if (ordem === 'nome-za') {
      resultado = [...resultado].sort((a, b) => b.name.localeCompare(a.name));
    }

    return resultado;
  }, [todos, geracao, tipo, listaDoTipo.data, buscaAtrasada, ordem]);

  return (
    <section className="container secao">
      <h1>Pokédex</h1>
      <SearchBar valor={busca} onChange={setBusca} />
      <Filtros
        tipo={tipo}
        setTipo={setTipo}
        geracao={geracao}
        setGeracao={setGeracao}
        ordem={ordem}
        setOrdem={setOrdem}
      />

      {lista.erro && (
        <div className="caixa-erro">
          <p>{lista.erro}</p>
          <button className="btn" onClick={lista.tentarDeNovo}>Tentar de novo</button>
        </div>
      )}

      {lista.loading || listaDoTipo.loading ? (
        <Loading />
      ) : (
        lista.data && (
          <>
            <p className="resultado">{filtrados.length} Pokémon encontrados</p>
            <PokemonList pokemons={filtrados} />
          </>
        )
      )}
    </section>
  );
}

export default Pokedex;
