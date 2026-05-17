export type Phase = 'work' | 'shortBreak' | 'longBreak'

export interface Settings {
  workDuration: number
  shortBreakDuration: number
  longBreakDuration: number
  soundEnabled: boolean
  autoStartBreak: boolean
  autoStartWork: boolean
  longBreakInterval: number
}

export const DEFAULT_SETTINGS: Settings = {
  workDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  soundEnabled: true,
  autoStartBreak: false,
  autoStartWork: false,
  longBreakInterval: 4
}

export const PHASE_LABELS: Record<Phase, string> = {
  work: '专注时间',
  shortBreak: '短休息',
  longBreak: '长休息'
}

export const PHASE_COLORS: Record<Phase, string> = {
  work: '#ff4757',
  shortBreak: '#2ed573',
  longBreak: '#1e90ff'
}

export interface DayStats {
  completedPomodoros: number
  totalWorkMinutes: number
  tasks: string[]
}

export type StatisticsMap = Record<string, DayStats>

export interface PomodoroAPI {
  getSettings(): Promise<Settings>
  updateSettings(settings: Partial<Settings>): Promise<void>
  getStatistics(from: string, to: string): Promise<StatisticsMap>
  recordPomodoro(task: string): Promise<void>
  sendNotification(title: string, body: string): Promise<void>
  updateTrayTooltip(text: string): void
}

export const IPC_CHANNELS = {
  GET_SETTINGS: 'store:getSettings',
  UPDATE_SETTINGS: 'store:updateSettings',
  GET_STATISTICS: 'store:getStatistics',
  RECORD_POMODORO: 'store:recordPomodoro',
  SEND_NOTIFICATION: 'timer:notify',
  UPDATE_TRAY_TOOLTIP: 'tray:updateTooltip'
} as const