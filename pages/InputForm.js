import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
        return (
            <div>
                <TextField
                    label=""
                    className={this.props.textField}
                    margin="normal"
                    onChange={(e) => this.getWord(e)}
                />
                <Button type="submit" onClick={() => this.props.translateWord(this.state.word)} className="this.props.button" variant="raised" color="primary">Submit</Button>
            </div>
        )
    }
}