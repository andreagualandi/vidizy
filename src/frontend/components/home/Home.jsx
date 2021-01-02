import React from 'react'
import Player from '../player/Player';
import SearchForm from '../search/SearchForm'

import './home.less';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            source: 'https://www.youtube.com/watch?v=efCUMvwo6Tk'
        }
    }

    componentDidMount() {
        console.log('player.mount');

    }

    componentWillUnmount() {
        console.log('player.unmount');
    }

    handleSubmit = (text) => {
        console.log(text);
        this.setState({ source: text });
    };

    handleClick = (e) => {
        //console.log(e);
    };




    renderError() {
        return <span>ERROR</span>;
    }

    renderPlayer() {
        return this.state.source ? <Player source={this.state.source} getTime={this.handleClick} /> : <div>Loading</div>;
    }

    render() {
        const view = this.state.source !== 'error' ? this.renderPlayer() : this.renderError();
        return (
            <div className="home-content">
                {/* <a href="#" onClick={this.props.history.goBack}>Back</a> */}
                <SearchForm onSubmitCallback={this.handleSubmit} />
                <button onClick={this.handleClick}>asd</button>
                {view}
            </div>
        );
    }
}
