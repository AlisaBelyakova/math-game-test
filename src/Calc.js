import React, { Component } from 'react';


class Calc extends Component {

    constructor() {
        super();
        this.state = {
            'result': ''
        }
        this.handleMath = this.handleMath.bind(this)
    }

    handleMath(e) {
        e.preventDefault();
        const validate = (n) => !isNaN(n);
        const mathAPI = {
            '+': (x, y) => { return x + y },
            '-': (x, y) => { return x - y },
            '*': (x, y) => { return x * y },
            '/': (x, y) => { return x / y }
        }

        const x = Number(e.target.first.value);
        const y = Number(e.target.second.value);
        const sign = e.target.sign.value;

        if (validate(x) && validate(y)) {
            let result = mathAPI[sign](x, y);
            this.setState({ result: 'result: ' + result });
        }
        else {
            this.setState({ result: 'please enter valid numbers' })
        }
        e.target.first.value = e.target.second.value = '';

    }

    render() {
        return (
            <div className='container'>
                <form onSubmit={this.handleMath}>
                    <input type='text' name='first' placeholder='#' />
                    <select name='sign'>
                        <option value='+'>+</option>
                        <option value='-'>-</option>
                        <option value='*'>*</option>
                        <option value='/'>/</option>
                    </select>
                    <input type='text' name='second' placeholder='#' />
                    <button type='submit' id='calc-btn'>calculate</button>
                </form>
                <div id='result'>{this.state.result}</div>
            </div>
        )
    }
}

export default Calc;