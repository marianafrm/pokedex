import { API_URL, getStatByName, isValidPokemonData, type Pokemon } from '$lib/utils/pokemonHelper';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, cookies }) => {
	const favoritePokemons = cookies.get('favorite_pokemons');

	if (!favoritePokemons) {
		return { message: `You don't have favorite Pokémons yet` };
	}

	const pokemons: Pokemon[] = await Promise.all(
		favoritePokemons
			.split(',')
			.map(async (id: string) => {
				const response = await fetch(`${API_URL}/${id}`);
				const pokemonData = await response.json();

				if (!pokemonData || !isValidPokemonData(pokemonData)) {
					return null;
				}

				return {
					id: pokemonData.id,
					name: pokemonData.name,
					height: pokemonData.height,
					weight: pokemonData.weight,
					hp: getStatByName(pokemonData.stats, 'hp'),
					speed: getStatByName(pokemonData.stats, 'speed'),
					attack: getStatByName(pokemonData.stats, 'attack'),
					defense: getStatByName(pokemonData.stats, 'defense'),
					specialAttack: getStatByName(pokemonData.stats, 'special-attack'),
					specialDefense: getStatByName(pokemonData.stats, 'special-defense'),
					types: pokemonData.types.map(({ type }: { type: { name: string } }) => type.name),
					imageUrl: pokemonData.sprites.other.home.front_default
				};
			})
			.filter((pokemon) => pokemon !== null)
	);

	return {
		message: 'Your Pokémon Team',
		pokemons: pokemons.filter((pokemon) => pokemon)
	};
};
