<script lang="ts">
	import Heart from 'lucide-svelte/icons/heart';

	let { isFavorite, addFavorite, removeFavorite } = $props();

	let isOn = $derived(isFavorite());
</script>

<button onclick={() => (isOn ? removeFavorite() : addFavorite())} class:button-on={isOn}>
	<Heart id="heart" />
</button>

<style>
	button {
		width: 20%;
		background-color: transparent;
		border: none;
		color: var(--secondary-color);
		cursor: pointer;
	}

	button:active {
		transform: translateY(3px);
	}

	button:hover > :global(#heart) {
		fill: var(--secondary-color);
	}

	.button-on > :global(#heart) {
		fill: var(--secondary-color);
	}

	.button-on:hover > :global(#heart) {
		fill: none;
	}
</style>
