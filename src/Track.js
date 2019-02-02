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
      value: 50,
    }
  }

  sliderChanged(value) {
    
  }

  render() {
    return (
<<<<<<< HEAD
        <div>

        </div>
=======
        <span>
          {this.props.name}
        <div className="slidecontainer">
          <input type="range" min="1" max="100" value="50" className="slider" id="myRange" />   
        </div>
        </span>
>>>>>>> 00782727627bc4216141b1212d1e653943e830d0
    );
  }

}

export default Track;