import { useEffect, useState } from 'react';

// hook pra fazer requisicao e ja controlar o loading e o erro
// se a url for null ele nao busca nada
export function useFetch<T>(url: string | null) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(url !== null);
  const [erro, setErro] = useState<string | null>(null);
  const [tentativa, setTentativa] = useState(0);

  useEffect(() => {
    if (!url) return;

    // se o componente sair da tela antes da resposta, a gente ignora o resultado
    let cancelado = false;

    async function buscar(endereco: string) {
      setLoading(true);
      setErro(null);
      try {
        const resposta = await fetch(endereco);
        if (!resposta.ok) throw new Error('Erro ' + resposta.status);
        const json = await resposta.json();
        if (!cancelado) setData(json);
      } catch {
        if (!cancelado) setErro('Não foi possível carregar os dados.');
      } finally {
        if (!cancelado) setLoading(false);
      }
    }

    buscar(url);

    return () => {
      cancelado = true;
    };
  }, [url, tentativa]);

  function tentarDeNovo() {
    setTentativa((t) => t + 1);
  }

  return { data, loading, erro, tentarDeNovo };
}
