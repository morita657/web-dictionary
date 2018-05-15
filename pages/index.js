import React from 'react';
import Head from 'next/head';
import axios from 'axios';
import InputForm from './InputForm';
import TranslatedWord from './TranslatedWord';

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            word: "",
            output: "",
            isPending: true,
        }
        this.translateWord = this.translateWord.bind(this);
        this.getSummary = this.getSummary.bind(this);
    }
    translateWord(word) {
        return axios.get("https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20180514T051146Z.a04fca93eb450a49.3deea58109584e0a8ed9480e6519d9952410b609&lang=en&text=" + word)
            .then(response => {
                const newState = this.setState({ word: response.data["text"] });
                this.getSummary(response.data["text"]);
                return newState;
            });
    }
    getSummary(word) {
        const title = encodeURIComponent(word);
        axios.get(`https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=${encodeURIComponent(word)}`, {
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            proxy: {
                host: '104.236.174.88',
                port: 8080
            }
        }).then(response => {
            const output = response.data.query.pages[Object.keys(response.data.query.pages)[0]]["extract"];
            const newState = this.setState({ output, isPending: false });
            return newState;
        }).catch(error => {
            console.log('There is a something wrong... ', error);
        })
    }
    render() {
        return (
            <div>
                <Head>
                    <span>Dictionary</span>
                </Head>
                <InputForm translateWord={this.translateWord} />
                <isLoading isPending={this.state.isPending} />
                <TranslatedWord word={this.state.word} output={this.state.output} />
            </div>
        )
    }
}
