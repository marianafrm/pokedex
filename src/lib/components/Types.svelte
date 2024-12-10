<script lang="ts">
	import { typeColors } from '$lib/utils/typeColors';
	import Tag from './Tag.svelte';

	let { types } = $props();
</script>

<ul class="types">
	{#each types as type}
		<li>
			<Tag text={type} color={typeColors[type]} />
		</li>
	{/each}
</ul>

<style>
	.types {
		display: flex;
		justify-content: flex-end;
		list-style: none;
		padding: 0;
	}
</style>
