<script>
    import RangeSlider from "svelte-range-slider-pips";

    export let rangeValues;
    export let formatter;

    let start;
    let end;
    let max = rangeValues[1];

    $: diff = formatter(rangeValues[1] - rangeValues[0]);
    $: start = formatter(rangeValues[0]);
    $: end = formatter(rangeValues[1]);
</script>

<div class="cutter">
    <RangeSlider
        range
        bind:values={rangeValues}
        {max}
        {formatter}
        first="label"
        last="label"
        float
    />

    <div class="time-details">
        <p>From: {start}</p>
        <p>To: {end}</p>
        <p>Duration: {diff}</p>
    </div>
</div>

<style>
    :root {
        --range-handle-inactive: #444f97;
        --range-handle: #444f97;
    }
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
