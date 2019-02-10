
class sound {

  constructor(context, audioElement, currentTime) {
    //context - audio context, audioElement - audio tag, currentTime -
    this.context = context;
    this.audioElem = audioElement;
    this.audioElem.loop = true;
    this.currentTime = currentTime;
    this.track = this.context.createMediaElementSource(this.audioElem);

    this.gainNode = this.context.createGain();
    this.track.connect(this.gainNode);
    this.gainNode.connect(this.context.destination);

    this.audioElem.currentTime = this.currentTime;

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

  setMute(muted) {
    if (muted) {
      this.gainNode.gain.setValueAtTime(0, this.context.currentTime);
    } else {
      this.gainNode.gain.value = 1;
    }
  }

  volumeAdjust(val) {
    this.gainNode.gain.value = val;
  }

  // updateTimeDomainData() {
  //   this.analyser.getByteTimeDomainData(this.dataArray);
  // }

}

export default sound;