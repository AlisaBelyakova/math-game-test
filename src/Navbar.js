import React, { Component } from 'react';
import { Router, Link } from 'react-router-dom';

class Navbar extends Component {

    constructor(props) {
        super();
        let loc = window.location.href;
        loc = loc.slice(loc.lastIndexOf('/') + 1);
        this.state = {
            active: loc.length ? loc : 'home'
        }
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {
        if (this.state.active.length) {
            document.getElementById(this.state.active).classList.add('selected');
        }
    }

    handleClick(e) {
        [...document.getElementsByClassName('selected')][0].classList.remove('selected');
        e.target.classList.add('selected');
        this.setState({ active: e.target.id });
    }

    render() {
        console.log(this.loc)
        return (
            <div className='container' onClick={this.handleClick}>
                <Link to="/" className='nav-link' id='home'>Home</Link>
                <Link to="/math" className='nav-link' id='math'>Math</Link>
                <Link to="/game" className='nav-link' id='game'>Game</Link>
            </div>
        )
    }
}

export default Navbar;