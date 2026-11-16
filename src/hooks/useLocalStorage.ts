import { useEffect, useState } from 'react';

// igual o useState, mas salva no localStorage pra nao perder quando recarrega a pagina
export function useLocalStorage<T>(chave: string, valorInicial: T) {
  const [valor, setValor] = useState<T>(() => {
    const salvo = localStorage.getItem(chave);
    if (salvo) {
      try {
        return JSON.parse(salvo);
      } catch {
        return valorInicial;
      }
    }
    return valorInicial;
  });

  useEffect(() => {
    localStorage.setItem(chave, JSON.stringify(valor));
  }, [chave, valor]);

  return [valor, setValor] as const;
}
