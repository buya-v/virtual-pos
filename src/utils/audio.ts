// Simple beep generator using Web Audio API to avoid external assets
const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

export const playBeep = (frequency = 800, duration = 0.1) => {
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }
  
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.type = 'square';
  oscillator.frequency.value = frequency;
  
  gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.start();
  oscillator.stop(audioContext.currentTime + duration);
};

export const playSuccess = () => {
  playBeep(800, 0.1);
  setTimeout(() => playBeep(1200, 0.2), 100);
};

export const playError = () => {
  playBeep(200, 0.2);
  setTimeout(() => playBeep(200, 0.2), 250);
};