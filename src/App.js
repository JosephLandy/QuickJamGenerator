import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import arpeggURL from './music/arpegg.wav';
import bassURL from './music/bass.wav';
import HiHatURL from './music/HiHat.wav';
import kickURL from './music/kick.wav';
import padsURL from './music/pads.wav';
import pianoURL from './music/piano.wav';

import Track from './Track';


// const host = "http://localhost:8000/";


const tracks = {
  arpeg: {URL: arpeggURL, name: 'arpegg', muted: false},
};

class App extends Component {

  constructor(props) {
    super(props);

    this.url = "http://localhost:8000/batida__2_-_130_bpm.wav";
    // this.sample = new Audio(this.url);
    // this.arpegg = new Audio(arpeggURL);
  }

  render() {
    return (
      <div className="App">
        {/*<header className="App-header">*/}
          {/*/!*<img src={logo} className="App-logo" alt="logo" />*!/*/}
          {/*/!*<p>*!/*/}
            {/*/!*Edit <code>src/App.js</code> and save to reload.*!/*/}
          {/*/!*</p>*!/*/}
          {/*/!*<img src="http://0.0.0.0:8000/getRequest.png" />*!/*/}
          {/*<a*/}
            {/*className="App-link"*/}
            {/*href="https://reactjs.org"*/}
            {/*target="_blank"*/}
            {/*rel="noopener noreferrer"*/}
          {/*>*/}
            {/*Learn React*/}
          {/*</a>*/}
        {/*</header>*/}

        <div>
          <Track name="arpeg" />
          <Track name="bass" />
          <Track name="HiHat" />
        </div>

      </div>
    );
  }

}


export default App;
