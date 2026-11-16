// Ericka
import { STATS } from '../utils/pokemon';

interface GraficoStatusProps {
  stats: Record<string, number>;
  cor?: string;
}

// o maior status base que existe e 255, por isso usamos ele como 100% da barra
const MAXIMO = 255;

function GraficoStatus({ stats, cor = '#e3350d' }: GraficoStatusProps) {
  const total = Object.values(stats).reduce((soma, valor) => soma + valor, 0);

  return (
    <div className="grafico">
      {Object.keys(STATS).map((chave) => {
        const valor = stats[chave] ?? 0;
        return (
          <div key={chave} className="linha-status">
            <span className="nome-status">{STATS[chave]}</span>
            <span className="valor-status">{valor}</span>
            <div className="barra">
              <div className="preenchimento" style={{ width: `${(valor / MAXIMO) * 100}%`, background: cor }} />
            </div>
          </div>
        );
      })}
      <div className="linha-status total">
        <span className="nome-status">Total</span>
        <span className="valor-status">{total}</span>
      </div>
    </div>
  );
}

export default GraficoStatus;
