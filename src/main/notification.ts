import { Notification, app, nativeImage } from 'electron'
import { join } from 'path'

export function sendNotification(title: string, body: string): void {
  const iconPath = join(__dirname, '../../resources/icon.png')
  const icon = nativeImage.createFromPath(iconPath)

  const notification = new Notification({
    title,
    body,
    icon: icon.resize({ width: 64, height: 64 })
  })
  notification.show()
}

export function initNotifications(): void {
  app.setAppUserModelId('com.pomodoro-timer.app')
}