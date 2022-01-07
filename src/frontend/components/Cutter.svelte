<script>
    import { LocalTime, DateTimeFormatter, ChronoField } from "@js-joda/core";

    export let rangeValues;

    const df = DateTimeFormatter.ofPattern("HH:mm:ss");
    let startT = LocalTime.ofSecondOfDay(rangeValues[0]).format(df);
    let endT = LocalTime.ofSecondOfDay(rangeValues[1]).format(df); //seconds to HH:mm:ss */
    let isValid = true;

    function formatter(data, num) {
        try {
            let sec = LocalTime.parse(data, df).get(ChronoField.SECOND_OF_DAY);
            rangeValues[num] = sec;
            isValid = true;
        } catch (e) {
            isValid = false;
        }
    }

    $: diff = LocalTime.ofSecondOfDay(rangeValues[1] - rangeValues[0]).format(
        df
    );

    $: formatter(startT, 0);
    $: formatter(endT, 1);
</script>

<div class="cutter">
    <div>
        <input class:not-valid={!isValid} bind:value={startT} />
        <input class:not-valid={!isValid} bind:value={endT} />
    </div>
    <div class="time-details">
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
    .not-valid {
        background-color: red;
    }
</style>
