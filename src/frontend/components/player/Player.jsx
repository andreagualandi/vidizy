import React, { useState, useEffect, useCallback } from 'react';
import 'mediaelement';

// Import stylesheet and shims
import 'mediaelement/build/mediaelementplayer.min.css';

export default function Player({ source, onTimeUpdate }) {
    const [player, setPlayer] = useState();

    useEffect(() => {
        console.log('init MediaElementPlayer');
        // code to run on component mount
        const options = {
            // Read the Notes below for more explanation about how to set up the path for shims
            pluginPath: './static/media/',
            //forceLive: true, //If set to true, the Live Broadcast message will be displayed and progress bar will be hidden, no matter if duration is a valid number
            success: (media, node, instance) => success(media, node, instance),
            //error: (media, node) => this.error(media, node)
        };

        const mediaElement = new MediaElementPlayer('player1', options);
        setPlayer(mediaElement);

        return () => {
            console.log('componentWillUnmount');
            player.remove();
            setPlayer(null);
        };
    }, [])

    useEffect(() => {
        console.log('imposto nuova url', source);
        if (!source || !player) {
            console.log('Source or player not ready', source, player);
            return;
        }

        player.setSrc(source);
        player.load();
    }, [source])

    const success = (media, node, instance) => {
        console.log('Successo loading src');
        media.addEventListener('timeupdate', () => {
            if (onTimeUpdate) {
                onTimeUpdate(media.getCurrentTime());
            }
        });
    };


    /* const unregisterEvents = () => {
        player.removeEventListener('timeupdate');
    }; */


    return (<video id="player1" controls width="640px" height="480px"></video>);

}