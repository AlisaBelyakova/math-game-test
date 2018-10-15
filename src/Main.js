import React from 'react';
import { Route, Switch } from 'react-router-dom';


import Navbar from './navbar';
import Home from './home';
import Calc from './calc';
import Game from './game';

function Main(props) {
    return (
        <div>
            <Navbar />
            <Switch>
                <Route path="/math" component={Calc} />
                <Route path="/game" component={() => <Game gameInstant={props.gameInstant} />} />
                <Route path="/" component={Home} />
            </Switch>
        </div>
    )
}

export default Main;