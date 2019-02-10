import React, { Component } from 'react';

class AudioVis extends Component {


  constructor(props) {
    super(props);
    this.canvas = React.createRef();
  }

  componentDidUpdate() {
    this.draw();
  }


  render() {
    return <canvas style={{width: '100%', height: '100%'}} ref={this.canvas}/>;
  }

  draw() {
    const { audioData } = this.props;

    const canvas = this.canvas.current;
    const height = canvas.height;
    const width = canvas.width;

    const context = canvas.getContext('2d');

    const sliceWidth = (width * 1.0) / audioData.length;

    context.lineWidth = 2;
    context.strokeStyle = 'blue';
    context.clearRect(0, 0, width, height);
    context.beginPath();
    context.moveTo(0, height / 2);

    let x = 0;
    for (const item of audioData) {
      const y = (item / 255.0) * height;
      context.lineTo(x, y);
      x += sliceWidth;
    }
    context.lineTo(x, height / 2);
    context.stroke();

  }



}

export default AudioVis;