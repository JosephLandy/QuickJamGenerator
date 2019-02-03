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


const tracks = [
  {URL: arpeggURL, name: 'arpegg', muted: false, volume:50},
  {URL: bassURL, name: 'bass', muted: false, volume:50},
  {URL: HiHatURL, name: 'HiHat', muted: false},
  {URL: kickURL, name: 'kick', muted: false},
  {URL: padsURL, name: 'pads', muted: false},
  {URL: pianoURL, name: 'piano', muted: false},


]
  arpeg: {URL: arpeggURL, name: 'arpegg', muted: false},
};

class App extends Component {

  constructor(props) {
    super(props);
  }




  render() {
    return (
      <div className="App">

        <div >
          <Track name="arpeg" trackID={0} audio={null}/>
          <Track name="bass" trackID={0} audio={null}/>
          <Track name="HiHat" trackID={0} audio={null}/>
        </div>

      </div>
    );
  }

}


export default App;
