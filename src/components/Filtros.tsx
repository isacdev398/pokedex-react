// Ana Clara
import { GERACOES, TIPOS } from '../utils/pokemon';

export type Ordem = 'numero' | 'nome-az' | 'nome-za';

interface FiltrosProps {
  tipo: string;
  setTipo: (tipo: string) => void;
  geracao: number;
  setGeracao: (geracao: number) => void;
  ordem: Ordem;
  setOrdem: (ordem: Ordem) => void;
}

function Filtros({ tipo, setTipo, geracao, setGeracao, ordem, setOrdem }: FiltrosProps) {
  return (
    <div className="filtros">
      <div className="lista-tipos">
        <button className={tipo === '' ? 'filtro-tipo ativo' : 'filtro-tipo'} onClick={() => setTipo('')}>
          Todos
        </button>
        {Object.entries(TIPOS).map(([chave, info]) => (
          <button
            key={chave}
            className={tipo === chave ? 'filtro-tipo ativo' : 'filtro-tipo'}
            style={tipo === chave ? { background: info.cor, borderColor: info.cor } : {}}
            onClick={() => setTipo(chave)}
          >
            {info.nome}
          </button>
        ))}
      </div>

      <div className="selects">
        <label>
          Geração
          <select value={geracao} onChange={(e) => setGeracao(Number(e.target.value))}>
            <option value={0}>Todas</option>
            {GERACOES.map((g) => (
              <option key={g.numero} value={g.numero}>
                {g.numero}ª - {g.regiao}
              </option>
            ))}
          </select>
        </label>

        <label>
          Ordenar
          <select value={ordem} onChange={(e) => setOrdem(e.target.value as Ordem)}>
            <option value="numero">Número</option>
            <option value="nome-az">Nome (A-Z)</option>
            <option value="nome-za">Nome (Z-A)</option>
          </select>
        </label>
      </div>
    </div>
  );
}

export default Filtros;
