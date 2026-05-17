import { create } from 'zustand'
import type { Phase, TimerState as TState } from '../types/timer'
import { PHASE_LABELS } from '../types/timer'
import { getPhaseDuration, getNextPhase } from '../utils/phases'

interface TimerStore {
  phase: Phase
  timeRemaining: number
  totalDuration: number
  isRunning: boolean
  pomodoroCount: number
  currentTask: string
  startedAt: number | null
  start: (duration: number) => void
  pause: () => void
  reset: (duration: number) => void
  skip: (nextDuration: number, nextPhase: Phase) => void
  tick: () => void
  completePhase: (settings: { workDuration: number; shortBreakDuration: number; longBreakDuration: number; longBreakInterval: number; autoStartBreak: boolean; autoStartWork: boolean }) => Phase
  setCurrentTask: (task: string) => void
}

export const useTimerStore = create<TimerStore>((set, get) => ({
  phase: 'work',
  timeRemaining: 25 * 60,
  totalDuration: 25 * 60,
  isRunning: false,
  pomodoroCount: 0,
  currentTask: '',
  startedAt: null,

  start: (duration) => set({
    isRunning: true,
    startedAt: Date.now(),
    timeRemaining: duration,
    totalDuration: duration
  }),

  pause: () => set({ isRunning: false, startedAt: null }),

  reset: (duration) => set({
    isRunning: false,
    startedAt: null,
    timeRemaining: duration,
    totalDuration: duration
  }),

  skip: (nextDuration, nextPhase) => set({
    phase: nextPhase,
    timeRemaining: nextDuration,
    totalDuration: nextDuration,
    isRunning: false,
    startedAt: null
  }),

  tick: () => {
    const { startedAt, totalDuration, isRunning } = get()
    if (!isRunning || !startedAt) return

    const elapsed = Math.floor((Date.now() - startedAt) / 1000)
    const remaining = Math.max(0, totalDuration - elapsed)

    set({ timeRemaining: remaining })

    if (remaining <= 0) {
      set({ isRunning: false, startedAt: null })
    }
  },

  completePhase: (settings) => {
    const { phase, pomodoroCount } = get()
    let newCount = pomodoroCount

    if (phase === 'work') {
      newCount += 1
    }

    const nextPhase = getNextPhase(phase, newCount, settings)
    const nextDuration = getPhaseDuration(nextPhase, settings)
    const autoStart = nextPhase === 'work' ? settings.autoStartWork : settings.autoStartBreak

    set({
      phase: nextPhase,
      pomodoroCount: newCount,
      timeRemaining: nextDuration,
      totalDuration: nextDuration,
      isRunning: autoStart,
      startedAt: autoStart ? Date.now() : null
    })

    return nextPhase
  },

  setCurrentTask: (task) => set({ currentTask: task })
}))