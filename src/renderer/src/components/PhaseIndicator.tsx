import { useTimerStore } from '../stores/timerStore'
import { useSettingsStore } from '../stores/settingsStore'

export function PhaseIndicator() {
  const { pomodoroCount, phase } = useTimerStore()
  const { longBreakInterval } = useSettingsStore()

  const completedWorkSessions = phase === 'work' ? pomodoroCount : pomodoroCount
  const currentInCycle = completedWorkSessions % longBreakInterval || longBreakInterval

  return (
    <div className="phase-indicator">
      {Array.from({ length: longBreakInterval }, (_, i) => {
        const index = i + 1
        const isCompleted = index <= currentInCycle - 1 && completedWorkSessions > 0
        const isCurrent = index === currentInCycle && (phase === 'work' || (phase !== 'work' && index <= currentInCycle))

        return (
          <div
            key={index}
            className={`phase-dot ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}`}
          />
        )
      })}
    </div>
  )
}