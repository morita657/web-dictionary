import React from 'react';

export default class InputForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            word: ""
        }
        this.getWord = this.getWord.bind(this)
    }
    getWord(e) {
        const newState = this.setState({ word: e.target.value })
        return newState;
    }
    render() {
        console.log(this.props, this.state.word);
        return (
            <div>
                <input type="text" onChange={(e) => this.getWord(e)} placeholder="Input Japanese word..." />
                <input type="submit" onClick={() => this.props.translateWord(this.state.word)} />
            </div>
        )
    }
}