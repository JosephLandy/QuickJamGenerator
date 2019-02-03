import React, {Component} from "react";
import sound from './webaudio';
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
    event.preventDefault();
    this.props.muteHandler(this.props.trackID)

  }


  render() {
    return (
        <div id={this.props.id} className="track-container">
          <div className="control-box">
            <p>{this.props.name}</p>
            <button onClick={this.onMuteClick}>mute</button>
            <div className="slidecontainer">
              <input type="range" min={0} max={200} value={this.state.volume} onChange={this.sliderChanged} />
            </div>
          </div>
          <div className="boxed"></div>
        </div>
    );
  }


}

export default Track;