import React, { Component } from 'react';

class Game extends Component {
    constructor(props) {
        super();
    }

    componentDidMount() {
        this.props.gameInstant.createAndShowBoard();
    }

    render() {
        return (
            <div>
                <h2>Game of Life</h2>
                <table id='board'></table>

                <div id='control_panel'>
                    <button id='step_btn' className='btn'>Step</button>
                    <button id='play_btn' className='btn'>Play</button>
                    <button id='reset_btn' className='btn'>Reset Random</button>
                    <button id='clear_btn' className='btn'>Clear</button>
                </div>

                <br /> <br />

                <footer className="footer">
                    <div className="container">
                        <p className="text-muted">Read rules @
                            <a href="https://en.wikipedia.org/wiki/Conway's_Game_of_Life" target='blank'>
                                Wikipedia Game of Life</a>
                        </p>
                    </div>
                </footer>
            </div>

        )
    }
}

export default Game;