import React from 'react';
import Head from 'next/head';
import InputForm from './InputForm';
import TranslatedWord from './TranslatedWord';
import axios from 'axios';

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            word: "",
            output: "",
            isPending: false,
        }
        this.translateWord = this.translateWord.bind(this);
        this.getSummary = this.getSummary.bind(this);
        this.showLoading = this.showLoading.bind(this);
    }
    translateWord(word) {
        return axios.get("https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20180514T051146Z.a04fca93eb450a49.3deea58109584e0a8ed9480e6519d9952410b609&lang=en&text=" + word)
            .then(response => {
                const newState = this.setState({ isPending: true, word: response.data["text"] });
                this.getSummary(response.data["text"]);
                return newState;
            });
    }
    getSummary(word) {
        const title = encodeURIComponent(word);
        fetch(`https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&origin=*&titles=${encodeURIComponent(word)}`)
            .then(response => {
                this.showLoading();
                return response.json();
            }).then(data => {
                const output = data.query.pages[Object.keys(data.query.pages)[0]]["extract"];
                const newState = this.setState({ output, isPending: false });
                return newState;
            }).catch(error => {
                console.log('There is a something wrong... ', error);
            })
    }
    showLoading() {
        console.log('loading...');
        if (this.state.isPending) {
            return (<div>
                <div className='container'>
                    <div className='loader'>
                        <div className='loader--dot'></div>
                        <div className='loader--dot'></div>
                        <div className='loader--dot'></div>
                        <div className='loader--dot'></div>
                        <div className='loader--dot'></div>
                        <div className='loader--dot'></div>
                        <div className='loader--text'></div>
                    </div>
                </div>
                <style jsx>{`
        .container {  height: 100vh;  width: 100vw;  font-family: Helvetica;}.loader {  height: 20px;  width: 250px;  position: absolute;  top: 0;  bottom: 0;  left: 0;  right: 0;  margin: auto;}.loader--dot {  animation-name: loader;  animation-timing-function: ease-in-out;  animation-duration: 3s;  animation-iteration-count: infinite;  height: 20px;  width: 20px;  border-radius: 100%;  background-color: black;  position: absolute;  border: 2px solid white;}.loader--dot:first-child {  background-color: #8cc759;  animation-delay: 0.5s;}.loader--dot:nth-child(2) {  background-color: #8c6daf;  animation-delay: 0.4s;}.loader--dot:nth-child(3) {  background-color: #ef5d74;  animation-delay: 0.3s;}.loader--dot:nth-child(4) {  background-color: #f9a74b;  animation-delay: 0.2s;}.loader--dot:nth-child(5) {  background-color: #60beeb;  animation-delay: 0.1s;}.loader--dot:nth-child(6) {  background-color: #fbef5a;  animation-delay: 0s;}.loader--text {  position: absolute;  top: 200%;  left: 0;  right: 0;  width: 4rem;  margin: auto;}.loader--text:after {  content: "Loading";  font-weight: bold;  animation-name: loading-text;  animation-duration: 3s;  animation-iteration-count: infinite;}@keyframes loader {  15% {    transform: translateX(0);  }  45% {    transform: translateX(230px);  }  65% {    transform: translateX(230px);  }  95% {    transform: translateX(0);  }}@keyframes loading-text {  0% {    content: "Loading";  }  25% {    content: "Loading.";  }  50% {    content: "Loading..";  }  75% {    content: "Loading...";  }}
        `}</style>
            </div>)
        }
        return;
    }
    componentWillMount() {
        const newState = this.setState({ isPending: true });
        this.showLoading();
        return newState;
    }
    componentDidMount() {
        return this.setState({ isPending: false });
    }
    render() {
        return (
            <div>
                <Head>
                    <span>Dictionary</span>
                </Head>
                <InputForm translateWord={this.translateWord} />
                {this.showLoading()}
                <TranslatedWord word={this.state.word} output={this.state.output} />
            </div >
        )
    }
}
