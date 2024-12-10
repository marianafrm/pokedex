<script lang="ts">
	import { goto } from '$app/navigation';

	let { searchParams, filters } = $props();

	const filterTypes = ['height', 'weight', 'hp', 'type'] as const;
	type Filter = (typeof filterTypes)[number];

	const filterOptions: {
		id: Filter;
		title: string;
		options: { value: string; label: string }[];
	}[] = [
		{
			id: 'height',
			title: 'Height',
			options: [
				{ value: 'under1', label: 'Under 1m' },
				{ value: '1to5', label: '1m to 5m' },
				{ value: '6to10', label: '6m to 10m' },
				{ value: 'over10', label: 'Over 10m' }
			]
		},
		{
			id: 'weight',
			title: 'Weight',
			options: [
				{ value: 'under50', label: 'Under 50kg' },
				{ value: '50to100', label: '50kg to 100kg' },
				{ value: '101to500', label: '101kg to 500kg' },
				{ value: 'over500', label: 'Over 500kg' }
			]
		},
		{
			id: 'hp',
			title: 'Hp',
			options: [
				{ value: 'under50', label: 'Under 50hp' },
				{ value: '50to100', label: '50hp to 100hp' },
				{ value: '101to200', label: '101hp to 200hp' },
				{ value: 'over200', label: 'Over 200hp' }
			]
		},
		{
			id: 'type',
			title: 'Type',
			options: [
				{ value: 'bug', label: 'Bug' },
				{ value: 'dragon', label: 'Dragon' },
				{ value: 'electric', label: 'Electric' },
				{ value: 'fairy', label: 'Fairy' },
				{ value: 'fighting', label: 'Fighting' },
				{ value: 'fire', label: 'Fire' },
				{ value: 'flying', label: 'Flying' },
				{ value: 'ghost', label: 'Ghost' },
				{ value: 'grass', label: 'Grass' },
				{ value: 'ground', label: 'Ground' },
				{ value: 'ice', label: 'Ice' },
				{ value: 'normal', label: 'Normal' },
				{ value: 'poison', label: 'Poison' },
				{ value: 'psychic', label: 'Psychic' },
				{ value: 'rock', label: 'Rock' },
				{ value: 'steel', label: 'Steel' },
				{ value: 'water', label: 'Water' }
			]
		}
	];

	const isActiveFilter = (filterType: Filter) => !!searchParams.get(`${filterType}-filter`);

	const handleFilterChange = (input: HTMLInputElement) => {
		const filterType = filterTypes.find((type) => input.id.includes(type));

		if (!filterType) {
			return;
		}

		filters[filterType] = input.value;

		if (input.value === '') {
			searchParams.delete(`${filterType}-filter`);
			const searchParamsStr = searchParams.toString();

			if (!searchParamsStr) {
				goto('/pokemon');
				return;
			}

			goto(`/pokemon?${searchParamsStr}`);
			return;
		}

		searchParams.set(`${filterType}-filter`, input.value);
		goto(`/pokemon?${searchParams.toString()}`);
	};
</script>

<div class="filters">
	<span>Filter by</span>
	<div class="selector-group">
		{#each filterOptions as { id, title, options }}
			<form
				id={`${id}filter-form`}
				onchange={(event) => handleFilterChange(event.target as HTMLInputElement)}
			>
				<select id={`${id}-filter`} bind:value={filters[id]} class:selected={isActiveFilter(id)}>
					<option value="">{title}</option>
					{#each options as { value, label }}
						<option {value}>{label}</option>
					{/each}
				</select>
			</form>
		{/each}
	</div>
</div>

<style>
	.filters {
		margin-top: 0.375rem;
		display: flex;
		gap: 1rem;

		@media (max-width: 700px) {
			flex-direction: column;
		}
	}

	.selector-group {
		display: flex;
		flex-wrap: wrap;
		gap: 0.375rem;

		@media (max-width: 570px) {
		}
	}

	select {
		border-radius: 20px;
		padding: 0.125rem 0.5rem;
		text-align: center;
		background-color: var(--primary-color);
		cursor: pointer;
		font-size: 0.875rem;
	}

	select:focus {
		outline-style: none;
	}

	.selected {
		background-color: var(--accent-color);
		color: var(--text-color);
	}
</style>
