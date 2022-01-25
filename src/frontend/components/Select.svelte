<script>
    export let options = [];
    export let selected;
</script>

<select bind:value={selected}>
    <option value="" disabled selected>Select a format</option>
    {#each options as option}
        <option value={option}>{option.description}</option>
    {/each}
</select>

<style>
    select {
        width: 100%;
        height: 100%;
        padding: 5px;
        font-size: inherit;
    }
</style>
