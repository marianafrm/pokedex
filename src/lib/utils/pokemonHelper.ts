export const API_URL = 'https://pokeapi.co/api/v2/pokemon';
export const TOTAL_POKEMONS = 150;

export interface Pokemon {
	id: number;
	name: string;
	height: number;
	weight: number;
	hp: number;
	speed: number;
	attack: number;
	defense: number;
	specialAttack: number;
	specialDefense: number;
	types: string[];
	imageUrl: string;
}

export const getStatByName = (
	stats: {
		base_stat: number;
		effort: number;
		stat: {
			name: string;
			url: string;
		};
	}[],
	name: string
) => stats.find(({ stat }) => stat.name === name)?.base_stat || -1;

export const isValidPokemonData = (data: unknown): boolean => {
	if (!data || typeof data !== 'object') {
		return false;
	}

	const neededKeys = ['id', 'name', 'height', 'weight', 'stats', 'types', 'sprites'];
	const dataKeys = Object.keys(data);
	return neededKeys.every((key) => dataKeys.includes(key));
};
