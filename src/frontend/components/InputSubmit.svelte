<script>
    export let onSubmit;
    export let placeholder = "";
    let text = "https://www.youtube.com/watch?v=xr1FWNKWQIU";
</script>

<form class="input-form" on:submit|preventDefault={onSubmit(text)}>
    <input bind:value={text} {placeholder} />
    <button type="submit">Load</button>
</form>

<style>
    .input-form {
        display: inline-flex;
        justify-content: center;
        width: 100vh;
        font-size: 1.2em;
    }

    .input-form input {
        width: 100%;
        height: 2em;
        font-size: inherit;
        border-radius: 2px 0px 0px 2px;
        border: none;
    }

    .input-form input:focus-visible {
        outline: none;
    }

    .input-form button {
        font-size: inherit;
        border-radius: 0px 2px 2px 0px;
        border: none;
    }
</style>
