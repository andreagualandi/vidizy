<script>
    export let title = "Video";
    export let src;
    export let poster;
    // These values are bound to properties of the video
    let time = 0;
    let duration;
    let paused = true;

    // Used to track time of last mouse down event
    let lastMouseDown;

    function handleMove(e) {
        if (!duration) return; // video not loaded yet
        if (e.type !== "touchmove" && !(e.buttons & 1)) return; // mouse not down

        const clientX =
            e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
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

    function format(seconds) {
        if (isNaN(seconds)) return "...";
        return new Date(seconds * 1000).toISOString().slice(11, -5);
    }
</script>

<h1 class="video-title">{title}</h1>

<div class="player">
    <video
        {poster}
        {src}
        on:mousemove={handleMove}
        on:touchmove|preventDefault={handleMove}
        on:mousedown={handleMousedown}
        on:mouseup={handleMouseup}
        bind:currentTime={time}
        bind:duration
        bind:paused
    >
        <track kind="captions" />
    </video>

    <div class="controls">
        <progress value={time / duration || 0} />

        <div class="info">
            <span class="time">{format(time)} / {format(duration)}</span>
            <span>{paused ? "play" : "pause"}</span>
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
