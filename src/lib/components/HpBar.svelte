<script lang="ts">
	const maxHp = 255;
	let { level, color } = $props();

	const width = Math.trunc((level * 100) / maxHp);

	const highHp = Number((maxHp / 2).toFixed(0));
	const mediumHp = Number((maxHp / 4).toFixed(0));

	const getHpColorClass = () => {
		if (level >= highHp) {
			return 'high';
		}

		if (level >= mediumHp) {
			return 'medium';
		}

		return 'low';
	};
</script>

<div class="health" style={`color: ${color};`}>
	<p>HP</p>
	<div class="box">
		<div class={`bar ${getHpColorClass()}`} style={`width: ${width}%`}></div>
	</div>
	<span><em>{level}</em> / {maxHp}</span>
</div>

<style>
	.health {
		font-weight: bold;
		font-family: monospace;
		margin-top: 1.75rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	p {
		font-size: 1.125rem;
		margin-right: 2%;
	}

	span {
		font-weight: normal;
		margin-left: 1%;
	}

	.box {
		width: 80%;
		height: 1rem;
		border-radius: 20px;
		border: 1px solid var(--primary-color);
	}

	.bar {
		height: 100%;
		border-radius: 20px;
		background-color: var(--terciary-color);
		color: var(--text-color);
		text-align: right;
	}

	.high {
		background-color: var(--terciary-color);
	}

	.medium {
		background-color: #ffdc5f;
	}

	.low {
		background-color: var(--secondary-color);
	}
</style>
