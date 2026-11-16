export const TIPOS: Record<string, { nome: string; cor: string }> = {
  normal: { nome: 'Normal', cor: '#a8a77a' },
  fire: { nome: 'Fogo', cor: '#ee8130' },
  water: { nome: 'Água', cor: '#6390f0' },
  grass: { nome: 'Planta', cor: '#7ac74c' },
  electric: { nome: 'Elétrico', cor: '#e5c22b' },
  ice: { nome: 'Gelo', cor: '#7ecfcb' },
  fighting: { nome: 'Lutador', cor: '#c22e28' },
  poison: { nome: 'Venenoso', cor: '#a33ea1' },
  ground: { nome: 'Terrestre', cor: '#d6b55a' },
  flying: { nome: 'Voador', cor: '#a98ff3' },
  psychic: { nome: 'Psíquico', cor: '#f95587' },
  bug: { nome: 'Inseto', cor: '#a6b91a' },
  rock: { nome: 'Pedra', cor: '#b6a136' },
  ghost: { nome: 'Fantasma', cor: '#735797' },
  dragon: { nome: 'Dragão', cor: '#6f35fc' },
  dark: { nome: 'Sombrio', cor: '#705746' },
  steel: { nome: 'Aço', cor: '#b7b7ce' },
  fairy: { nome: 'Fada', cor: '#d685ad' },
};

export const STATS: Record<string, string> = {
  hp: 'HP',
  attack: 'Ataque',
  defense: 'Defesa',
  'special-attack': 'Atq. Especial',
  'special-defense': 'Def. Especial',
  speed: 'Velocidade',
};

// faixa de ids de cada geracao
export const GERACOES = [
  { numero: 1, inicio: 1, fim: 151, regiao: 'Kanto' },
  { numero: 2, inicio: 152, fim: 251, regiao: 'Johto' },
  { numero: 3, inicio: 252, fim: 386, regiao: 'Hoenn' },
  { numero: 4, inicio: 387, fim: 493, regiao: 'Sinnoh' },
  { numero: 5, inicio: 494, fim: 649, regiao: 'Unova' },
  { numero: 6, inicio: 650, fim: 721, regiao: 'Kalos' },
  { numero: 7, inicio: 722, fim: 809, regiao: 'Alola' },
  { numero: 8, inicio: 810, fim: 905, regiao: 'Galar' },
  { numero: 9, inicio: 906, fim: 1025, regiao: 'Paldea' },
];

// a api manda a url tipo ".../pokemon/25/", entao pegamos o numero do final
export function idDaUrl(url: string) {
  const partes = url.split('/').filter(Boolean);
  return Number(partes[partes.length - 1]);
}

export function formatarNumero(id: number) {
  return '#' + String(id).padStart(3, '0');
}

export function formatarNome(nome: string) {
  return nome
    .split('-')
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(' ');
}
