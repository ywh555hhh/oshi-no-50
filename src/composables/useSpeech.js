import { ref } from 'vue'

export function useSpeech() {
  const playing = ref(null)

  function speak(text, id) {
    if (playing.value === id) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'ja-JP'
    utterance.rate = 0.8
    utterance.pitch = 1
    // 尝试使用日语语音
    const voices = window.speechSynthesis.getVoices()
    const jpVoice = voices.find(v => v.lang.startsWith('ja'))
    if (jpVoice) utterance.voice = jpVoice

    playing.value = id
    utterance.onend = () => { playing.value = null }
    utterance.onerror = () => { playing.value = null }
    window.speechSynthesis.speak(utterance)
  }

  return { speak, playing }
}
