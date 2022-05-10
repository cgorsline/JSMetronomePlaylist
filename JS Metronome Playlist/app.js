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

// The 2 Audio Files
const click1 = new Audio ('click1.mp3');
const click2 = new Audio ('click2.mp3');

// Default values for BPM's, Number of Beats, and Tempo Comment
let bpm = 140;
let beatsPerMeasure = 4;
let count = 0;
let tempoTextString = 'MEDIUM';
let isRunning = false;

// Decrease tempo button event listener
decreaseTempoBtn.addEventListener('click', () => {
    if (bpm <= 20) { return};
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
}

function validateTempo() {
    if (bpm <= 20) { return};
    if (bpm >= 280) { return};
}

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
}

const metronome = new Timer(playClick, 60000 / bpm, { immediate: true});
