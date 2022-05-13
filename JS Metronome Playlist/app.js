import Timer from "./timer.js";
const tempoDisplay = document.querySelector('.tempo');
const tempoText = document.querySelector('.tempo-text');
const decreaseTempoBtn = document.querySelector('.decrease-tempo');
const increaseTempoBtn = document.querySelector('.increase-tempo');
const tempoSlider = document.querySelector('.slider');
const startStopBtn = document.querySelector('.start-stop');
const subtractBeats = document.querySelector('.subtract-beats');
const addBeats = document.querySelector('.add-beats');
const measureCount = document.querySelector('.measure-count');
const openPlaylistBtn = document.querySelector('.open-playlist-btn');
const removeFieldBtn = document.querySelector('.remove-field-btn');
const addFieldBtn = document.querySelector('.add-field-btn');

// The 2 Audio Files
const click1 = new Audio ('click1.mp3');
const click2 = new Audio ('click2.mp3');

// The Tap Tempo button variables
const tapElement = document.getElementById('TAP');
const precision = 5;
let taps = [];

// Default values for BPM's, Number of Beats, and Tempo Comment
let bpm = 120;
let beatsPerMeasure = 4;
let count = 0;
let tempoTextString = 'MEDIUM';
let isRunning = false;

// Create Playlist running variable
let isPlaylistOn = false;

// Create Playlist counting variable
var playlistCount = 1;

// Decrease tempo button event listener
decreaseTempoBtn.addEventListener('click', () => {
    if (bpm <= 45) { return};
    bpm--;
    validateTempo();
    updateMetronome()
});

// Increase tempo button event listener
increaseTempoBtn.addEventListener('click', () => {
    if (bpm >= 280) { return};
    bpm++;
    validateTempo();
    updateMetronome()
});

// Slider listener
tempoSlider.addEventListener('input', () => {
    bpm = tempoSlider.value;
    validateTempo();
    updateMetronome()
});

// Subtract beats button listener
subtractBeats.addEventListener('click', () => {
    if (beatsPerMeasure <= 2) { return};
    beatsPerMeasure--;
    measureCount.textContent = beatsPerMeasure;
    count = 0;
});

// Add beats button listener
addBeats.addEventListener('click', () => {
    if (beatsPerMeasure >= 12) { return};
    beatsPerMeasure++;
    measureCount.textContent = beatsPerMeasure;
    count = 0;
});

// Start/stop button listener
startStopBtn.addEventListener('click', () => {
    count = 0;
    if (!isRunning) {
        metronome.start();
        isRunning = true;
        startStopBtn.textContent = 'STOP';
    } else {
        metronome.stop();
        isRunning = false;
        startStopBtn.textContent = 'START';
    }
});

// Tap Tempo listener with validation and update
function tapListener() {
    tapElement.onclick = function() {
        taps.push( Date.now() );
        calcBPM();
    };
};

function calcBPM() {
    let currentBPM = 0;
    let ticks = [];

    if (taps.length >= 2) {
        for (let i = 0; i < taps.length; i++) {
            if (i >= 1) {
                ticks.push(Math.round(60 / (taps[i] / 1000 - taps[i-1] / 1000) * 100) / 100);
            }
        }
    }

    if (taps.length >= 24) {
        taps.shift();
    }

    if (ticks.length >= 2) {
        currentBPM = getAverage(ticks, precision);
        if (taps.length >= precision + 3) {
            if (currentBPM % 2 == 1) currentBPM = getAverage(ticks, precision + 1);
            if (currentBPM % 2 == 1) currentBPM = getAverage(ticks, precision + 2);
            if (currentBPM % 2 == 1) currentBPM = getAverage(ticks, precision + 3);
        }
        if (bpm == 0 || bpm - currentBPM >= 10) {
            bpm = currentBPM;
        }
        bpm = currentBPM;
        showCurrentBPM();
    }
};

