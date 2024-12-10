<script lang="ts">
	import FavoritesCard from '$lib/components/FavoritesCard.svelte';
	import Export from '$lib/components/Export.svelte';

	let { data } = $props();
</script>

<main>
	{#if !data.pokemons}
		<p id="no-pokemons">{data.message}</p>
	{:else}
		<div id="export">
			<Export pokemons={data.pokemons} />
		</div>
		<ul class="list">
			{#each data.pokemons as { id, imageUrl, name, types }}
				<li>
					<FavoritesCard {id} {imageUrl} {name} {types} isFavorite={() => true} />
				</li>
			{/each}
		</ul>
	{/if}
</main>

<style>
	main {
		width: var(--app-width);
	}

	#export {
		width: 100%;
		display: flex;
		justify-content: flex-end;
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
