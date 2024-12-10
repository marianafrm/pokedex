<script lang="ts">
	import { goto } from '$app/navigation';

	let { searchParams, sorts } = $props();

	const sortTypes = ['name', 'height', 'weight', 'hp'] as const;
	type Sort = (typeof sortTypes)[number];

	const sortValues = [
		{ value: 'asc', label: 'asc' },
		{ value: 'desc', label: 'desc' }
	];

	const sortOptions: { id: Sort; title: string; options: { value: string; label: string }[] }[] = [
		{ id: 'name', title: 'Name', options: sortValues },
		{ id: 'height', title: 'Height', options: sortValues },
		{ id: 'weight', title: 'Weight', options: sortValues },
		{ id: 'hp', title: 'Hp', options: sortValues }
	];

	const isActiveSort = (sortType: Sort) => !!searchParams.get(`${sortType}-sorter`);

	const handleSortChange = (input: HTMLInputElement) => {
		const sorterType = sortTypes.find((type) => input.id.includes(type));

		if (!sorterType) {
			return;
		}

		sorts[sorterType] = input.value;

		if (input.value === '') {
			searchParams.delete(`${sorterType}-sorter`);
			const searchParamsStr = searchParams.toString();

			if (!searchParamsStr) {
				goto('/pokemon');
				return;
			}

			goto(`/pokemon?${searchParamsStr}`);
			return;
		}

		searchParams.set(`${sorterType}-sorter`, input.value);
		goto(`/pokemon?${searchParams.toString()}`);
	};
</script>

<div class="sorters">
	<span>Sort by</span>
	<div class="selector-group">
		{#each sortOptions as { id, title, options }}
			<form
				id={`${id}-sorter-fom`}
				onchange={(event) => handleSortChange(event.target as HTMLInputElement)}
			>
				<select id={`${id}-sorter`} bind:value={sorts[id]} class:selected={isActiveSort(id)}>
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
	.sorters {
		margin-top: 1.25rem;
		display: flex;
		gap: 1rem;

		@media (max-width: 550px) {
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