function getAverage(Values, Precision) {
    let ticks = Values;
    let n = 0;

    for (let i = ticks.length-1; i >= 0; i--) {
        n += ticks[i];
        if (ticks.length - i >= Precision) break;
    }

    return n / precision;
};

function showCurrentBPM() {
    bpm = Math.round(bpm);
    validateTempo();
    updateMetronome();
};

function updateMetronome() {
    tempoDisplay.textContent = bpm;
    tempoSlider.value = bpm;
    metronome.timeInterval = 60000 / bpm;
    tempoText.textContent = tempoTextString;
    if (bpm <= 45) { tempoTextString = "super slow"};
    if (bpm > 45 && bpm <= 80) { tempoTextString = "slow"};
    if (bpm > 80 && bpm <= 120) { tempoTextString = "medium"};
    if (bpm > 120 && bpm <= 155) { tempoTextString = "fast"};
    if (bpm > 155) { tempoTextString = "super fast"};
};

function validateTempo() {
    if (bpm <= 45) { return};
    if (bpm >= 280) { return};
};

function playClick() {
    if (count == beatsPerMeasure) {
        count = 0;
    }

    if (count == 0) {
        click1.play();
        click1.currentTime = 0;
    } else {
        click2.play();
        click2.currentTime = 0;
    }
    count++;
};

// Open/Close Playlist button listener
openPlaylistBtn.addEventListener('click', () => {
    if (!isPlaylistOn) {
        isPlaylistOn = true;
        openPlaylistBtn.textContent = 'CLOSE PLAYLIST';
        document.getElementById('fieldContainer').style.visibility = "visible";
        document.getElementById('nextTempo').style.visibility = "visible";
        
    } else {
        isPlaylistOn = false;
        openPlaylistBtn.textContent = 'OPEN PLAYLIST';
        document.getElementById('fieldContainer').style.visibility = "hidden";
        document.getElementById('fieldContainer2').style.visibility = "hidden";
        document.getElementById('fieldContainer3').style.visibility = "hidden";
        document.getElementById('fieldContainer4').style.visibility = "hidden";
        document.getElementById('fieldContainer5').style.visibility = "hidden";
        document.getElementById('fieldContainer6').style.visibility = "hidden";
        document.getElementById('fieldContainer7').style.visibility = "hidden";
        document.getElementById('fieldContainer8').style.visibility = "hidden";
        document.getElementById('fieldContainer9').style.visibility = "hidden";
        document.getElementById('fieldContainer10').style.visibility = "hidden";
        document.getElementById('previousTempo').style.visibility = "hidden";
        document.getElementById('nextTempo').style.visibility = "hidden";
        playlistCount = 1;
        
    }
});

// Remove Playlist button listener
removeFieldBtn.addEventListener('click', () => {
    if (playlistCount <= 10 && playlistCount >= 2) {
        document.getElementById('fieldContainer' + playlistCount).style.visibility = "hidden";
        playlistCount--;
    } else if (playlistCount <= 1) {
        playlistCount = 1;
        isPlaylistOn = false;
        openPlaylistBtn.textContent = 'OPEN PLAYLIST';
        document.getElementById('fieldContainer').style.visibility = "hidden";
        document.getElementById('previousTempo').style.visibility = "hidden";
        document.getElementById('nextTempo').style.visibility = "hidden";
    } else {
        playlistCount = playlistCount;
    }    
});

// Add Playlist button listener
addFieldBtn.addEventListener('click', () => {
    if (playlistCount < 10 && !playlistCount < 1) {
        playlistCount++;
        document.getElementById('fieldContainer' + playlistCount).style.visibility = "visible";
        document.getElementById('previousTempo').style.visibility = "visible";
    } else if (playlistCount == 10) {
        alert("You have reached the maximum number of tempos")
    } else {
        playlistCount = playlistCount;
    }
    
});

window.onload = tapListener;
const metronome = new Timer(playClick, 60000 / bpm, { immediate: true});
