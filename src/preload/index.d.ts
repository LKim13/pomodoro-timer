declare global {
  interface Window {
    api: {
      getSettings(): Promise<{ workDuration: number; shortBreakDuration: number; longBreakDuration: number; soundEnabled: boolean; autoStartBreak: boolean; autoStartWork: boolean; longBreakInterval: number }>
      updateSettings(settings: Record<string, unknown>): Promise<void>
      getStatistics(from: string, to: string): Promise<Record<string, { completedPomodoros: number; totalWorkMinutes: number; tasks: string[] }>>
      recordPomodoro(task: string): Promise<void>
      sendNotification(title: string, body: string): Promise<void>
      updateTrayTooltip(text: string): void
    }
  }
}

export {}