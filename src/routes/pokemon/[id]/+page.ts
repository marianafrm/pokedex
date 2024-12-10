import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
	const id = Number(params.id);

	if (!id || id < 1 || id > 150) {
		error(404, {
			message: 'Pokémon not found'
		});
	}

	const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

	return await response.json();
};
