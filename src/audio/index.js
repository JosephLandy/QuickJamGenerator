
// app will use one global audio context.
export const audioctx = new AudioContext();

// thinking about all this as a graph, we have

// *(audioElem -> individual effect nodes) -> destination.
// what we could have instead is a add a node where all the individual audio nodes
// get combined before that node goes to destination.
// that gives us a place to add effects on the entire sound thing.
// so: *(audioElem -> individual effect nodes) -> newNode -> destination
// then: *(audioElem -> individual effect nodes) *-> newNode -> global effect node -> destination

export class WebAudioTrack {
  /**
   * @param {HTMLAudioElement} audioElem
   * @param {number} initialTime
   */
  constructor(audioElem, initialTime) {
    this.audioElem = audioElem;
    this.track = audioctx.createMediaElementSource(this.audioElem);
    this.gainNode = audioctx.createGain();
    this.track.connect(this.gainNode);
    this.gainNode.connect(audioctx.destination);

    this.audioElem.currentTime = initialTime; // this may fail, depending on value.

    this.analyser = audioctx.createAnalyser();
    this.gainNode.connect(this.analyser);
    this.audioElem.play();

  }

  //https://developer.mozilla.org/en-US/docs/Web/API/GainNode
  /**
   *
   */
  mute() {
    this.gainNode.gain.setValueAtTime(0, this.audioElem.currentTime);
  }

  unmute() {
    this.gainNode.gain.value = 1;
  }

  toggleMute() {
    this.audioElem.muted = !this.audioElem.muted;
  }

  volumeAdjust(val) {
    this.gainNode.gain.value = val;
  }


}