class sound{
    constructor(context, audioElement, currentTime){
        //context - audio context, audioElement - audio tag, currentTime - 
        this.context = context;
        this.audioElem = audioElement;
        this.currentTime = currentTime;
    }
    init(){
        //instantiating the web audio api object
        this.track = this.context.createMediaElementSource(self.audioElem);
        //creates 
        this.gainNode = this.context.createGain();
        this.track.connect(gainNode);
        this.track.connect(self.context.destination);
        this.audioElem.currentTime = currentTime;
        this.audioElem.play();
    }
    stop(){//mutes the track
        this.gainNode.gain.value = 0;

    }
    playTrack(){
        this.gainNode.gain.value = 1;
    }
    volumeAdjust(val){
        this.gainNode.gain.value = val;
    }
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