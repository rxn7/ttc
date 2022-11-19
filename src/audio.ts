const winAudio: HTMLAudioElement = new Audio('res/win.wav')
const tieAudio: HTMLAudioElement = new Audio('res/tie.wav')

export const playWinAudio = () => winAudio.play()
export const playTieAudio = () => tieAudio.play()

export function playClickAudio() {
    const audio: HTMLAudioElement = new Audio('res/pop.wav')
    audio.loop = false
    audio.play()
}

winAudio.loop = false
tieAudio.loop = false
