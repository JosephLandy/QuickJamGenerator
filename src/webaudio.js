class sound{
    constructor(context, audioElement, currentTime){
        //context - audio context, audioElement - audio tag, currentTime - 
        this.context = context;
        this.audioElem = audioElement;
        this.currentTime = currentTime;
        this.track = this.context.createMediaElementSource(this.audioElem);
      // creates
        this.gainNode = this.context.createGain();
        this.track.connect(this.gainNode);
        this.gainNode.connect(this.context.destination);

        this.audioElem.currentTime = this.currentTime;

        this.analyser = this.context.createAnalyser();

        this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);

        // this.track.connect(this.analyser);

        this.gainNode.connect(this.analyser);
        this.audioElem.play();

        // this.mute = this.mute.bind(this);
    }
    // init() {
    //     //instantiating the web audio api object
    //     this.track = this.context.createMediaElementSource(this.audioElem);
    //     //creates
    //     let gainNode = this.context.createGain();
    //     this.track.connect(gainNode);
    //     this.track.connect(this.context.destination);
    //     this.audioElem.currentTime = this.currentTime;
    //     this.audioElem.play();
    // }
  //https://developer.mozilla.org/en-US/docs/Web/API/GainNode
    mute() {//mutes the track
        console.log('muted in the sound class');
        this.gainNode.gain.setValueAtTime(0, this.context.currentTime);

        this.printgain();
    }

    printgain() {
        console.log(this.gainNode)
    }

    unmute() {
        this.gainNode.gain.value = 1;
    }
    volumeAdjust(val) {
        this.gainNode.gain.value = val;
    }
}
export default sound;
/*
}
window.onload = function() {
    var button = document.getElementById("playButton");
    button.addEventListener("click", masterPlayButton());
};

function masterPlayButton(){

    var context = new AudioContext();
    var piano = new sound(context, document.getElementById("piano"), 0);
    var kick = new sound(context, document.getElementById("kick"),0);
    var hihat = new sound(context, document.getElementById("hihat"),0);
    var bass = new sound(context, document.getElementById("bass"),0);
    var pads = new sound(context, document.getElementById("pads"),0);
    var arpegg = new sound(context, document.getElementById("arpegg"), 0);
}*/