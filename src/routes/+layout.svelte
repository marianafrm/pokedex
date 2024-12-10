<script lang="ts">
	import ScrollText from 'lucide-svelte/icons/scroll-text';
	import BookHeart from 'lucide-svelte/icons/book-heart';
	let { children } = $props();
</script>

<header>
	<a id="logomark" href="/pokemon">
		<img src="/pokemon.png" alt="pokeball" class="logo" />
		<h2>Pokédex</h2>
	</a>
	<nav>
		<a class="navlink" href="/pokemon"><ScrollText size={18} /> All Pokémons</a>
		<a class="navlink" href="/favorites"><BookHeart size={18} />Your Favorites</a>
	</nav>
</header>

{@render children()}

<style>
	header {
		width: var(--app-width);
		display: flex;
		justify-content: space-between;
		align-items: center;

		@media (max-width: 550px) {
			align-items: flex-end;
		}

		@media (max-width: 450px) {
			flex-direction: column;
			align-items: flex-start;
		}
	}

	a {
		text-decoration: none;
		color: var(--text-color);
	}

	#logomark {
		font-size: 1.25rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.logo {
		width: 2rem;
	}

	nav {
		width: var(--app-width);
		display: flex;
		justify-content: flex-end;
		align-items: center;
		gap: 1rem;

		@media (max-width: 550px) {
			flex-direction: column;
			align-items: flex-end;
			gap: 0.75rem;
		}

		@media (max-width: 450px) {
			flex-direction: row;
		}
	}

	.navlink {
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}

	.navlink:hover {
		color: var(--accent-color);
	}

	@media (max-width: 450px) {
		p {
			display: none;
		}
	}
</style>
