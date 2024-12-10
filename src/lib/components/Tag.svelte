<script lang="ts">
	let { text, color } = $props();
</script>

<span style={`background-color: ${color}`}>{text}</span>

<style>
	span {
		font-family: monospace;
		font-size: small;
		text-transform: uppercase;
		font-weight: normal;
		padding: 0.2rem 0.5rem;
		margin-left: 0.25rem;
		border-radius: 20px;
	}
</style>
