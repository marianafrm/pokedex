<script lang="ts">
	import type { Pokemon } from '$lib/utils/pokemonHelper';
	import FileDown from 'lucide-svelte/icons/file-down';
	import Papa from 'papaparse';

	let { pokemons }: { pokemons: Pokemon[] } = $props();

	const handleClick = () => {
		const csv = Papa.unparse(pokemons);
		const blob = new Blob([csv], { type: 'text/csv' });
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.download = 'pokedex.csv';
		link.click();
		document.body.removeChild(link);
		URL.revokeObjectURL(url);
	};
</script>

<button onclick={handleClick}>
	<FileDown strokeWidth={1.5} />
	Export current list
</button>

<style>
	button {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		border-radius: 20px;
		border: none;
		padding: 0.25rem 0.75rem;
		background-color: var(--accent-color);
		color: var(--text-color);
		cursor: pointer;
	}

	button:hover {
		background-color: var(--text-color);
		color: var(--accent-color);
	}

	button:active {
		transform: translateY(3px);
	}
</style>
