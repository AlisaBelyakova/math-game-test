import './style.css';

import React from 'react';
import ReactDOM from 'react-dom';
import history from './history';
import { Router } from 'react-router-dom';

import Main from './main';
import gameInstant from './game-rules';

ReactDOM.render(
    <Router history={history} >
        <Main gameInstant={gameInstant} />
    </Router>
    ,
    document.getElementById('app')
);