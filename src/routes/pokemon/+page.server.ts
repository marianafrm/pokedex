import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import {
	API_URL,
	getStatByName,
	isValidPokemonData,
	TOTAL_POKEMONS,
	type Pokemon
} from '$lib/utils/pokemonHelper';

export const load: PageServerLoad = async ({ fetch, url, cookies }) => {
	const response = await fetch(`${API_URL}?limit=${TOTAL_POKEMONS}`);
	const data = await response.json();

	if (!data || !data.results) {
		error(502, 'Could not fetch the data');
	}

	const nameSearchParam = url.searchParams.get('name');

	const filterParams = {
		height: url.searchParams.get('height-filter'),
		weight: url.searchParams.get('weight-filter'),
		hp: url.searchParams.get('hp-filter'),
		type: url.searchParams.get('type-filter')
	};

	const sorterParams = {
		name: url.searchParams.get('name-sorter'),
		height: url.searchParams.get('height-sorter'),
		weight: url.searchParams.get('weight-sorter'),
		hp: url.searchParams.get('hp-sorter')
	};

	data.results = applyNameSearchParam(nameSearchParam, data.results);

	let pokemons: Pokemon[] = await Promise.all(
		data.results.map(async ({ url }: { url: string }) => {
			const res = await fetch(url);
			const pokemonData = await res.json();

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
	);

	pokemons = applyFilterParams(filterParams, pokemons);
	pokemons = applySorterParams(sorterParams, pokemons);

	const favoritePokemons = cookies.get('favorite_pokemons')?.split(',');

	return {
		pokemons,
		favoritePokemons
	};
};

const applyNameSearchParam = (nameSearchParam: string | null, results: { name: string }[]) =>
	nameSearchParam === null
		? results
		: results.filter(({ name }) => name.startsWith(nameSearchParam));

const applyFilterParams = (
	filterParams: {
		height: string | null;
		weight: string | null;
		hp: string | null;
		type: string | null;
	},
	pokemons: Pokemon[]
) => {
	let results = pokemons;

	if (filterParams.height) {
		switch (filterParams.height) {
			case 'under1':
				results = results.filter(({ height }) => height < 10);
				break;
			case '1to5':
				results = results.filter(({ height }) => height >= 10 && height <= 50);
				break;
			case '6to10':
				results = results.filter(({ height }) => height >= 60 && height <= 100);
				break;
			case 'over10':
				results = results.filter(({ height }) => height > 100);
				break;
			default:
				break;
		}
	}

	if (filterParams.weight) {
		switch (filterParams.weight) {
			case 'under50':
				results = results.filter(({ weight }) => weight < 500);
				break;
			case '50to100':
				results = results.filter(({ weight }) => weight >= 500 && weight <= 1000);
				break;
			case '101to500':
				results = results.filter(({ weight }) => weight >= 1001 && weight <= 5000);
				break;
			case 'over500':
				results = results.filter(({ weight }) => weight > 5000);
				break;
			default:
				break;
		}
	}

	if (filterParams.hp) {
		switch (filterParams.hp) {
			case 'under50':
				results = results.filter(({ hp }) => hp < 50);
				break;
			case '50to100':
				results = results.filter(({ hp }) => hp >= 50 && hp <= 100);
				break;
			case '101to200':
				results = results.filter(({ hp }) => hp >= 101 && hp <= 200);
				break;
			case 'over200':
				results = results.filter(({ hp }) => hp > 200);
				break;
			default:
				break;
		}
	}

	if (filterParams.type !== null) {
		results = results.filter(({ types }) => types.includes(filterParams.type as string));
	}

	return results;
};

const applySorterParams = (
	sorterParams: {
		name: string | null;
		height: string | null;
		weight: string | null;
		hp: string | null;
	},
	pokemons: Pokemon[]
) => {
	let results = pokemons;

	if (sorterParams.name) {
		results = results.toSorted(({ name: nameA }, { name: nameB }) => {
			if (sorterParams.name === 'asc') {
				if (nameA < nameB) {
					return -1;
				}
				if (nameA > nameB) {
					return 1;
				}
				return 0;
			}

			if (nameA < nameB) {
				return 1;
			}
			if (nameA > nameB) {
				return -1;
			}
			return 0;
		});
	}

	if (sorterParams.height) {
		results = results.toSorted(({ height: heightA }, { height: heightB }) =>
			sorterParams.height === 'asc' ? heightA - heightB : heightB - heightA
		);
	}

	if (sorterParams.weight) {
		results = results.toSorted(({ weight: weightA }, { weight: weightB }) =>
			sorterParams.weight === 'asc' ? weightA - weightB : weightB - weightA
		);
	}

	if (sorterParams.hp) {
		results = results.toSorted(({ hp: hpA }, { hp: hpB }) =>
			sorterParams.hp === 'asc' ? hpA - hpB : hpB - hpA
		);
	}

	return results;
};
