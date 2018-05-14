import React from 'react';
import axios from 'axios';

export default class InputForm extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const title = encodeURIComponent(this.props.output);
        const wiki = axios.get(`https://ja.wikipedia.org/w/api.php?format=json&action=query&prop=revisions&titles=${title}&rvprop=content`, {
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        }).then(response => {
            return { data: response }
        })
        return (this.props !== undefined) ? (
            <div>
                {/* {this.props.output} */}
                {this.props.data}
            </div>
        ) : "";
    }
}