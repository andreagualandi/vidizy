<script>
    export let handleStop;
    export let value = 0;
    export let text = "starting...";
</script>

<div class="overlay">
    <div class="modal">
        <div class="status">
            <div class="state">Time remaining: {text}</div>
            <div class="percentage">{value}%</div>
        </div>
        <progress {value} max="100" />
        <button on:click={handleStop}>Stop</button>
    </div>
</div>

<style>
    .overlay {
        position: fixed; /* Sit on top of the page content */
        width: 100%; /* Full width (cover the whole page) */
        height: 100%; /* Full height (cover the whole page) */
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 2; /* Specify a stack order in case you're using a different order for other elements */
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .modal {
        min-width: 300px;
        min-height: 110px;
        padding: 20px;
        align-items: center;
        justify-content: center;
        display: flex;
        flex-direction: column;
        background-color: #202020;
    }
    progress {
        padding: 15px;
        width: 100%;
    }
    .status {
        display: flex;
        justify-content: space-between;
        width: 100%;
    }
</style>
