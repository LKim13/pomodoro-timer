import { Tray, Menu, nativeImage, app } from 'electron'
import { join } from 'path'
import { showMainWindow } from './windows'

let tray: Tray | null = null

export function createTray(): Tray {
  const iconPath = join(__dirname, '../../resources/icon.png')
  const icon = nativeImage.createFromPath(iconPath)

  tray = new Tray(icon.resize({ width: 16, height: 16 }))
  tray.setToolTip('番茄钟')

  const contextMenu = Menu.buildFromTemplate([
    { label: '显示窗口', click: showMainWindow },
    { type: 'separator' },
    { label: '退出', click: () => { app.isQuitting = true; app.quit() } }
  ])

  tray.setContextMenu(contextMenu)
  tray.on('click', showMainWindow)

  return tray
}

export function updateTrayTooltip(text: string): void {
  if (tray) {
    tray.setToolTip(text)
  }
}