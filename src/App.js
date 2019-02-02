import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.url = "http://localhost:8000/batida__2_-_130_bpm.wav";
    this.sample = new Audio(this.url);
    this.play = this.play.bind(this);
  }

  play() {
    console.log(this.sample)
    this.sample.play();
  }

  render() {
    return (
      <div className="App">

        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          {/*<img src="http://0.0.0.0:8000/getRequest.png" />*/}
          <button onClick={this.play}>
            Play
          </button>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
