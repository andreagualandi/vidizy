import React from 'react'
import Player from '../player/Player';
import SearchForm from '../search/SearchForm';
import Dropdown from '../dropdown/Dropdown';
import { app, ydl, ffmpeg } from '../../Client';

import './home.less';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            source: null,
            startTime: null,
            endTime: null,
            formats: [],
            selected: null,
            outFile: '',
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

    handleGetInfoClick = async () => {
        const info = await ydl.getInfo(this.state.source);
        console.log('info', info);
        this.setState({ formats: info.formats });
        const path = await app.getDownloadPath(info.title);
        this.setState({ outFile: path });
    };

    handleSelected = (selected) => {
        console.log('selezione', selected);
        this.setState({ selected: selected });
    };

    handleClickDownload = async (fileName) => {
        this.setState({ outFile: fileName });
        const downloadUrl = await ydl.getUrl(this.state.source, this.state.selected);
        console.log('DOWNLOAD URL', downloadUrl);
        const info = await ffmpeg.cut({ input: downloadUrl, output: fileName, start: this.state.startTime, end: this.state.endTime });
        console.log('start download', info);

    };


    render() {
        const defaultUrl = 'https://www.youtube.com/watch?v=_SvceAZ3EMY';
        return (
            <div className="home-content">
                <SearchForm onSubmitCallback={this.handleSubmit} data={defaultUrl} placeholder='Video url' />
                <Player source={this.state.source} onTimeUpdate={this.handleTimeUpdate} />
                <Dropdown data={this.state.formats} onSelect={this.handleSelected} placeholder='Seleziona' />
                <SearchForm onSubmitCallback={this.handleClickStart} data={this.state.startTime} placeholder='Start time - es: 00:00:00.000>' />
                <SearchForm onSubmitCallback={this.handleClickEnd} data={this.state.endTime} placeholder='End time - es: 00:00:00.000' />
                <SearchForm onSubmitCallback={this.handleClickDownload} data={this.state.outFile} placeholder='Output file' />
                <button onClick={this.handleGetInfoClick}>Get info</button>
            </div>
        );
    }
}
