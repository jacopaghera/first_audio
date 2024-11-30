const dsp = new AudioContext();
const gainSin = dsp.createGain();
const gainFm = dsp.createGain();
const gainAm = dsp.createGain();
const gainMaster = dsp.createGain();
const btnStartDsp = document.getElementById("startDsp");
const sliderGainSin = document.getElementById("gainSin");
const sliderGainAm = document.getElementById("gainAm");
const sliderGainFm = document.getElementById("gainFm");
const sliderMasterGain = document.getElementById("masterGain");
const valueSin = document.getElementById("valueSin");
const valueAm = document.getElementById("valueAm");
const valueFm = document.getElementById("valueFm");
const valueMaster = document.getElementById("valueMaster");

const startOscillator = document.getElementById("startOsc");

gainMaster.connect(dsp.destination);

console.log(dsp.sampleRate);
console.log(gainSin);

//INIZIALIZZAZIONE//
sliderGainSin.value = 0.1;
gainSin.gain.value = parseFloat(sliderGainSin.value);
valueSin.innerHTML = parseFloat( sliderGainSin.value).toFixed(2);

sliderGainFm.value = 0.1;
gainFm.gain.value = parseFloat(sliderGainFm.value);
valueFm.innerHTML = parseFloat(sliderGainFm.value).toFixed(2);

sliderGainAm.value = 0.1;
gainAm.gain.value = parseFloat(sliderGainAm.value);
valueAm.innerHTML = parseFloat(sliderGainAm.value).toFixed(2);

sliderMasterGain.value = 1;
gainMaster.gain.value = parseFloat(sliderMasterGain.value);
valueMaster.innerHTML = parseFloat(sliderMasterGain.value).toFixed(2);

//INTERAZIONE//
// function startDsp(){
//   if (dsp.state == "suspended") {
//     dsp.resume();
//     btnStartDsp.innerHTML = "Stop audio";
//   } else {
//     dsp.suspend();
//     btnStartDsp.innerHTML = "Start audio";
//   }
// }

console.log(dsp)

function startOsc(){
    const attackTime = 1;
    const decayTime = 1;
    const osc = dsp.createOscillator(); //funzione che da come risultato un oscillatore, osc viene riempita dall'informazione
    const gain = dsp.createGain();
    gain.gain.setValueAtTime(0,dsp.currentTime);
    gain.gain.linearRampToValueAtTime(1, dsp.currentTime + attackTime);
    gain.gain.linearRampToValueAtTime(0, dsp.currentTime + attackTime + decayTime);
    osc.connect(gain);
    gain.connect(gainSin);
    gainSin.connect(gainMaster);
    osc.start();
}

function getRndFreq(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function startFm(){
  const attackTime = 1;
  const decayTime = 1;
  //portante
  const oscP = dsp.createOscillator(); //portante
  oscP.type = "sine";
  oscP.frequency.value = getRndFreq(200, 2000);

  //modulante
  const oscM = dsp.createOscillator(); //modulante
  const gainMod = dsp.createGain();
  gainMod.gain.value = 10;
  oscM.frequency.value = 5;
  oscM.connect(gainMod);

  gainMod.connect(oscP.frequency);
  //setTimeOut

  const gain = dsp.createGain();
  gain.gain.setValueAtTime(0, dsp.currentTime);
  gain.gain.linearRampToValueAtTime(1, dsp.currentTime + attackTime);
  gain.gain.linearRampToValueAtTime(0, dsp.currentTime + attackTime + decayTime);
  oscP.connect(gain);
  gain.connect(gainFm);
  gainFm.connect(gainMaster);
  oscP.start();
  oscM.start();
  oscPlaying = true;
}

function startAm(){
  const attackTime = 1;
  const decayTime = 1;
  //portante
  const oscP = dsp.createOscillator(); //portante
  oscP.type = "sine";
  oscP.frequency.value = 440;

  //modulante
  const oscM = dsp.createOscillator(); //modulante
  const gainMod = dsp.createGain();
  gainMod.gain.value = 3;
  oscM.frequency.value = 1;
  oscM.connect(gainMod);

  const gain = dsp.createGain();
  gainMod.connect(gain.gain);
  gain.gain.setValueAtTime(0, dsp.currentTime);
  gain.gain.linearRampToValueAtTime(1, dsp.currentTime + attackTime);
  gain.gain.linearRampToValueAtTime(0, dsp.currentTime + attackTime + decayTime);
  
  oscP.connect(gain);
  gain.connect(gainAm);
  gainAm.connect(gainMaster);
  oscP.start();
  oscM.start();
  oscPlaying = true;
}

sliderGainSin.addEventListener("input", () => {
  valueSin.innerHTML = parseFloat(sliderGainSin.value).toFixed(2);
  gainSin.gain.linearRampToValueAtTime(sliderGainSin.value, dsp.currentTime + 0.1); 
})

sliderGainFm.addEventListener("input", () => {
  valueFm.innerHTML = parseFloat(sliderGainFm.value).toFixed(2);
  gainFm.gain.linearRampToValueAtTime(sliderGainFm.value, dsp.currentTime + 0.1);
})

sliderGainAm.addEventListener("input", () => {
  valueAm.innerHTML = parseFloat(sliderGainAm.value).toFixed(2);
  gainAm.gain.linearRampToValueAtTime(sliderGainAm.value, dsp.currentTime + 0.1);
})

sliderMasterGain.addEventListener("input", () => {
  valueMaster.innerHTML = parseFloat(sliderMasterGain.value).toFixed(2);
  gainMaster.gain.linearRampToValueAtTime(sliderMasterGain.value, dsp.currentTime + 0.1);
})
