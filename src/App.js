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
import sound from "./webaudio";


// const host = "http://localhost:8000/";
const backendhost = 'http://127.0.0.1:5000/';


<<<<<<< HEAD
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
=======

const tracksinfo = [
  {URL: arpeggURL, name: "pegg", mute: false, volume: 50},
  {URL: bassURL, name: "bass", mute: false, volume: 50},
  {URL: HiHatURL, name: "HiHat", mute: false, volume: 50},
  {URL: kickURL, name: "kick", mute: false, volume: 50},
  {URL: padsURL, name: "pads", mute: false, volume: 50},
  {URL: pianoURL, name: "Piano", mute: false, volume: 50},
]
>>>>>>> master

class App extends Component {

  constructor(props) {
    super(props);
<<<<<<< HEAD
=======

    // this.sample = new Audio(this.url);
    // this.arpegg = new Audio(arpeggURL);
    this.state = {
      started: false,
      tracks: [
        {URL: pianoURL, name: "Piano", mute: false, volume: 50},
        {URL: kickURL, name: "kick", mute: false, volume: 50},
        {URL: HiHatURL, name: "HiHat", mute: false, volume: 50},
        {URL: bassURL, name: "bass", mute: false, volume: 50},
        {URL: arpeggURL, name: "arpegg", mute: false, volume: 50},
        {URL: padsURL, name: "pads", mute: false, volume: 50},
      ],

    };

    this.startHandler = this.startHandler.bind(this);
    this.muteHandler = this.muteHandler.bind(this);

  }


  startHandler() {
    var context = new AudioContext();

    let sounds = this.state.tracks.map((track) => {
      return new sound(context, new Audio(track.URL), 0);
    });

    console.log(sounds);
    this.setState({started: true, sounds});
  }

  muteHandler(index) {
    if (this.state.tracks[index].mute) {
      
      let tracksTemp = [...this.state.tracks];
      tracksTemp[index] = {...tracksTemp[index], mute: false};
      this.state.sounds[index].unmute();
      this.setState({tracks: tracksTemp});

    } else {
      let tracksTemp = [...this.state.tracks];
      tracksTemp[index] = {...tracksTemp[index], mute: true};
      this.state.sounds[index].mute();
      this.setState({tracks: tracksTemp});
    }
    this.ajaxHandler(index)
    console.log("Mute handler called.");
  }

  ajaxHandler(index){
    var myInit = { method: 'POST',
               body:JSON.stringify(this.state.tracks[index])};
               //http://10.217.248.253:5000/track
    const request = new Request('http://10.217.248.253:5000/track', myInit);
    fetch(request).then(function(response) {
      console.log(response);
    });
>>>>>>> master
  }




  render() {
    if (this.state.started) {
      return (
          <div className="App">
            <div className="container">
              <div class="wordart blues"><span class="text"><p id="spinner">Quick Jam Generator</p></span></div>
              <Track id="piano" name="Piano" trackID={0} muteHandler={this.muteHandler}/>
              <Track id="kick" name="Kick" trackID={1} muteHandler={this.muteHandler}/>
              <Track id="hihat" name="HiHat" trackID={2} muteHandler={this.muteHandler}/>
              <Track id="bass" name="bass" trackID={3} muteHandler={this.muteHandler}/>
              <Track id="arpegg" name="arpegg" trackID={4} muteHandler={this.muteHandler}/>
              <Track id="pads" name="pads" trackID={5} muteHandler={this.muteHandler}/>
            </div>
          </div>
      );

<<<<<<< HEAD
        <div >
          <Track name="arpeg" trackID={0} audio={null}/>
          <Track name="bass" trackID={0} audio={null}/>
          <Track name="HiHat" trackID={0} audio={null}/>
        </div>
=======
    } else {
      return (
          <button onClick={this.startHandler}>
            play
          </button>
      );
    }
>>>>>>> master

  }

}


export default App;
