import React from 'react';
import axios from 'axios';
import Wikipedia from "./Wikipedia";

export default class InputForm extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (this.props !== undefined) ? (
            <div>
                <p>{this.props.word}</p>
                <Wikipedia output={this.props.output} />
            </div>
        ) : "";
    }

}