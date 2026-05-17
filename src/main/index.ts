import { app } from 'electron'
import { createMainWindow, showMainWindow } from './windows'
import { createTray } from './tray'
import { registerIpcHandlers } from './ipc-handlers'
import { initNotifications } from './notification'
import { registerSoundProtocol } from './sound-protocol'

app.requestSingleInstanceLock()

app.on('second-instance', () => {
  showMainWindow()
})

initNotifications()

app.whenReady().then(() => {
  registerSoundProtocol()
  createMainWindow()
  createTray()
  registerIpcHandlers()
})

app.on('window-all-closed', () => {
  // 不退出，保持托盘运行
})

app.on('before-quit', () => {
  app.isQuitting = true
})