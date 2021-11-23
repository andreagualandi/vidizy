<script>
	import { app, ydl } from "./Client";
	import InputSubmit from "./components/InputSubmit.svelte";
	import MyPlayer from "./components/MyPlayer.svelte";
	import Select from "./components/Select.svelte";
	import RangeSlider from "svelte-range-slider-pips";

	let src = "";
	let startTime = 0;
	let endTime = 100;
	let duration = 0;
	let formats = [];
	let title = "";
	let outFile = "";
	let videoSrc = "";
	let selectedFormat = {};
	async function handleLoad(url) {
		console.log("get url", url);
		src = url;
		const info = await ydl.getInfo(url);
		title = info.title;
		formats = info.formats;
		endTime = info.duration;
		videoSrc = info.url;
		outFile = await app.getDownloadPath(info.title);
		console.log(formats);
	}

	function timeFormatter(currTime) {
		return new Date(currTime * 1000).toISOString().substr(11, 12);
	}
</script>

<main>
	<InputSubmit onSubmit={handleLoad} placeholder="Video url" />
	<div class="player">
		<MyPlayer {title} src={videoSrc} />
		<RangeSlider
			range
			values={[startTime, endTime]}
			min={startTime}
			max={endTime}
			formatter={timeFormatter}
			first="label"
			last="label"
			float
			pips
			all
			rest={false}
		/>
		<Select options={formats} bind:selected={selectedFormat} />
	</div>

	<p>test: https://www.youtube.com/watch?v=xr1FWNKWQIU - {duration}</p>
	<button on:click={() => console.log("execute", selectedFormat)}>
		execute</button
	>
</main>

<style>
	main {
		display: flex;
		flex-flow: column;
		justify-content: center;
		align-items: center;
	}

	.player {
		/* display: flex;
		flex-flow: column;
		width: 100vh; */
	}
</style>
