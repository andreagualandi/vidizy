import React, { useState, useEffect } from 'react';
import 'mediaelement';

// Import stylesheet and shims
import 'mediaelement/build/mediaelementplayer.min.css';

export default function Player({ source }) {
    const [url, setUrl] = useState();
    const [player, setPlayer] = useState();

    //const onChange = useCallback((e) => setSearchText(e.target.value), [setSearchText]);

    useEffect(() => {
        // code to run on component mount
        const options = {
            // Read the Notes below for more explanation about how to set up the path for shims
            pluginPath: './static/media/',
            //forceLive: true, //If set to true, the Live Broadcast message will be displayed and progress bar will be hidden, no matter if duration is a valid number
            //success: (media, node, instance) => this.success(media, node, instance),
            //error: (media, node) => this.error(media, node)
        };

        const mediaElement = new MediaElementPlayer("player1", options);
        setPlayer(mediaElement);

        return () => {
            console.log('componentWillUnmount');
            player.remove();
            setPlayer(null);
        };
    }, [])

    //https://www.youtube.com/watch?v=_SvceAZ3EMY
    useEffect(() => {
        if (!player) {
            console.log('Player non inizializzato');
            return;
        }
        console.log('imposto nuova url', source);
        setUrl(source);
        player.setSrc(source);
        player.load();
    }, [source])

    return (
        <video id="player1" controls width="640px" height="480px"></video>
    );

}