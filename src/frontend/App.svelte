<script>
	import { fade } from "svelte/transition";

	import { app, ffmpeg, ydl } from "./Client";
	import InputSubmit from "./components/InputSubmit.svelte";
	import MyPlayer from "./components/MyPlayer.svelte";
	import Select from "./components/Select.svelte";
	import Cutter from "./components/Cutter.svelte";
	import Progress from "./components/Progress.svelte";
	import { afterUpdate, onMount } from "svelte";

	let outFile = "";
	let selectedFormat = {};
	let info;
	let working = false;
	let progressValue = 0;
	let progressText = "starting";
	let rangeValues = [0, 1];

	/*-- debug --*/
	let time = 0;
	let sliderElement;

	onMount(async () => {
		ffmpeg.setProgressCallback(handleProgress);
	});

	async function handleLoad(url) {
		/* working = true;

		// Returns a Promise that resolves after "ms" Milliseconds
		const timer = (ms) => new Promise((res) => setTimeout(res, ms));

		async function load() {
			// We need to wrap the loop into an async function for this to work
			for (var i = 1; i < 11; i++) {
				progressValue = i * 10;
				progressText = "running...";
				await timer(300); // then the created Promise can be awaited
			}
		}

		load();
		return; */
		const test = "local-video:///home/andrea/Scaricati/test.mp4";
		console.log("test", test);
		info = {
			url: test,
			formats: [
				{
					id: 1,
					url: "fake",
					ext: "mp4",
					description: "fake descr",
				},
			],
			duration: 3476,
			thumbnail: "",
		};
		rangeValues = [0, info.duration];

		console.log("get url", url);
		//info = await ydl.getInfo(url);
		outFile = await app.getDownloadPath(info.title);
		rangeValues = [0, info.duration];
	}

	async function killProcess() {
		working = false;
		await ffmpeg.stop();
	}

	async function handleOpenFolder() {
		const result = await app.showSaveDialog();
		if (!result.canceled) {
			outFile = result.filePath;
		}
	}

	async function handleExecute() {
		const params = {
			input: selectedFormat.url,
			output: "/home/andrea/Scaricati/test.mp4",
			overwrite: true,
		};

		if (rangeValues[0] !== 0) {
			params.start = timeFormatter(rangeValues[0]);
		}

		if (rangeValues[1] !== info.duration) {
			params.duration = timeFormatter(rangeValues[1] - rangeValues[0]);
		}
		console.log("cut params", params);
		working = true;
		const result = await ffmpeg.cut(params);
		console.log("ffmpeg cut", result);
		working = false;
	}

	function timeFormatter(currTime) {
		console.log("FORMATTAZIONE", currTime);
		return new Date(currTime * 1000).toISOString().slice(11, -5);
	}

	function handleProgress(data) {
		progressValue = data.progress;
		progressText = data.status;
	}

	afterUpdate(() => {
		//console.log(rangeValues);
	});
</script>

<main>
	<InputSubmit onSubmit={handleLoad} placeholder="Video url" />
	{#if info}
		<div class="flex-column color" transition:fade>
			<div class="flex-column">
				<MyPlayer
					{time}
					title={info.title}
					src={info.url}
					poster={info.thumbnail}
				/>
				<Cutter bind:rangeValues formatter={timeFormatter} />
			</div>

			<Select options={info.formats} bind:selected={selectedFormat} />

			<InputSubmit
				onSubmit={handleOpenFolder}
				bind:text={outFile}
				placeholder="Output"
			/>

			<button on:click={handleExecute}> execute </button>
		</div>
	{:else}
		<p>placeholder</p>
	{/if}
	{#if working}
		<Progress
			handleStop={killProcess}
			value={progressValue}
			text={progressText}
		/>
	{/if}
</main>

<style>
	main {
		display: flex;
		flex-flow: column;
		justify-content: center;
		align-items: center;
		padding: 20px;
	}

	.flex-column {
		display: flex;
		flex-flow: column;
		width: 100vh;
	}

	.color {
		background-color: #292a34;
	}
</style>
