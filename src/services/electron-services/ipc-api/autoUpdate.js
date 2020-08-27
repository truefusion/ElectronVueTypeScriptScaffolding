// https://github.com/getferdi/ferdi/blob/develop/src/electron/ipc-api/autoUpdate.js

import { app, ipcMain } from 'electron';
// https://github.com/electron-userland/electron-builder
import { autoUpdater } from 'electron-updater';

export default (params) => {
  // https://www.w3schools.com/JS/js_booleans.asp
  // // https://www.electron.build/auto-update#appupdater-eventemitter
  const enableUpdate = Boolean(params.settings.app.get('automaticUpdates'));

  if (!enableUpdate) {
    autoUpdater.autoInstallOnAppQuit = false;
    autoUpdater.autoDownload = false;
  } else if (process.platform === 'darwin' || process.platform === 'win32' || process.env.APPIMAGE) {
      // https://www.electronjs.org/docs/api/ipc-main
      // https://nodejs.org/api/events.html#events_class_event
      ipcMain.on('autoUpdate', (event, args) => {
        if (enableUpdate) {
          try {
            autoUpdater.autoInstallOnAppQuit = false;
            autoUpdater.allowPrerelease = Boolean(params.settings.app.get('beta'));
            if (args.action === 'check') {
              autoUpdater.checkForUpdates();
            } else if (args.action === 'install') {
                autoUpdater.quitAndInstall();
                // we need to send a quit event
                setTimeout(() => {
                  app.quit();
                }, 20);
            }
          } catch (e) {
            console.error(e);
            // https://www.electronjs.org/docs/api/ipc-main#sending-messages
            event.sender.send('autoUpdate', { error: true });
          }
        }
      });
  }

  // https://www.electron.build/auto-update#events

  autoUpdater.on('update-not-available', () => {
    params.mainWindow.webContents.send('autoUpdate', { available: false });
  });

  autoUpdater.on('update-available', (event) => {
    if (enableUpdate) {
      params.mainWindow.webContents.send('autoUpdate', {
        version: event.version,
        available: true,
      });
    }
  });

  // https://www.electron.build/auto-update#event-download-progress
  autoUpdater.on('download-progress', (progressObj) => {
    let logMessage = `Download speed: ${progressObj.bytesPerSecond}`;
    logMessage = `${logMessage} - Downloaded ${progressObj.percent}%`;
    logMessage = `${logMessage} (${progressObj.transferred}/${progressObj.total})`;
  });

  autoUpdater.on('update-downloaded', () => {
    params.mainWindow.webContents.send('autoUpdate', { downloaded: true });
  });

  autoUpdater.on('error', () => {
    params.mainWindow.webContents.send('autoUpdate', { error: true });
  });

}; // end of export default (params)
