import { useRef, useEffect } from 'react'
import { useSettingsStore } from '../stores/settingsStore'
import { useTimerStore } from '../stores/timerStore'

export function SoundPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const { soundEnabled } = useSettingsStore()
  const { timeRemaining, isRunning, totalDuration } = useTimerStore()

  const prevTimeRemaining = useRef(totalDuration)

  useEffect(() => {
    // 计时完成时播放提示音
    if (timeRemaining <= 0 && prevTimeRemaining.current > 0 && soundEnabled && audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(() => {})
    }
    prevTimeRemaining.current = timeRemaining
  }, [timeRemaining, soundEnabled])

  return (
    <audio
      ref={audioRef}
      src="sound://notification.wav"
      preload="auto"
      style={{ display: 'none' }}
    />
  )
}