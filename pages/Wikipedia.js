import React from 'react';

export default class Wikipedia extends React.Component {
    constructor(props) {
        super(props);
    }
    get createMarkup() {
        return { __html: this.props.output };
    }
    render() {
        return <div dangerouslySetInnerHTML={this.createMarkup} />;
    }
}
