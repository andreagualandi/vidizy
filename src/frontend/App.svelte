<script>
	import { fade } from "svelte/transition";
	import { app, ffmpeg, ydl } from "./Client";
	import InputSubmit from "./components/InputSubmit.svelte";
	import MyPlayer from "./components/MyPlayer.svelte";
	import Select from "./components/Select.svelte";
	import Cutter from "./components/Cutter.svelte";
	import { afterUpdate } from "svelte";

	let startTime = 0;
	let endTime = 100;
	let outFile = "";
	let selectedFormat = {};
	let info;
	let src;

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

	async function handleLoad(url) {
		/* const t = await ydl.getUrl(url, selectedFormat.id);
		console.log("download from", t);
		return; */
		console.log("get url", url);
		info = await ydl.getInfo(url);
		src = url;
		endTime = info.duration;
		outFile = await app.getDownloadPath(info.title);
	}

	async function handleOpenFolder() {
		const result = await app.showSaveDialog();
		if (!result.canceled) {
			outFile = result.filePath;
		}
	}

	async function handleExecute() {
		/* console.log({
			input: selectedFormat.url,
			output: "/home/andrea/Scaricati/test.mp4",
			start: timeFormatter(rangeValues[0]),
			end: timeFormatter(rangeValues[1]),
		});
		return; */
		const info = await ffmpeg.cut({
			input: selectedFormat.url,
			output: "/home/andrea/Scaricati/test.mp4",
			start: timeFormatter(rangeValues[0]),
			end: timeFormatter(rangeValues[1]),
		});
		console.log("downloading", info);
	}

	function timeFormatter(currTime) {
		return new Date(currTime * 1000).toISOString().substr(11, 12);
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
