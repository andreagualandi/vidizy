import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Main from './home/Home';
import About from './about/About';
import Navbar from './navbar/Navbar';

// The Main component renders one of the provided Routes (provided that one matches).
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <section className="app-content">
                <Navbar />
                <Switch>
                    <Route exact path='/' component={Main} />
                    <Route path='/about' component={About} />
                </Switch>
            </section>
        );
    }
}
