import Store from 'electron-store'
import type { Settings, DayStats, StatisticsMap } from '../shared/types'
import { DEFAULT_SETTINGS } from '../shared/types'

interface PomodoroSchema {
  settings: Settings
  statistics: StatisticsMap
}

const store = new Store<PomodoroSchema>({
  defaults: {
    settings: DEFAULT_SETTINGS,
    statistics: {}
  }
})

export function getSettings(): Settings {
  return store.get('settings')
}

export function updateSettings(partial: Partial<Settings>): void {
  const current = store.get('settings')
  store.set('settings', { ...current, ...partial })
}

export function getStatistics(from: string, to: string): StatisticsMap {
  const all = store.get('statistics')
  const result: StatisticsMap = {}
  for (const [key, value] of Object.entries(all)) {
    if (key >= from && key <= to) {
      result[key] = value
    }
  }
  return result
}

export function recordPomodoro(task: string): void {
  const today = new Date().toISOString().slice(0, 10)
  const stats = store.get('statistics')
  const dayStats: DayStats = stats[today] || { completedPomodoros: 0, totalWorkMinutes: 0, tasks: [] }
  dayStats.completedPomodoros += 1
  dayStats.totalWorkMinutes += getSettings().workDuration
  if (task) {
    dayStats.tasks.push(task)
  }
  store.set('statistics', { ...stats, [today]: dayStats })
}

export default store