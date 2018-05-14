import React from 'react'
import Head from 'next/head'
import axios from 'axios';
import InputForm from './InputForm';
import TranslatedWord from './TranslatedWord';

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            word: ""
        }
        this.translateWord = this.translateWord.bind(this);
    }
    translateWord(word) {
        return axios.get("https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20180514T051146Z.a04fca93eb450a49.3deea58109584e0a8ed9480e6519d9952410b609&lang=en&text=" + word)
            .then(response => {
                console.log('response', response.data["text"], response.data, response);
                const newState = this.setState({ output: response.data["text"] });
                return { output: response.data["text"] }
            });
    }
    render() {
        return (
            <div>
                <Head>
                    <span>Dictionary</span>
                </Head>
                <InputForm translateWord={this.translateWord} />
                <TranslatedWord output={this.state.output} />
            </div>
        )
    }
}