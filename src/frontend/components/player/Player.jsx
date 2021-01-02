import React, { Component } from 'react';
import 'mediaelement';

// Import stylesheet and shims
import 'mediaelement/build/mediaelementplayer.min.css';

export default class Player extends Component {

    constructor(props) {
        super(props);
        this.state = {
            player: null
        };
    }

    componentDidMount() {
        const options = {
            // Read the Notes below for more explanation about how to set up the path for shims
            pluginPath: './static/media/',
            //forceLive: true, //If set to true, the Live Broadcast message will be displayed and progress bar will be hidden, no matter if duration is a valid number
            success: (media, node, instance) => this.success(media, node, instance),
            error: (media, node) => this.error(media, node)
        };

        this.setState({ player: new MediaElementPlayer(this.props.id, options) });
        this.props.getTime(this.getTime);

    }

    componentWillUnmount() {
        if (this.state.player) {
            this.state.player.remove();
            this.setState({ player: null });
        }
    }

    getTime = () => {
        const time = this.state.player.getCurrentTime();
        console.log('TIME->', time);
        return time;
    }

    success(media, node, instance) {
        // Your action when media was successfully loaded
    }

    error(media) {
        console.log('Player Error:', media)
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.player !== this.state.player) {
            return true;
        }
        if (nextProps.source !== this.props.source) {
            return true;
        }
        return false;
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('MediaElement.update');
        if (!this.state.player || !this.props.source) {
            console.log('empty player or source');
            return null;
        }
        console.log('provo ad avviare:', this.props.source);
        this.state.player.setSrc(this.props.source);
        this.state.player.load();
        //this.state.player.play();
    }
    //todo try load url with tag "source"
    render() {
        const { id, width, height } = this.props;
        return (
            <video id={id} controls width={width} height={height} ></video>
        );
    }
}

// Specifies the default values for props:
Player.defaultProps = {
    width: '640px',
    height: '480px',
    id: 'player1'
};