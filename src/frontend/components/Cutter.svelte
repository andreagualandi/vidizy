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
    let startT = LocalTime.ofSecondOfDay(rangeValues[0]).format(df);
    let endT = LocalTime.ofSecondOfDay(rangeValues[1]).format(df);

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

    function setTime2(seconds, variable) {
        seconds = Math.floor(seconds);
        variable = LocalTime.ofSecondOfDay(seconds).format(df);
    }

    function setTime(seconds, variable) {
        seconds = Math.floor(seconds);
        let data = LocalTime.ofSecondOfDay(seconds).format(df);
        if (variable === "start") {
            startT = data;
        } else {
            endT = data;
        }
    }

    $: diff = LocalTime.ofSecondOfDay(rangeValues[1] - rangeValues[0]).format(df);

    $: isValidStart = formatter(startT, 0);
    $: isValidEnd = formatter(endT, 1);
</script>

<div class="cutter">
    <div class="inputs">
        <div class="line-layout">
            <button class="button-set" on:click={setTime(currTime, startT)}>Start</button>
            <input class:not-valid={!isValidStart} bind:value={startT} />
            <button class="button-get" on:click={onClick(rangeValues[0])}>^</button>
        </div>
        <div class="line-layout">
            <button class="button-set" on:click={setTime(currTime, "end")}>End</button>
            <input class:not-valid={!isValidEnd} bind:value={endT} />
            <button class="button-get" on:click={onClick(rangeValues[1])}>^</button>
        </div>
    </div>
    <p>Duration: {diff}</p>
</div>

<style>
    .cutter {
        display: flex;
        padding: 10px;
        flex-direction: column;
        width: 570px;
    }
    .inputs {
        display: flex;
        font-size: inherit;
        justify-content: space-between;
    }
    p {
        margin: 5px 0px 0px 0px;
        text-align: center;
        width: 100%;
        background-color: #292a34;
    }
    .not-valid {
        border-style: solid;
        border-color: red;
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
