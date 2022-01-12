<script>
    export let options = [];
    export let selected;
</script>

<select bind:value={selected}>
    {#each options as option}
        <option value={option}>{option.description}</option>
    {/each}
</select>

<style>
    select {
        width: 100%;
        height: 100%;
        padding: 5px;
    }
</style>
