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
const backendhost = 'http://127.0.0.1:5000/';


const tracks = {
  arpeg: {URL: arpeggURL, name: 'arpegg', muted: false},
};

class App extends Component {

  constructor(props) {
    super(props);

    // this.sample = new Audio(this.url);
    // this.arpegg = new Audio(arpeggURL);
  }

  render() {
    return (
      <div className="App">

        <div>
          <Track name="arpeg" trackID={0} />
          <Track name="bass" trackID={0} />
          <Track name="HiHat" trackID={0} />
        </div>

      </div>
    );
  }

}


export default App;
