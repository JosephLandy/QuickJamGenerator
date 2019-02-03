import React, {Component} from "react";

import InputRange  from 'react-input-range';

import arpeggURL from './music/arpegg.wav';
import bassURL from './music/bass.wav';
import HiHatURL from './music/HiHat.wav';
import kickURL from './music/kick.wav';
import padsURL from './music/pads.wav';
import pianoURL from './music/piano.wav';

class Track extends Component {

  // gets name,
  constructor(props) {
    super(props);

    this.audioTracks = []

    this.state = {
      volume: 50,
    };

    this.sliderChanged = this.sliderChanged.bind(this);
    this.onSliderDown = this.onSliderDown.bind(this);
    this.onMuteClick = this.onMuteClick.bind(this);
  }

  sliderChanged(event) {
    this.setState({volume: event.target.value});
    console.log("slider changed");

  }


  // only want the server updated when the slider is released.
  onSliderDown(event) {

  }

  onSliderUp(event) {

  }

  onMuteClick(event) {

  }


  render() {
    return (
        <div className="track-container">
          {this.props.name}
          <button onClick={this.onMuteClick}>mute</button>
          <div className="boxed" />
          <div className="slidecontainer">
            <input type="range" min={1} max={100} value={this.state.volume} onChange={this.sliderChanged} />
          </div>
        </div>
    );
  }


}

export default Track;