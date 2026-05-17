import { useTimer } from '../hooks/useTimer'
import { formatTime } from '../utils/formatTime'
import { PHASE_LABELS, PHASE_COLORS } from '../types/timer'
import '../styles/timer.css'

export function TimerDisplay() {
  const { phase, timeRemaining, totalDuration } = useTimer()

  const progress = totalDuration > 0 ? (totalDuration - timeRemaining) / totalDuration : 0
  const color = PHASE_COLORS[phase]
  const label = PHASE_LABELS[phase]
  const circumference = 2 * Math.PI * 120
  const offset = circumference * (1 - progress)

  return (
    <div className="timer-display">
      <svg className="timer-ring" viewBox="0 0 260 260">
        <circle
          className="timer-ring-bg"
          cx="130" cy="130" r="120"
          fill="none"
          stroke="#2a2a4a"
          strokeWidth="8"
        />
        <circle
          className="timer-ring-progress"
          cx="130" cy="130" r="120"
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 130 130)"
        />
      </svg>
      <div className="timer-content">
        <span className="timer-time">{formatTime(timeRemaining)}</span>
        <span className="timer-label" style={{ color }}>{label}</span>
      </div>
    </div>
  )
}