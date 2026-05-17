import { useTimerStore } from '../stores/timerStore'
import { useSettingsStore } from '../stores/settingsStore'

export function DailyProgress() {
  const { pomodoroCount } = useTimerStore()
  const { longBreakInterval } = useSettingsStore()

  const currentInCycle = pomodoroCount % longBreakInterval || (pomodoroCount > 0 ? longBreakInterval : 0)

  return (
    <div className="daily-progress">
      {pomodoroCount > 0 ? (
        <span className="progress-badge">
          今日: {pomodoroCount} 个 | 第 {currentInCycle}/{longBreakInterval} 轮
        </span>
      ) : (
        <span className="progress-badge-empty">准备开始第一个番茄</span>
      )}
    </div>
  )
}