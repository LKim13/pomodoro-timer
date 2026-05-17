import { ipcMain } from 'electron'
import { IPC_CHANNELS } from '../shared/types'
import { getSettings, updateSettings, getStatistics, recordPomodoro } from './store'
import { sendNotification } from './notification'
import { updateTrayTooltip } from './tray'

export function registerIpcHandlers(): void {
  ipcMain.handle(IPC_CHANNELS.GET_SETTINGS, () => getSettings())

  ipcMain.handle(IPC_CHANNELS.UPDATE_SETTINGS, (_e, settings) => {
    updateSettings(settings)
  })

  ipcMain.handle(IPC_CHANNELS.GET_STATISTICS, (_e, from, to) => {
    return getStatistics(from, to)
  })

  ipcMain.handle(IPC_CHANNELS.RECORD_POMODORO, (_e, task) => {
    recordPomodoro(task)
  })

  ipcMain.handle(IPC_CHANNELS.SEND_NOTIFICATION, (_e, title, body) => {
    sendNotification(title, body)
  })

  ipcMain.on(IPC_CHANNELS.UPDATE_TRAY_TOOLTIP, (_e, text) => {
    updateTrayTooltip(text)
  })
}