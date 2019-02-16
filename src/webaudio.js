
class sound {

  constructor(context, audioElement, currentTime) {
    //context - audio context, audioElement - audio tag, currentTime -
    this.context = context;
    this.audioElem = audioElement;
    this.audioElem.loop = true;
    // this.currentTime = currentTime;
    this.track = this.context.createMediaElementSource(this.audioElem);

    this.gainNode = this.context.createGain();
    this.track.connect(this.gainNode);
    this.gainNode.connect(this.context.destination);

    this.audioElem.currentTime = currentTime;

    this.analyser = this.context.createAnalyser();

    // this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);

    this.gainNode.connect(this.analyser);
    this.audioElem.play();

  }

  //https://developer.mozilla.org/en-US/docs/Web/API/GainNode
  mute() { // mutes the track
    this.gainNode.gain.setValueAtTime(0, this.context.currentTime);
  }

  unmute() {
    this.gainNode.gain.value = 1;
  }

  toggleMute(muted) {
    if (muted) {
      this.unmute();
    } else {
      this.mute();
    }
  }

  volumeAdjust(val) {
    this.gainNode.gain.value = val;
  }

  // ok, so this doesn't really work.
  computeTrackDisplay(nsamples = 600) {
    // because the audio asset might be streaming,
    // we want to be able to use this with time not 0, and then reset to that time.
    // let playTime = this.audioElem.currentTime;
    // I should use track, not audioElem.
    let playTime = this.audioElem.currentTime;
    let interval = this.audioElem.duration / nsamples;
    // console.log(this.audioElem.duration); // returns nan, meaning it can't determine duration.
    // Maybe hasn't fully loaded yet when this is called.
    // console.log(this.track.)
    let samples = [];
    this.analyser.fftSize = 32; // minimum fft size. frequencyBinCount is 1/2 this.
    let bins = new Uint8Array(this.analyser.frequencyBinCount);
    for (let i = 0; i < 300; i++) {
      let t = i * interval;
      // this.audioElem.currentTime = t;
      this.analyser.getByteFrequencyData(bins);
      // find max value.
      let max = 0;
      for (const val of bins) {
        if (val > max) {
          max = val;
        }
      }
      samples.push(max);
    }
    this.audioElem.currentTime = playTime;
    console.log(samples);
    return samples;
  }

  // displays the seekable range
  printSeekable() {
    const ranges = this.audioElem.seekable;
    console.log(ranges);
    for (let i = 0; i < ranges.length; i++) {
      console.log(`${ranges.start(i)}, ${ranges.end(i)}`)
    }
  }

  changeCurrentTime() {
    console.log('changing time');
    this.audioElem.currentTime = 100;
    console.log(this.audioElem.currentTime);
  }


}

export default sound;