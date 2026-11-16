const BASE_URL = 'https://pokeapi.co/api/v2';

export const TOTAL_POKEMON = 1025;

export const api = {
  lista: () => `${BASE_URL}/pokemon?limit=${TOTAL_POKEMON}`,
  pokemon: (id: number | string) => `${BASE_URL}/pokemon/${id}`,
  especie: (id: number | string) => `${BASE_URL}/pokemon-species/${id}`,
  tipo: (nome: string) => `${BASE_URL}/type/${nome}`,
};

// a imagem a gente monta direto pelo id, nao precisa de requisicao
export function imagemPokemon(id: number) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}
