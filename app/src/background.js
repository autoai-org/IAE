'use strict'

import { app, BrowserWindow } from 'electron'
import {
  createProtocol,
  installVueDevtools
} from 'vue-cli-plugin-electron-builder/lib'
import { createMenu } from './services/electron/menu'
import { initListeners } from './services/electron/listeners'

const isDevelopment = process.env.NODE_ENV !== 'production'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.

let win
let loadingScreen
// Standard scheme must be registered before the app is ready
function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      webSecurity: false
    },
    show: false
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')

    // Load the index.html when not in development
    win.loadURL('app://./index.html')
    win.webContents.on('did-finish-load', () => {
      win.show();

      if (loadingScreen) {
        let loadingScreenBounds = loadingScreen.getBounds();
        win.setBounds(loadingScreenBounds);
        loadingScreen.close();
      }
    });
  }
  win.maximize()
  win.on('closed', () => {
    win = null
  })
}

function createLoadingScreen() {
  loadingScreen = new BrowserWindow(Object.assign({
    width: 1000,
    height: 700,
    show: false,
    frame: false
  }, { parent: win }));
  loadingScreen.loadURL('./assets/hosting/loading.html');
  loadingScreen.on('closed', () => loadingScreen = null);
  loadingScreen.webContents.on('did-finish-load', () => {
    loadingScreen.show();
  });
}


// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
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
  createLoadingScreen()
  createMenu()
  initListeners()
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      //await installVueDevtools()
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
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
