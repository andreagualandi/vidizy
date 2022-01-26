<script>
    import { LocalTime, DateTimeFormatter, ChronoField } from "@js-joda/core";

    export let currTime;
    export let rangeValues;
    export let onClick;

    let obj = {
        start: 0,
        end: 0,
    };

    const df = DateTimeFormatter.ofPattern("HH:mm:ss");
    setTime(rangeValues[0], "start");
    setTime(rangeValues[1], "end");

    function setTime(seconds, variable) {
        seconds = Math.floor(seconds);
        obj[variable] = LocalTime.ofSecondOfDay(seconds).format(df);
    }

    function formatter(data, num) {
        try {
            console.log("formatto", data);
            let sec = LocalTime.parse(data, df).get(ChronoField.SECOND_OF_DAY);
            rangeValues[num] = sec;
            return true;
        } catch (e) {
            return false;
        }
    }

    function calcDiff() {
        const diff = Math.abs(rangeValues[1] - rangeValues[0]);
        return LocalTime.ofSecondOfDay(diff).format(df);
    }

    $: diff = calcDiff();

    $: isValidStart = formatter(obj.start, 0);
    $: isValidEnd = formatter(obj.end, 1);
</script>

<div class="cutter">
    <div class="inputs">
        <div class="line-layout">
            <button class="button-set" on:click={setTime(currTime, "start")}>Start</button>
            <input class:not-valid={!isValidStart} bind:value={obj.start} />
            <button class="button-get" on:click={onClick(rangeValues[0])}>^</button>
        </div>
        <p>{diff}</p>
        <div class="line-layout">
            <button class="button-set" on:click={setTime(currTime, "end")}>End</button>
            <input class:not-valid={!isValidEnd} bind:value={obj.end} />
            <button class="button-get" on:click={onClick(rangeValues[1])}>^</button>
        </div>
    </div>
</div>

<style>
    .cutter {
        display: flex;
        flex-direction: column;
        width: 570px;
    }
    .inputs {
        display: flex;
        font-size: 1.1em;
        justify-content: space-between;
    }
    p {
        margin: 0;
    }
    .not-valid {
        background-color: #a93c3c;
    }
    .line-layout {
        display: flex;
    }

    input {
        font-size: inherit;
        border: none;
        border-radius: 0;
        width: 100px;
    }

    input:focus-visible {
        outline: none;
    }
    button {
        font-size: inherit;
        border: none;
    }
    .button-set {
        border-radius: 2px 0px 0px 2px;
    }
    .button-get {
        border-radius: 0px 2px 2px 0px;
    }
</style>
