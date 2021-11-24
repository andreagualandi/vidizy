<script>
	import { fade } from "svelte/transition";
	import { app, ydl } from "./Client";
	import InputSubmit from "./components/InputSubmit.svelte";
	import MyPlayer from "./components/MyPlayer.svelte";
	import Select from "./components/Select.svelte";
	import RangeSlider from "svelte-range-slider-pips";

	let startTime = 0;
	let endTime = 100;
	let outFile = "";
	let selectedFormat = {};
	let info;
	async function handleLoad(url) {
		console.log("get url", url);
		info = await ydl.getInfo(url);
		endTime = info.duration;
		outFile = await app.getDownloadPath(info.title);
	}

	async function handleOpenFolder() {
		const result = await app.showSaveDialog();
		if (!result.canceled) {
			outFile = result.filePath;
		}
	}

	function timeFormatter(currTime) {
		return new Date(currTime * 1000).toISOString().substr(11, 12);
	}
</script>

<main>
	<InputSubmit onSubmit={handleLoad} placeholder="Video url" />
	{#if info}
		<div class="player" transition:fade>
			<MyPlayer
				title={info.title}
				src={info.url}
				poster={info.thumbnail}
			/>
			<RangeSlider
				class="rangeSlider rangeFloat"
				range
				values={[startTime, endTime]}
				min={startTime}
				max={endTime}
				formatter={timeFormatter}
				first="label"
				last="label"
				float
			/>
			<Select options={info.formats} bind:selected={selectedFormat} />
		</div>
	{:else}
		<p>placeholder</p>
	{/if}

	<InputSubmit
		onSubmit={handleOpenFolder}
		text={outFile}
		placeholder="Output"
	/>

	<button on:click={() => console.log("execute", selectedFormat)}>
		execute
	</button>
</main>

<style>
	main {
		display: flex;
		flex-flow: column;
		justify-content: center;
		align-items: center;
		padding: 20px;
	}

	.player {
		/* display: flex;
		flex-flow: column;
		width: 100vh; */
	}

	* :global(.rangeSlider .rangeFloat) {
		opacity: 1;
		color: red;
		background: transparent;
		top: 3.5em;
	}
	* :global(.rangeSlider .rangeHandle.active .rangeFloat) {
		top: 3.5em;
	}
</style>
