<script lang="ts">
	import Share2 from 'lucide-svelte/icons/share-2';

	let { shareTarget }: { shareTarget: ShareData } = $props();

	let error = $state({
		message: ''
	});
	let timeoutId: NodeJS.Timeout | undefined = $state();

	let blockClick = false;

	const handleClick = async () => {
		if (blockClick) {
			return;
		}

		if (!!timeoutId) {
			clearTimeout(timeoutId);
			timeoutId = undefined;
		}

		if (!navigator.canShare) {
			throw new Error('Your browser does not support this feature');
		}

		try {
			blockClick = true;
			await navigator.share(shareTarget);
			blockClick = false;
		} catch (err) {
			blockClick = false;

			if (!(err instanceof Error)) {
				error.message = 'Unknown error while sharing';
			} else {
				if (err.message === 'Share canceled') {
					return;
				}

				error.message = err.message;
			}

			timeoutId = setTimeout(() => {
				error.message = '';
			}, 3000);
		}
	};
</script>

<button onclick={handleClick}>
	<Share2 />
</button>
{#if error.message !== ''}
	<p class="error">{error.message}</p>
{/if}

<style>
	button {
		width: 20%;
		background-color: transparent;
		border: none;
		color: var(--primary-color);
		cursor: pointer;
	}

	button:hover {
		color: var(--accent-color);
	}

	button:active {
		transform: translateY(3px);
	}

	.error {
		background-color: color-mix(in srgb, var(--secondary-color) 20%, var(--text-color));
		color: var(--secondary-color);
		position: fixed;
		bottom: 0;
		right: 1rem;
		padding: 0.3rem 0.6rem;
		border-radius: 20px;
	}
</style>
