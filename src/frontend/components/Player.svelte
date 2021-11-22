<script>
    export let src = "";
    export let onTime;

    import { afterUpdate, onMount, onDestroy } from "svelte";
    import "mediaelement";
    import "mediaelement/build/mediaelementplayer.min.css";

    const options = {
        success: (media, node, instance) => {
            console.log("mediaelement.success", media);
            media.addEventListener("timeupdate", () => {
                console.log("timeupdate");
                onTime(media.getCurrentTime());
            });
        },
        error: (media, node) => {
            console.log("errorino", media);
        },
    };

    let mediaElement;

    onMount(async () => {
        mediaElement = new MediaElementPlayer("player1", options);
    });

    onDestroy(() => {
        mediaElement.remove();
    });

    afterUpdate(() => {
        console.log("ecco update", src);
        if (src.length > 0) {
            console.log("carico src", src);
            mediaElement.setSrc(src);
            mediaElement.load();
        }
    });
</script>

<video id="player1" width="640px" height="480px">
    <!-- <track kind="captions" /> -->
</video>
