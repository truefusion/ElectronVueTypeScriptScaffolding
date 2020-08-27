'use strict'

import { app, protocol, BrowserWindow, ipcMain, shell, Menu } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'

const path = require("path")

import db from './services/electron-services/database/index'

import getMenuTemplate from './main/getMenuTemplate'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win: BrowserWindow | null

let menu: Menu | null

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

const isDevelopment: boolean = process.env.NODE_ENV !== 'production'
const isMac: boolean = process.platform === 'darwin'

interface WindowSizeModel {
  width: number,
  height: number,
}

declare const __static: string

function handleIpcMessages() {
  ipcMain.on('setting', (event: any, ...args: any[]) => {
    event.sender.send('setting', ...args)
  })
}

async function createWindow() {
  const windowSize = db.get<WindowSizeModel>('windowSize');
  const theme = db.get<Theme>('settings.currentTheme');
  // Create the browser window.
  win = new BrowserWindow({
    ...windowSize,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      //nodeIntegration: (process.env
      //    .ELECTRON_NODE_INTEGRATION as unknown) as boolean,
      nodeIntegration: false,
      contextIsolation: true, // protects against prototype pollution
      preload: path.join(__dirname, "../dist_electron/preload.js"),
    },
    titleBarStyle: isMac ? 'hidden' : 'default',
    backgroundColor: theme === 'dark' ? '#232323' : '#ffffff',
  })


  // Menu Manager
  const templateMenu = getMenuTemplate(win)
  menu = Menu.buildFromTemplate(templateMenu)
  Menu.setApplicationMenu(menu)

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }


  win.on('closed', () => {
    win = null,
    app.quit()
  })

  

}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (!isMac) {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
  handleIpcMessages()
})

// Disable create new window
app.on("web-contents-created", (event, contents) => {
  contents.on("new-window", async (event, navigationUrl) => {
    // We ask the operating system to open this event's url in the default browser
    event.preventDefault()
    await shell.openExternal(navigationUrl)
  })
})


// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
