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



const tracksinfo = [
  {URL: arpeggURL, name: "pegg", mute: false, volume: 70},
  {URL: bassURL, name: "bass", mute: false, volume: 70},
  {URL: HiHatURL, name: "HiHat", mute: false, volume: 70},
  {URL: kickURL, name: "kick", mute: false, volume: 70},
  {URL: padsURL, name: "pads", mute: false, volume: 70},
  {URL: pianoURL, name: "Piano", mute: false, volume: 70},
]

class App extends Component {

  constructor(props) {
    super(props);

    // this.sample = new Audio(this.url);
    // this.arpegg = new Audio(arpeggURL);
    this.state = {
      started: false,
      tracks: [
        {URL: pianoURL, name: "Piano", mute: false, volume: 70},
        {URL: kickURL, name: "kick", mute: false, volume: 70},
        {URL: HiHatURL, name: "HiHat", mute: false, volume: 70},
        {URL: bassURL, name: "bass", mute: false, volume: 70},
        {URL: arpeggURL, name: "arpegg", mute: false, volume: 70},
        {URL: padsURL, name: "pads", mute: false, volume: 70},
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
    this.ajaxHandler(index,"update")
    console.log("Mute handler called.");
  }

  ajaxHandler(index,type){
    if(type == "update"){
      //UPDATES THE STATE OF TRACK ID
      var myInit = { method: 'POST',
                body:JSON.stringify(this.state.tracks[index])};
                //http://10.217.248.253:5000/track
      const request = new Request('http://10.217.188.27:5000/track', myInit);
      fetch(request).then(function(response) {
        
      });
    }
    else if(type == "sync"){
      //GETS THE TIME
                //http://10.217.248.253:5000/track
      const request = new Request('http://10.217.188.27:5000/sync', {Method:'GET', mode: 'cors', cache: 'default' });
      fetch(request).then(function(response) {
        console.log(response);
      });
    }
    else if( type == "get"){
      //USED TO GET STATE OF SPECIFIC TRACK ID
      //http://10.217.248.253:5000/track
      const request = new Request('http://10.217.188.27:5000/track/{0}'.format(index), {Method:'GET', mode: 'cors', cache: 'default' });
      fetch(request).then(function(response) {
        console.log(response);
      });

    }

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
              <Track id="bass" name="Bass" trackID={3} muteHandler={this.muteHandler}/>
              <Track id="arpegg" name="Arpegg" trackID={4} muteHandler={this.muteHandler}/>
              <Track id="pads" name="Pads" trackID={5} muteHandler={this.muteHandler}/>
            </div>
          </div>
      );

    } else {
      return (
          <button id="playButton" onClick={this.startHandler}>
            play
          </button>
      );
    }

  }

}


export default App;
