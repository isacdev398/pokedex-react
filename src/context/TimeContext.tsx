import { createContext, useContext, type ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { MembroTime, Pokemon } from '../types/pokemon';

export const TAMANHO_MAXIMO_TIME = 6;

interface TimeContextType {
  time: MembroTime[];
  estaNoTime: (id: number) => boolean;
  adicionar: (pokemon: Pokemon) => boolean;
  remover: (id: number) => void;
}

const TimeContext = createContext<TimeContextType | null>(null);

export function TimeProvider({ children }: { children: ReactNode }) {
  const [time, setTime] = useLocalStorage<MembroTime[]>('meu-time', []);

  function estaNoTime(id: number) {
    return time.some((p) => p.id === id);
  }

  // retorna false se o time ja estiver cheio
  function adicionar(pokemon: Pokemon) {
    if (estaNoTime(pokemon.id)) return true;
    if (time.length >= TAMANHO_MAXIMO_TIME) return false;

    // salvamos so o que o dashboard precisa
    const stats: Record<string, number> = {};
    pokemon.stats.forEach((s) => {
      stats[s.stat.name] = s.base_stat;
    });

    const novo: MembroTime = {
      id: pokemon.id,
      name: pokemon.name,
      types: pokemon.types.map((t) => t.type.name),
      stats,
    };
    setTime([...time, novo]);
    return true;
  }

  function remover(id: number) {
    setTime(time.filter((p) => p.id !== id));
  }

  return (
    <TimeContext.Provider value={{ time, estaNoTime, adicionar, remover }}>{children}</TimeContext.Provider>
  );
}

export function useTime() {
  const context = useContext(TimeContext);
  if (!context) throw new Error('useTime precisa estar dentro do TimeProvider');
  return context;
}
