<script>
    export let onSubmit;
    export let placeholder = "";
    export let layout = "right";
    let text = "https://www.youtube.com/watch?v=xr1FWNKWQIU";
</script>

<form
    class="input-url {layout === 'left' ? 'button-left' : ''}"
    on:submit|preventDefault={onSubmit(text)}
>
    <input bind:value={text} {placeholder} />
    <button type="submit">Load</button>
</form>

<style>
    .input-url {
        display: inline-flex;
        justify-content: center;
        padding: 20px;
        width: 100vh;
    }

    .input-url input {
        width: 100%;
        height: 2em;
    }

    .button-left {
        flex-direction: row-reverse;
    }
</style>
