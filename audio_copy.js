const dsp = new AudioContext();
let masterGain = dsp.createGain();
let osc; //inizializzo la variabile fuori dalla funzione, ovvero GLOBALE
const btnConta = document.getElementById("counter");
const btnStartDsp = document.getElementById("startDsp");
const btnResetta = document.getElementById("resetCounter");
const valNumero = document.getElementById("numero");
const slider = document.getElementById("slider");
const sliderValue = document.getElementById("sliderValue");
const startOscillator = document.getElementById("startOsc");
masterGain.gain.value = slider.value;
console.log(dsp.sampleRate);
console.log(osc);

//INIZIALIZZAZIONE//
slider.value = 0.1;
masterGain.gain.value = parseFloat(slider.value);
sliderValue.innerHTML = parseFloat(slider.value).toFixed(2);

//INTERAZIONE//
function startDsp(){
  if (dsp.state == "suspended") {
    dsp.resume();
    btnStartDsp.innerHTML = "Stop audio";
  } else {
    dsp.suspend();
    btnStartDsp.innerHTML = "Start audio";
  }
}

console.log(dsp)

function startOsc(){
    const attackTime = 1;
    const decayTime = 1;
    osc = dsp.createOscillator(); //funzione che da come risultato un oscillatore, osc viene riempita dall'informazione
    const gain = dsp.createGain();
    gain.gain.setValueAtTime(0,dsp.currentTime);
    gain.gain.linearRampToValueAtTime(1, dsp.currentTime + attackTime);
    gain.gain.linearRampToValueAtTime(0, dsp.currentTime + attackTime + decayTime);
    osc.connect(gain);
    gain.connect(masterGain);
    masterGain.connect(dsp.destination);
    osc.start();
    oscPlaying = true;
}

function startFm(){
  const attackTime = 1;
  const decayTime = 1;
  //portante
  const oscP = dsp.createOscillator(); //portante
  oscP.type = "sine";
  oscP.frequency.value = 440;

  //modulante
  const oscM = dsp.createOscillator(); //modulante
  const gainMod = dsp.createGain();
  gainMod.gain.value = 10;
  oscM.frequency.value = 5;
  oscM.connect(gainMod);

  gainMod.connect(oscP.frequency);
  //setTimeOut

  const gain = dsp.createGain();
  gain.gain.setValueAtTime(0,dsp.currentTime);
  gain.gain.linearRampToValueAtTime(1, dsp.currentTime + attackTime);
  gain.gain.linearRampToValueAtTime(0, dsp.currentTime + attackTime + decayTime);
  oscP.connect(gain);
  gain.connect(masterGain);
  masterGain.connect(dsp.destination);
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

  gainMod.connect(gain.gain);


  const gain = dsp.createGain();
  gain.gain.setValueAtTime(0,dsp.currentTime);
  gain.gain.linearRampToValueAtTime(1, dsp.currentTime + attackTime);
  gain.gain.linearRampToValueAtTime(0, dsp.currentTime + attackTime + decayTime);
  oscP.connect(gain);
  gain.connect(masterGain);
  masterGain.connect(dsp.destination);
  oscP.start();
  oscM.start();
  oscPlaying = true;
}

let a = 0;

btnConta.addEventListener("click", function conta(){ //noi come argomento della funzione addEventListener usiamo la funzione stessa
  if (a == 10) { //quando il counter raggiunge 10 si resetta
    a = 0;
  } else {
    a += 1;
  };
  valNumero.innerHTML = a;
});


btnResetta.addEventListener("click", () => {
  a = 0;
  valNumero.innerHTML = a;
});

slider.addEventListener("input", () => {
  sliderValue.innerHTML = parseFloat(slider.value).toFixed(2);
  masterGain.gain.value = slider.value;
})


