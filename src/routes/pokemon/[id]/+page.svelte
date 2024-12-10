<script lang="ts">
	import type { PageData } from './$types';
	import { addZeros } from '$lib/utils/addZeros';
	import Hpbar from '$lib/components/HpBar.svelte';
	import Types from '$lib/components/Types.svelte';
	import { typeColors } from '$lib/utils/typeColors';

	let { data }: { data: PageData } = $props();

	let { id, name, height, weight } = data;
	let image = data.sprites.other.home.front_default;
	let types = data.types.map(({ type }: { type: { name: string } }) => type.name);
	let statsObj = data.stats.reduce(
		(acc: {}, curr: { base_stat: number; stat: { name: string } }) => ({
			...acc,
			[curr.stat.name]: curr.base_stat
		}),
		{}
	);

	let mainColor = typeColors[types[0]];

	const dmToM = (heightInDm: number) => heightInDm / 10;
	const hgToKg = (weightInHg: number) => weightInHg / 10;
</script>

<main>
	{#if !!data}
		<img src={image} alt={`${name} artwork`} />
		<div class="content">
			<div class="title">
				<h1>{name}</h1>
				<span style={`color: ${mainColor};`}>#{addZeros(id)}</span>
				<Types {types} />
			</div>
			<div>
				<table>
					<tbody>
						<tr style={`color: ${mainColor}`}>
							<th>Height</th>
							<td>{dmToM(height)}m</td>
						</tr>
						<tr style={`color: ${mainColor}`}>
							<th>Weight</th>
							<td>{hgToKg(weight)}kg</td>
						</tr>
						<tr style={`color: ${mainColor}`}>
							<th>Speed</th>
							<td>{statsObj.speed}</td>
						</tr>
						<tr style={`color: ${mainColor}`}>
							<th>Attack</th>
							<td>{statsObj.attack}</td>
						</tr>
						<tr style={`color: ${mainColor}`}>
							<th>Defense</th>
							<td>{statsObj.defense}</td>
						</tr>
						<tr style={`color: ${mainColor}`}>
							<th>Special Attack</th>
							<td>{statsObj['special-attack']}</td>
						</tr>
						<tr style={`color: ${mainColor}`}>
							<th>Special Defense</th>
							<td>{statsObj['special-defense']}</td>
						</tr>
					</tbody>
				</table>
				<div class="hp-wrapper">
					<Hpbar level={statsObj.hp} color={mainColor} />
				</div>
			</div>
		</div>
	{:else}
		<div class="title">
			<h2>Loading...</h2>
		</div>
	{/if}
</main>

<style>
	main {
		width: var(--app-width);
		display: grid;
		grid-template-columns: 0.5fr 1fr;

		@media (max-width: 850px) {
			grid-template-columns: 1fr;
		}
	}

	img {
		width: 450px;
		justify-self: center;
		align-self: center;

		@media (max-width: 1200px) {
			max-width: 400px;
		}

		@media (max-width: 1000px) {
			max-width: 350px;
		}

		@media (max-width: 850px) {
			max-width: 300px;
		}

		@media (max-width: 700px) {
			max-width: 250px;
		}

		@media (max-width: 550px) {
			max-width: 200px;
		}
	}

	.content {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		margin-top: 1.5rem;
	}

	.title {
		margin-bottom: 1.5rem;

		h1 {
			text-transform: capitalize;
			margin-bottom: 0.75rem;
		}

		span {
			font-family: monospace;
			font-size: 1rem;
		}
	}

	table {
		width: 60%;
		margin-left: 20%;
		border-collapse: collapse;

		@media (max-width: 550px) {
			width: 80%;
			margin-left: 10%;
		}

		@media (max-width: 400px) {
			width: 100%;
			margin-left: 0;
		}
	}

	tr {
		border-bottom: 1px solid color-mix(in srgb, currentcolor 80%, transparent);
	}

	th,
	td {
		padding: 0.5rem 0 0.375rem 0;
		color: var(--text-color);
	}

	th {
		text-align: left;
		padding-left: 2rem;
		font-size: 1.125rem;
		font-weight: normal;
	}
</style>
