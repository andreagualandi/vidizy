<script>
	import InputSubmit from "./components/InputSubmit.svelte";
	import Player from "./components/Player.svelte";

	let src = "";
	let time = 0;
	function handleSubmit(url) {
		console.log("get url", url);
		src = url;
	}

	function handleTime(currTime) {
		time = new Date(currTime * 1000).toISOString().substr(11, 12);
	}
</script>

<main>
	<InputSubmit onSubmit={handleSubmit} placeholder="Video url" />
	<Player {src} onTime={handleTime} />

	<input value={time} />

	<p>test: https://www.youtube.com/watch?v=xr1FWNKWQIU</p>
</main>

<style>
	main {
		display: flex;
		flex-flow: column;
		justify-content: center;
		align-items: center;
	}
</style>
