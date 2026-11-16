import { useEffect, useState } from 'react';

// espera o usuario parar de digitar antes de atualizar o valor
export function useDebounce<T>(valor: T, tempo = 400) {
  const [valorAtrasado, setValorAtrasado] = useState(valor);

  useEffect(() => {
    const timer = setTimeout(() => setValorAtrasado(valor), tempo);
    return () => clearTimeout(timer);
  }, [valor, tempo]);

  return valorAtrasado;
}
