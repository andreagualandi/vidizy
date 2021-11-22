<script>
	let text = "";
	import { app } from "./Client.js";

	async function handleClick() {
		const r = await app.getDownloadPath("pippo4");
		console.log("risultato", r);
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
