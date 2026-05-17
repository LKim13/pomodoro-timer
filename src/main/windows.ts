import { BrowserWindow, Menu, app } from 'electron'
import { join } from 'path'

let mainWindow: BrowserWindow | null = null

export function createMainWindow(): BrowserWindow {
  mainWindow = new BrowserWindow({
    width: 420,
    height: 560,
    minWidth: 380,
    minHeight: 500,
    resizable: true,
    title: '番茄钟',
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: join(__dirname, '../preload/index.js')
    }
  })

  Menu.setApplicationMenu(null)

  const rendererUrl = process.env['ELECTRON_RENDERER_URL']
  if (rendererUrl) {
    mainWindow.loadURL(rendererUrl)
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  mainWindow.on('close', (e) => {
    if (!app.isQuitting) {
      e.preventDefault()
      mainWindow!.hide()
    }
  })

  return mainWindow
}

export function getMainWindow(): BrowserWindow | null {
  return mainWindow
}

export function showMainWindow(): void {
  if (mainWindow) {
    mainWindow.show()
    mainWindow.focus()
  }
}