export interface PokemonResumo {
  id: number;
  name: string;
}

// resposta de /pokemon?limit=...
export interface ListaPokemonResponse {
  count: number;
  results: { name: string; url: string }[];
}

// resposta de /pokemon/{id} (so os campos que a gente usa)
export interface Pokemon {
  id: number;
  name: string;
  height: number; // em decimetros
  weight: number; // em hectogramas
  base_experience: number;
  types: { slot: number; type: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
  abilities: { is_hidden: boolean; ability: { name: string } }[];
  sprites: {
    front_default: string;
    other: { 'official-artwork': { front_default: string; front_shiny: string } };
  };
  cries: { latest: string };
}

// resposta de /pokemon-species/{id}
export interface Especie {
  genera: { genus: string; language: { name: string } }[];
  flavor_text_entries: { flavor_text: string; language: { name: string } }[];
  evolution_chain: { url: string };
  is_legendary: boolean;
  is_mythical: boolean;
}

export interface ElosEvolucao {
  species: { name: string; url: string };
  evolves_to: ElosEvolucao[];
}

export interface CadeiaEvolucao {
  chain: ElosEvolucao;
}

// resposta de /type/{nome}
export interface TipoResponse {
  pokemon: { pokemon: { name: string; url: string } }[];
}

// o que fica salvo no "meu time"
export interface MembroTime {
  id: number;
  name: string;
  types: string[];
  stats: Record<string, number>;
}

export interface Usuario {
  nome: string;
  email: string;
}
