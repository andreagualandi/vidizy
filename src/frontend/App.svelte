<script>
	let text = "";
	import { app } from "./Client.js";

	async function handleClick() {
		console.log("ciao");
		const r = await app.getDownloadPath("pippo");
		console.log("asd", r);
	}
</script>

<main>
	<h1>test {text}</h1>
	<button on:click={handleClick}> click </button>
</main>

<style>
	main {
		display: flex;
		flex-flow: column;
		justify-content: center;
		align-items: center;
	}
	button {
		font-size: 2em;
	}
</style>
