import React from 'react'
import Player from '../player/Player';
import SearchForm from '../search/SearchForm'
import { ydl } from '../../Client';

import './home.less';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            source: null,
            startTime: null,
            endTime: null,
        }
        this.currTime = null;
    }

    componentDidMount() {
        console.log('player.mount');

    }

    componentWillUnmount() {
        console.log('player.unmount');
    }

    /* shouldComponentUpdate(nextProps, nextState) {
        return nextState.currTime !== 
        if (nextState.source !== this.state.player) {
            return true;
        }
        if (nextProps.source !== this.props.source) {
            return true;
        }
        return false;
    } */

    componentDidUpdate(prevProps, prevState) {
        console.log('UPDATE');
    };

    handleSubmit = (text) => {
        this.setState({ source: text });
    };

    handleClickStart = () => {
        const time = new Date(this.currTime * 1000).toISOString().substr(11, 12);
        this.setState({ startTime: time });
    };

    handleClickEnd = () => {
        const time = new Date(this.currTime * 1000).toISOString().substr(11, 12);
        this.setState({ endTime: time });
    };

    handleTimeUpdate = (currentTime) => this.currTime = currentTime;

    handleStartClick = async () => {
        const info = await ydl.getInfo(this.state.source);
        console.log('info', info);
    };

    render() {
        const defaultUrl = 'https://www.youtube.com/watch?v=_SvceAZ3EMY';
        return (
            <div className="home-content">
                {/* <a href="#" onClick={this.props.history.goBack}>Back</a> */}
                <SearchForm onSubmitCallback={this.handleSubmit} data={defaultUrl} placeholder='Video url' />
                <Player source={this.state.source} onTimeUpdate={this.handleTimeUpdate} />
                <SearchForm onSubmitCallback={this.handleClickStart} data={this.state.startTime} placeholder='Start time - es: 00:00:00.000>' />
                <SearchForm onSubmitCallback={this.handleClickEnd} data={this.state.endTime} placeholder='End time - es: 00:00:00.000' />
                <button onClick={this.handleStartClick}>Start</button>
            </div>
        );
    }
}
