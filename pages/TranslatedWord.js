import React from 'react';

export default class InputForm extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (this.props !== undefined) ? (
            <div>
                {this.props.output}
            </div>
        ) : "";
    }
}