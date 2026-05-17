import { useEffect, useRef } from 'react'
import { useTimerStore } from '../stores/timerStore'
import { useSettingsStore } from '../stores/settingsStore'
import { useStatsStore } from '../stores/statsStore'
import { PHASE_LABELS } from '../types/timer'

export function useTimer() {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const { phase, timeRemaining, totalDuration, isRunning, pomodoroCount, currentTask, tick, completePhase } = useTimerStore()
  const settings = useSettingsStore()
  const stats = useStatsStore()

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        tick()
      }, 100)
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning, tick])

  // 检测计时完成
  useEffect(() => {
    if (timeRemaining <= 0 && !isRunning && totalDuration > 0) {
      const nextPhase = completePhase({
        workDuration: settings.workDuration,
        shortBreakDuration: settings.shortBreakDuration,
        longBreakDuration: settings.longBreakDuration,
        longBreakInterval: settings.longBreakInterval,
        autoStartBreak: settings.autoStartBreak,
        autoStartWork: settings.autoStartWork
      })

      // 记录番茄完成
      if (phase === 'work') {
        stats.recordPomodoro(currentTask, settings.workDuration)
      }

      // 发送通知
      const title = phase === 'work' ? '专注完成' : '休息结束'
      const body = phase === 'work' ? '完成了一个番茄钟！休息一下吧' : '准备好开始新的专注了吗？'
      window.api.sendNotification(title, body)

      // 更新托盘提示
      window.api.updateTrayTooltip(`番茄钟 - ${PHASE_LABELS[nextPhase]}`)
    }
  }, [timeRemaining, isRunning])

  // 启动时更新托盘提示
  useEffect(() => {
    if (isRunning) {
      window.api.updateTrayTooltip(`番茄钟 - ${PHASE_LABELS[phase]} ${formatTime(timeRemaining)}`)
    }
  }, [timeRemaining, isRunning, phase])

  function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  return { phase, timeRemaining, totalDuration, isRunning, pomodoroCount, currentTask }
}