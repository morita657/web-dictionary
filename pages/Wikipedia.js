import React from 'react';

export default class Wikipedia extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                {this.props.output}
            </div>
        )
    }
}