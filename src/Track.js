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

    this.state = {
      slidervalue: 50,
    };

    this.sliderChanged = this.sliderChanged.bind(this);
  }

  sliderChanged(event) {
    this.setState({slidervalue: event.target.value});
  }

  render() {
    return (
        <div className="track-container">
          {this.props.name}
          <button>mute</button>
          <div className="boxed" />
          <div className="slidecontainer">
            <input type="range" min={1} max={100} value={this.state.slidervalue} onChange={this.sliderChanged} />
          </div>
        </div>
    );
  }

}

export default Track;