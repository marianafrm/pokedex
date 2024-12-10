<script lang="ts">
	import Search from 'lucide-svelte/icons/search';
	import FilterX from 'lucide-svelte/icons/filter-x';
	import Card from '$lib/components/Card.svelte';
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import Export from '$lib/components/Export.svelte';
	import Filters from '$lib/components/Filters.svelte';
	import Sorts from '$lib/components/Sorts.svelte';

	let searchParams = $page.url.searchParams;

	let searchValue = $state(searchParams.get('name') || '');

	let filters = $state({
		height: searchParams.get('height-filter') || '',
		weight: searchParams.get('weight-filter') || '',
		hp: searchParams.get('hp-filter') || '',
		type: searchParams.get('type-filter') || ''
	});

	let sorts = $state({
		name: searchParams.get('name-sorter') || '',
		height: searchParams.get('height-sorter') || '',
		weight: searchParams.get('weight-sorter') || '',
		hp: searchParams.get('hp-sorter') || ''
	});

	const handleClear = () => {
		searchValue = '';

		filters.height = '';
		filters.weight = '';
		filters.hp = '';
		filters.type = '';

		sorts.name = '';
		sorts.height = '';
		sorts.weight = '';
		sorts.hp = '';

		searchParams.delete('name');
		searchParams.delete('height-filter');
		searchParams.delete('weight-filter');
		searchParams.delete('hp-filter');
		searchParams.delete('type-filter');
		searchParams.delete('name-sorter');
		searchParams.delete('height-sorter');
		searchParams.delete('weight-sorter');
		searchParams.delete('hp-sorter');

		goto('/pokemon');
	};

	let { data }: { data: PageData } = $props();

	const isFavorite = (id: number) => !!data.favoritePokemons?.includes(`${id}`);

	const addFavorite = (id: number) => {
		const idStr = `${id}`;

		if (!data.favoritePokemons) {
			document.cookie = `favorite_pokemons=${idStr}`;
			goto('/favorites');
			return;
		}

		document.cookie = `favorite_pokemons=${data.favoritePokemons.concat(idStr).join(',')}`;
		goto('/favorites');
	};

	const removeFavorite = (id: number) => {
		const idStr = `${id}`;

		if (!data.favoritePokemons || !data.favoritePokemons.includes(idStr)) {
			return;
		}

		const newFavPokemons = data.favoritePokemons.filter((pokemonId) => pokemonId !== idStr);

		document.cookie = `favorite_pokemons=${newFavPokemons.join(',')}`;
		goto('/favorites');
	};
</script>

<nav>
	<div id="top-nav">
		<h1 class="title">Gotta catch 'em all</h1>
		<search>
			<form id="search-form">
				<div id="searchbox">
					<input
						id="name-search"
						type="search"
						name="name"
						placeholder="pikachu"
						bind:value={searchValue}
					/>
					<button type="submit"><Search size={18} /></button>
				</div>
			</form>
		</search>
	</div>
	<div id="bottom-nav">
		<div id="left-nav">
			<Filters {searchParams} {filters} />
			<Sorts {searchParams} {sorts} />
		</div>
		<div id="right-nav">
			<Export pokemons={data.pokemons} />
			<button id="clear-filters" onclick={handleClear}>
				<FilterX size={18} />
				Clear all selections
			</button>
		</div>
	</div>
</nav>
<main>
	{#if !data.pokemons}
		<p>Loading...</p>
	{:else if data.pokemons.length < 1}
		<p id="no-pokemons">No Pokémon matches what you're looking for</p>
	{:else}
		<ul class="list">
			{#each data.pokemons as { id, imageUrl, name, types }}
				<li>
					<Card
						{id}
						{imageUrl}
						{name}
						{types}
						isFavorite={() => isFavorite(id)}
						addFavorite={() => addFavorite(id)}
						removeFavorite={() => removeFavorite(id)}
					/>
				</li>
			{/each}
		</ul>
	{/if}
</main>

<style>
	.title {
		font-size: 2.125rem;
	}

	#top-nav {
		width: var(--app-width);
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 1rem 0 1rem 0;

		@media (max-width: 600px) {
			flex-direction: column;
			align-items: flex-start;

			search {
				align-self: flex-end;
			}
		}
	}

	#search-form {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}

	#searchbox {
		display: flex;
		align-items: stretch;

		input {
			border: 1px solid var(--primary-color);
			padding: 0.25rem 0.5rem;
			border-radius: 20px 0 0 20px;
			background-color: var(--background-color);
			color: var(--text-color);
		}

		input::placeholder {
			color: var(--text-color);
			opacity: 50%;
		}

		input:focus {
			background-color: var(--text-color);
			color: var(--background-color);
			outline-color: var(--accent-color);
			outline-style: solid;
			border-color: var(--accent-color);
		}

		input:focus + button {
			background-color: var(--accent-color);
			outline-color: var(--accent-color);
			outline-style: solid;
			color: var(--text-color);
		}

		button {
			border: none;
			padding: 0.125rem 0.375rem;
			border-radius: 0 20px 20px 0;
			background-color: var(--primary-color);
			color: var(--background-color);
		}
	}

	#bottom-nav {
		width: var(--app-width);
		display: flex;
		align-items: flex-end;
		justify-content: space-between;

		@media (max-width: 900px) {
			flex-direction: column;
			align-items: flex-start;
		}
	}

	#right-nav {
		display: flex;
		flex-direction: column;
		align-items: end;
		gap: 0.5rem;

		@media (max-width: 900px) {
			margin-top: 1rem;
			width: 100%;
			flex-direction: row;
			justify-content: flex-end;
			align-items: center;
		}
	}

	#clear-filters {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		border-radius: 20px;
		border: 1px solid var(--primary-color);
		background: transparent;
		color: var(--text-color);
		padding: 0.25rem 0.75rem;
		cursor: pointer;
	}

	#clear-filters:hover {
		border-color: transparent;
		background-color: var(--secondary-color);
	}

	main {
		width: var(--app-width);
	}

	.list {
		list-style: none;
		padding: 0;
		margin-top: 2rem;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		gap: 20px;
	}

	#no-pokemons {
		margin-top: 4rem;
		color: var(--secondary-color);
	}
</style>
