import React, {Component} from "react";
import ReactAudioPlayer from 'react-audio-player';

import AudioVis from '../AudioVis';

import { WebAudioTrack } from "../audio";

export default class Track extends Component {

  constructor(props) {

    super(props);

    this.state = {
      volume: 50,
      audioVisData: new Uint8Array(0),
      muted:false,
    };

    this.audiobox = React.createRef();
    this.tick = this.tick.bind(this);
    this.sliderChanged = this.sliderChanged.bind(this);
    this.onMuteClick = this.onMuteClick.bind(this);

    this.RAP = React.createRef(); // reference to audio player.
  }

  componentDidMount() {
    // this.dataArray = new Uint8Array(this.props.audio.analyser.frequencyBinCount);

    // I think we can use on listen on the ReactAudioPlayer instead.
    this.rafId = requestAnimationFrame(this.tick);
    let audioelem = this.RAP.current.audioEl;
    // now set up webaudio. // want to be able to change this without triggering rerender -
    // so we shouldn't have this in state. I think that will work. The only thing is whether the track will be
    // restarted if the component is re-rendered. - it's not as far as I can tell.
    this.webaudio = new WebAudioTrack(audioelem, 0);
    this.audioFreqData = new Uint8Array(this.webaudio.analyser.frequencyBinCount);

  }

  componentWillUnmount() {
    cancelAnimationFrame(this.rafId);
  }

  tick() {
    // this.props.audio.analyser.getByteTimeDomainData(this.dataArray);
    // this.setState({
    //   audioData: this.dataArray
    // });
    // this.rafId = requestAnimationFrame(this.tick);
    this.webaudio.analyser.getByteTimeDomainData(this.audioFreqData);
    this.setState({
      audioVisData: this.audioFreqData
    });
    this.rafId = requestAnimationFrame(this.tick);
  }

  sliderChanged(event) {
    this.setState({
      volume: event.target.value
    });
    const gainVal = event.target.value / 100;
    this.webaudio.volumeAdjust(gainVal);
  }

  onMuteClick(event) {
    event.preventDefault();
    // this.props.muteHandler(this.props.trackID);
    this.webaudio.toggleMute();
  }

  render() {
    // note: HTMLMediaElement.srcObject allows a MediaStream to be added to an audio elem.
    // This would be essential for if new tracks from microphone input are added.
    // doesn't seem to be supported by RAP, but could probably be added. Or roll our own.

    return (
        <div id={this.props.id} className="track-container">
          <div className="control-box">
            <p>{this.props.name}</p>
            <button onClick={this.onMuteClick}>
              {this.state.muted ? 'unmute' : 'mute'}
            </button>
            <div className="slidecontainer">
              <input type="range"
                     min={0}
                     max={200}
                     value={this.state.volume}
                     onChange={this.sliderChanged} />
            </div>
          </div>
          <ReactAudioPlayer
              src={this.props.audiosrc}
              autoPlay
              loop
              ref={this.RAP}
          />
          <div className="boxed" ref={this.audiobox}>
            <AudioVis audioData={this.state.audioVisData}/>
          </div>
        </div>
    );
  }

}