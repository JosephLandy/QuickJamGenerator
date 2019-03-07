import React, {Component} from "react";
import ReactAudioPlayer from 'react-audio-player';
import ContainerDimensions from 'react-container-dimensions';
import IconButton from '@material-ui/core/IconButton';
import VolumeOffIcon from '@material-ui/icons/VolumeOffSharp';
import VolumeMuteIcon from '@material-ui/icons/VolumeMuteSharp';
import VolumeDownIcon from '@material-ui/icons/VolumeDownSharp';
import VolumeUpIcon from '@material-ui/icons/VolumeUpSharp';
import AudioVis from './AudioVis';
import { WebAudioTrack } from "../audio";


import './Track.css';

export default class Track extends Component {

  constructor(props) {
    super(props);
    this.state = {
      volume: 50,
      audioVisData: new Uint8Array(0),
      muted:false,
    };

    this.tick = this.tick.bind(this);
    this.sliderChanged = this.sliderChanged.bind(this);
    this.onMuteClick = this.onMuteClick.bind(this);

    this.audiobox = React.createRef();
    this.RAP = React.createRef(); // reference to audio player.
  }

  // I think we can use on listen on the ReactAudioPlayer instead.
  componentDidMount() {
    this.rafId = requestAnimationFrame(this.tick);

    // now set up webaudio. // want to be able to change this without triggering rerender -
    // so we shouldn't have this in state. I think that will work. The only thing is whether the track will be
    // restarted if the component is re-rendered. - it's not as far as I can tell.
    let audioelem = this.RAP.current.audioEl;
    this.webaudio = new WebAudioTrack(audioelem, 0);
    this.audioFreqData = new Uint8Array(this.webaudio.analyser.frequencyBinCount);

  }

  componentWillUnmount() {
    cancelAnimationFrame(this.rafId);
  }

  tick() {
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
    this.webaudio.toggleMute();
    this.setState({
      muted: !this.state.muted
    });
  }

  render() {
    // note: HTMLMediaElement.srcObject allows a MediaStream to be added to an audio elem.
    // This would be essential for if new tracks from microphone input are added.
    // doesn't seem to be supported by RAP, but could probably be added. Or roll our own.

    return (

        <div id={this.props.id} className="track-container">
          <div className="control-box">
            {/*<p>{this.props.name}</p>*/}
            <h3>{this.props.name}</h3>


            <div className="volume-controls">
              <IconButton onClick={this.onMuteClick}>
                {this.state.muted ? (<VolumeMuteIcon/>) : (<VolumeOffIcon/>)}
              </IconButton>
              <VolumeDownIcon/>
              <input type="range"
                     min={0}
                     max={200}
                     value={this.state.volume}
                     onChange={this.sliderChanged} />
              <VolumeUpIcon/>
            </div>
          </div>
          <ReactAudioPlayer
              src={this.props.audiosrc}
              autoPlay
              loop
              ref={this.RAP}
          />
          <div className="boxed" ref={this.audiobox}>
            <ContainerDimensions>
              {
                ({width}) => <AudioVis width={width} audioData={this.state.audioVisData}/>
              }
            </ContainerDimensions>
          </div>
        </div>
    );
  }

}