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

        <div className="container">
          <Track id="piano" name="Piano" trackID={0}/>
          <Track id="kick" name="Kick" trackID={1}/>
          <Track id="hihat" name="HiHat" trackID={2} />
          <Track id="bass" name="bass" trackID={3} />
          <Track id="arpegg" name="arpegg" trackID={4} />
          <Track id="pads" name="pads" trackID={5} />
        </div>

      </div>
    );
  }

}


export default App;
