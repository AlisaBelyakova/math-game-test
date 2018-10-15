import React, { Component } from 'react';
import axios from 'axios';


class Home extends Component {

    constructor() {
        super();
        this.state = {
            count: 100
        }
    }

    componentDidMount() {
        axios.get('/count')
            .then(res => {
                return res.data
            })
            .then(data => {
                this.setState({ count: data.count })
            });
    }

    render() {
        let count = this.state.count;
        return (
            <div>
                <span>
                    <p id='count'> This browser made {this.state.count} requests</p>
                    <p> including requests for number of requests </p>
                </span>
            </div>
        )
    }
}

export default Home;