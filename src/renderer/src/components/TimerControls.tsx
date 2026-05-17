import { useTimerStore } from '../stores/timerStore'
import { useSettingsStore } from '../stores/settingsStore'
import { getPhaseDuration, getNextPhase } from '../utils/phases'

export function TimerControls() {
  const { isRunning, phase, pomodoroCount } = useTimerStore()
  const settings = useSettingsStore()
  const { start, pause, reset, skip } = useTimerStore()

  const duration = getPhaseDuration(phase, settings)

  function handleStart() {
    start(duration)
  }

  function handlePause() {
    pause()
  }

  function handleReset() {
    reset(duration)
  }

  function handleSkip() {
    const nextPhase = getNextPhase(phase, pomodoroCount, settings)
    const nextDuration = getPhaseDuration(nextPhase, settings)
    skip(nextDuration, nextPhase)
  }

  return (
    <div className="timer-controls">
      <button className="btn-primary" onClick={isRunning ? handlePause : handleStart}>
        {isRunning ? '暂停' : '开始'}
      </button>
      <button className="btn-secondary" onClick={handleSkip}>跳过</button>
      <button className="btn-secondary" onClick={handleReset}>重置</button>
    </div>
  )
}