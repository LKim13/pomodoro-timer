import type { Phase, Settings } from '../types/timer'

export function getPhaseDuration(phase: Phase, settings: Settings): number {
  switch (phase) {
    case 'work': return settings.workDuration * 60
    case 'shortBreak': return settings.shortBreakDuration * 60
    case 'longBreak': return settings.longBreakDuration * 60
  }
}

export function getNextPhase(currentPhase: Phase, pomodoroCount: number, settings: Settings): Phase {
  if (currentPhase === 'work') {
    if (pomodoroCount % settings.longBreakInterval === 0) {
      return 'longBreak'
    }
    return 'shortBreak'
  }
  return 'work'
}