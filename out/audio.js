const winAudio = new Audio('res/win.wav');
const tieAudio = new Audio('res/tie.wav');
export const playWinAudio = () => winAudio.play();
export const playTieAudio = () => winAudio.play();
export function playClickAudio() {
    const audio = new Audio('res/pop.wav');
    audio.loop = false;
    audio.play();
}
winAudio.loop = false;
tieAudio.loop = false;
