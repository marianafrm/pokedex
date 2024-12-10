<script lang="ts">
	import { page } from '$app/stores';
	import { addZeros } from '$lib/utils/addZeros';
	import Types from './Types.svelte';
	import Share from './Share.svelte';
	import Heart from './Heart.svelte';

	let { id, imageUrl, name, types, isFavorite, addFavorite, removeFavorite } = $props();
</script>

{#if !id}
	<span>Loading...</span>
{:else}
	<div class="card">
		<div class="card-top">
			<Types {types} />
			<div id="controls">
				<Share
					shareTarget={{
						title: name,
						text: `A wild ${name} appeared!`,
						url: `${$page.url}${id}`
					}}
				/>
				<Heart {isFavorite} {addFavorite} {removeFavorite} />
			</div>
		</div>
		<a href={`/pokemon/${id}`}>
			<div class="picture">
				<img src={imageUrl} alt={`${name} artwork`} />
			</div>
			<div class="content">
				<div class="title">
					<p>{name}</p>
					<span>#{addZeros(id)}</span>
				</div>
			</div>
		</a>
	</div>
{/if}

<style>
	a {
		text-decoration: none;
		color: var(--text-color);
		transition: transform 100ms;

		.picture {
			border-radius: 50%;
			display: flex;
			justify-content: center;
			align-items: center;
			margin-top: 0.5rem;
		}
	}

	a:hover {
		.picture {
			background: radial-gradient(
				ellipse at center,
				color-mix(in srgb, var(--primary-color) 50%, transparent) 0%,
				color-mix(in srgb, var(--primary-color) 30%, transparent) 10%,
				color-mix(in srgb, var(--primary-color) 10%, transparent) 30%,
				transparent 50%
			);
			transform: scale(1.075);
		}

		.title {
			color: var(--terciary-color);
		}
	}

	.card {
		background: color-mix(in srgb, var(--primary-color) 10%, transparent);
		height: 100%;
		border-radius: 15px;
		display: flex;
		flex-direction: column;
		font-size: 0.875rem;
		padding: 0.1rem;

		img {
			width: 10rem;
			margin-bottom: 1rem;
			align-self: center;
		}
	}

	.card-top {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		padding: 1rem 1rem 0 1rem;
	}

	#controls {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.content {
		padding-right: 0.5rem;
		margin: 0rem 0.75rem;
	}

	.title {
		display: flex;
		justify-content: space-between;
		align-items: center;

		p {
			font-size: large;
			font-weight: bold;
			text-transform: capitalize;
			padding-left: 0.5rem;
		}

		span {
			font-size: small;
			font-family: monospace;
			color: var(--primary-color);
		}
	}
</style>
