/*
 * @Author: Lollipope
 * @Date: 2025-05-09 15:56:22
 * @LastEditors: Lollipope
 * @LastEditTime: 2025-05-16 11:34:52
 * @FilePath: \leatop-cdp-alarm\packages\alarm-helper\lib\tool\Speech.ts
 * @Description: 语音相关函数类
 */
import audioUrl from './ring.mp3'
const audio = new Audio()
audio.src = audioUrl // './ring.mp3'

function startSpeakAudio() {
  cancelSpeakAudio()
  audio.play()
}
function cancelSpeakAudio() {
  audio.currentTime = 0
  audio.pause()
}

const ss = window.speechSynthesis
function startSpeakText(text: string) {
  cancelSpeakText()
  // 把文字念出来
  ss?.speak(new SpeechSynthesisUtterance(text))
}

function cancelSpeakText() {
  ss?.cancel()
}

export default {
  startSpeakAudio, // 播放音频
  cancelSpeakAudio, // 取消音频播放
  startSpeakText, //
  cancelSpeakText, //
}
