import React, {Component} from "react";

import AudioVisOriginal from './AudioVisOriginal';

export default class TrackOriginal extends Component {

  constructor(props) {

    super(props);

    this.state = {
      volume: 50,
      audioData: new Uint8Array(0),
    };

    this.audiobox = React.createRef();
    this.tick = this.tick.bind(this);
    this.sliderChanged = this.sliderChanged.bind(this);
    this.onMuteClick = this.onMuteClick.bind(this);
  }

  componentDidMount() {
    this.dataArray = new Uint8Array(this.props.audio.analyser.frequencyBinCount);
    this.rafId = requestAnimationFrame(this.tick);
  }

  // componentWillUnmount() {
  //   cancelAnimationFrame(this.rafId);
  // }

  tick() {
    this.props.audio.analyser.getByteTimeDomainData(this.dataArray);
    this.setState({
      audioData: this.dataArray
    });
    this.rafId = requestAnimationFrame(this.tick);
  }

  sliderChanged(event) {
    this.setState({
      volume: event.target.value
    });
    this.props.sliderHandler(this.props.trackID, event.target.value);
    console.log("slider changed");
  }

  onMuteClick(event) {
    event.preventDefault();
    this.props.muteHandler(this.props.trackID);
  }

  render() {
    return (
        <div id={this.props.id} className="track-container">
          <div className="control-box">
            <p>{this.props.name}</p>
            <button onClick={this.onMuteClick}>mute</button>
            <div className="slidecontainer">
              <input type="range"
                     min={0}
                     max={200}
                     value={this.state.volume}
                     onChange={this.sliderChanged} />
            </div>
          </div>
          <div className="boxed" ref={this.audiobox}>
            <AudioVisOriginal audioData={this.state.audioData}/>
          </div>

        </div>
    );
  }

}