<script>
    import Fa from "svelte-fa";
    import { faPlay, faPause, faStepBackward, faStepForward } from "@fortawesome/free-solid-svg-icons";

    export let title = "Video";
    export let src;
    export let poster;
    export let time = 0;
    // These values are bound to properties of the video
    let duration;
    let paused = true;
    let videoElement;
    let volume = 0.25;

    // Used to track time of last mouse down event
    let lastMouseDown;

    function handleMove(e) {
        if (!duration) return; // video not loaded yet
        if (e.type !== "touchmove" && !(e.buttons & 1)) return; // mouse not down

        const clientX = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
        const { left, right } = this.getBoundingClientRect();
        time = (duration * (clientX - left)) / (right - left);
    }

    // we can't rely on the built-in click event, because it fires
    // after a drag — we have to listen for clicks ourselves
    function handleMousedown(e) {
        lastMouseDown = new Date();
    }

    function handleMouseup(e) {
        if (new Date() - lastMouseDown < 300) {
            paused ? e.target.play() : e.target.pause();
        }
    }

    function handlePlayPause() {
        paused ? videoElement.play() : videoElement.pause();
    }

    function handleToStart() {
        time = 0;
    }

    function handleToEnd() {
        if (!duration) return;
        time = duration;
    }

    function format(seconds) {
        if (isNaN(seconds)) {
            seconds = 0;
        }
        return new Date(seconds * 1000).toISOString().slice(11, -5);
    }
</script>

<h1 class="video-title">{title}</h1>

<div class="player">
    <video
        {poster}
        {src}
        bind:this={videoElement}
        on:mousemove={handleMove}
        on:touchmove|preventDefault={handleMove}
        on:mousedown={handleMousedown}
        on:mouseup={handleMouseup}
        bind:currentTime={time}
        bind:duration
        bind:paused
        bind:volume
    >
        <track kind="captions" />
    </video>

    <div class="controls">
        <progress value={time / duration || 0} />

        <div class="info">
            <span class="time">{format(time)} / {format(duration)}</span>

            <div class="buttons">
                <span class="button" on:click|preventDefault={handleToStart}><Fa icon={faStepBackward} /></span>
                <span class="button" on:click|preventDefault={handlePlayPause}>
                    {#if paused}
                        <Fa icon={faPlay} />
                    {:else}
                        <Fa icon={faPause} />
                    {/if}
                </span>
                <span class="button" on:click|preventDefault={handleToEnd}><Fa icon={faStepForward} /></span>
            </div>

            <input type="range" min="0" max="1" step="0.01" bind:value={volume} />
        </div>
    </div>
</div>

<style>
    .player {
        display: flex;
        flex-direction: column;
    }

    .controls {
        background-color: #202020;
    }

    .info {
        padding: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .buttons {
        display: flex;
        justify-content: space-between;
        width: 150px;
    }

    .button {
        cursor: pointer;
    }

    span {
        color: white;
        text-shadow: 0 0 8px black;
        font-size: 1.4em;
        opacity: 0.7;
    }

    progress {
        display: block;
        width: 100%;
        height: 10px;
        appearance: none;
    }

    progress::-webkit-progress-bar {
        background-color: rgba(0, 0, 0, 0.2);
    }

    progress::-webkit-progress-value {
        background-color: rgba(255, 255, 255, 0.6);
    }

    video {
        width: 100%;
    }

    .video-title {
        padding: 5px;
        margin: 0px;
        background-color: #202020;
        text-align: center;
    }
</style>
