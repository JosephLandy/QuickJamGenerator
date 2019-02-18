import React, { Component } from 'react';

import './App.css';

import arpeggURL from './music/arpegg.mp3';
import bassURL from './music/bass.mp3';
import HiHatURL from './music/hihat.mp3';
import kickURL from './music/kick.mp3';
import padsURL from './music/pads.mp3';
import pianoURL from './music/piano.mp3';

import Track from './TrackOriginal';
import sound from "./webaudio";


const backendhost = 'http://127.0.0.1:5000/';


export default class AppOriginal extends Component {

  constructor(props) {
    super(props);

    this.state = {
      started: false,
      tracks: [
        {URL: pianoURL, id: 'piano', name: "Piano", mute: false, volume: 70},
        {URL: kickURL, id: "kick", name: "kick", mute: false, volume: 70},
        {URL: HiHatURL, id: "hihat", name: "HiHat", mute: false, volume: 70},
        {URL: bassURL, id: "bass", name: "bass", mute: false, volume: 70},
        {URL: arpeggURL, id: "arpegg", name: "arpegg", mute: false, volume: 70},
        {URL: padsURL, id: "pads", name: "pads", mute: false, volume: 70},
      ],
    };

    this.startHandler = this.startHandler.bind(this);
    this.muteHandler = this.muteHandler.bind(this);
    this.sliderHandler = this.sliderHandler.bind(this);

  }

  sliderHandler(index, value){
    this.state.sounds[index].volumeAdjust(value/100);
    console.log("Slider handled")
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

    this.ajaxHandler(index,"update");
    console.log("Mute handler called.");

  }

  // this looks a lot like a Redux reducer. Maybe we can use redux, and share stuff with this.
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
              <div class="wordart blues">
                <span class="text">
                  <p id="spinner">Quick Jam Generator</p>
                </span>
              </div>
              {
                this.state.tracks.map((track, i) => (
                    <Track
                        id={track.id}
                        name={track.name}
                        trackID={i}
                        audio={this.state.sounds[i]}
                        muteHandler={this.muteHandler}
                        sliderHandler={this.sliderHandler}
                    />
                ))
              }
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