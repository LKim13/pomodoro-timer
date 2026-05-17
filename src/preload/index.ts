import { contextBridge, ipcRenderer } from 'electron'
import { IPC_CHANNELS } from '../shared/types'

const api = {
  getSettings: () => ipcRenderer.invoke(IPC_CHANNELS.GET_SETTINGS),
  updateSettings: (settings: Record<string, unknown>) => ipcRenderer.invoke(IPC_CHANNELS.UPDATE_SETTINGS, settings),
  getStatistics: (from: string, to: string) => ipcRenderer.invoke(IPC_CHANNELS.GET_STATISTICS, from, to),
  recordPomodoro: (task: string) => ipcRenderer.invoke(IPC_CHANNELS.RECORD_POMODORO, task),
  sendNotification: (title: string, body: string) => ipcRenderer.invoke(IPC_CHANNELS.SEND_NOTIFICATION, title, body),
  updateTrayTooltip: (text: string) => ipcRenderer.send(IPC_CHANNELS.UPDATE_TRAY_TOOLTIP, text)
}

contextBridge.exposeInMainWorld('api', api)