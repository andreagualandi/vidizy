<script>
    export let rangeValues;
    export let formatter;

    $: diff = formatter(rangeValues[1] - rangeValues[0]);
    $: start = formatter(rangeValues[0]);
    $: end = formatter(rangeValues[1]);
</script>

<div class="cutter">
    <div>
        <input />
    </div>
    <div class="time-details">
        <p>From: {start}</p>
        <p>To: {end}</p>
        <p>Duration: {diff}</p>
    </div>
</div>

<style>
    .cutter {
        display: flex;
        flex-direction: column;
    }
    .time-details {
        display: flex;
        justify-content: space-between;
        padding-top: 10px;
        padding-bottom: 10px;
    }
</style>
