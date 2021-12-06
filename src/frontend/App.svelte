<script>
	import { fade } from "svelte/transition";
	import { app, ffmpeg, ydl } from "./Client";
	import InputSubmit from "./components/InputSubmit.svelte";
	import MyPlayer from "./components/MyPlayer.svelte";
	import Select from "./components/Select.svelte";
	import Cutter from "./components/Cutter.svelte";
	import { afterUpdate, onMount } from "svelte";

	let outFile = "";
	let selectedFormat = {};
	let info;
	let outText = "";

	/*-- debug --*/
	info = {
		url: "fakeurl",
		formats: [
			{ id: 1, url: "fake", ext: "mp4", description: "fake descr" },
		],
		duration: 3476,
		thumbnail: "",
	};

	let rangeValues = [0, info.duration];

	onMount(async () => {
		ffmpeg.setProgressCallback(progress);
	});

	async function handleLoad(url) {
		console.log("get url", url);
		info = await ydl.getInfo(url);
		outFile = await app.getDownloadPath(info.title);
	}

	async function killProcess() {
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

		const result = await ffmpeg.cut(params);
		console.log("ffmpeg cut", result);
	}

	function timeFormatter(currTime) {
		return new Date(currTime * 1000).toISOString().substr(11, 12);
	}

	function progress(data) {
		console.log("progress", data);
		outText += JSON.stringify(data) + "\n";
	}

	afterUpdate(() => {
		//console.log(rangeValues);
	});
</script>

<main>
	<InputSubmit onSubmit={handleLoad} placeholder="Video url" />
	{#if info}
		<div class="flex-column" transition:fade>
			<div class="flex-column">
				<MyPlayer
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
			<button on:click={killProcess}> stop </button>
			<textarea value={outText} />
		</div>
	{:else}
		<p>placeholder</p>
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
</style>
