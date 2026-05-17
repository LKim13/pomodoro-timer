import { create } from 'zustand'
import type { DayStats, StatisticsMap } from '../types/timer'

interface StatsStore {
  todayCount: number
  todayMinutes: number
  history: StatisticsMap
  loadHistory: (from: string, to: string) => Promise<void>
  recordPomodoro: (task: string, minutes: number) => Promise<void>
  refreshToday: () => Promise<void>
}

export const useStatsStore = create<StatsStore>((set) => ({
  todayCount: 0,
  todayMinutes: 0,
  history: {},

  loadHistory: async (from, to) => {
    const history = await window.api.getStatistics(from, to)
    const today = new Date().toISOString().slice(0, 10)
    const todayStats: DayStats = history[today] || { completedPomodoros: 0, totalWorkMinutes: 0, tasks: [] }
    set({
      history,
      todayCount: todayStats.completedPomodoros,
      todayMinutes: todayStats.totalWorkMinutes
    })
  },

  recordPomodoro: async (task, minutes) => {
    await window.api.recordPomodoro(task)
    set((state) => ({
      todayCount: state.todayCount + 1,
      todayMinutes: state.todayMinutes + minutes
    }))
  },

  refreshToday: async () => {
    const today = new Date().toISOString().slice(0, 10)
    const from = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)
    await useStatsStore.getState().loadHistory(from, today)
  }
}))