import React, { Component } from 'react';

import './App.css';

import arpeggURL from '../music/arpegg.mp3';
import bassURL from '../music/bass.mp3';
import HiHatURL from '../music/hihat.mp3';
import kickURL from '../music/kick.mp3';
import padsURL from '../music/pads.mp3';
import pianoURL from '../music/piano.mp3';

import Track from './Track';


const backendhost = 'http://127.0.0.1:5000/';


export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      started: false,
      tracks: [
        {URL: pianoURL, id: 'piano', name: "Piano"},
        {URL: kickURL, id: "kick", name: "kick"},
        {URL: HiHatURL, id: "hihat", name: "HiHat"},
        {URL: bassURL, id: "bass", name: "bass"},
        {URL: arpeggURL, id: "arpegg", name: "arpegg"},
        {URL: padsURL, id: "pads", name: "pads"},
      ],
    };
  }

  // not sure where the ajax handler would go now that things are refactored.
  ajaxHandler(index,type) {

    if(type === "update") {
      //UPDATES THE STATE OF TRACK ID
      var myInit = { method: 'POST',
        body:JSON.stringify(this.state.tracks[index])};
      //http://10.217.248.253:5000/track
      const request = new Request('http://10.217.188.27:5000/track', myInit);
      fetch(request).then(function(response) {

      });
    }
    else if(type === "sync") {
      //GETS THE TIME
      //http://10.217.248.253:5000/track
      const request = new Request('http://10.217.188.27:5000/sync', {Method:'GET', mode: 'cors', cache: 'default' });
      fetch(request).then(function(response) {
        console.log(response);
      });
    }
    else if( type === "get") {
      //USED TO GET STATE OF SPECIFIC TRACK ID
      //http://10.217.248.253:5000/track
      const request = new Request('http://10.217.188.27:5000/track/{0}'.format(index), {Method:'GET', mode: 'cors', cache: 'default' });
      fetch(request).then(function(response) {
        console.log(response);
      });
    }
  }

  render() {
    return (
        <div className="App">
          <div className="container">
            <div className="wordart blues">
              <span className="text">
                <p id="spinner">Quick Jam Generator</p>
              </span>
            </div>
            <div className={'track-list'}>
              {
                this.state.tracks.map((track, i) => (
                    <Track
                        id={track.id}
                        name={track.name}
                        trackID={i}
                        audiosrc={track.URL}
                        key={i}
                    />
                ))
              }
            </div>

          </div>
        </div>
    );
  }

}