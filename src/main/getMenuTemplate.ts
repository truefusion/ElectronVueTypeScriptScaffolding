import { remote, app, shell, BrowserWindow, ipcMain, globalShortcut, dialog } from 'electron'

import fs from 'fs'

import imgToText from "@/services/electron-services/img_to_text/img_to_text"


const isMac = process.platform === 'darwin'

function get_extension(fullPath: string): string {
  let filenameWithExtension, extension: string;
  filenameWithExtension = fullPath.substring(fullPath.lastIndexOf('/')+1);
  extension = filenameWithExtension.substring(filenameWithExtension.lastIndexOf('.') + 1);
  if (!extension) return ""
  return extension
}

let imgExtensionsArray: Array<string> = ['jpg', 'jpeg', 'bmp', 'png', 'jfif', 'tiff', 'ppm', 'pgm', 'pnm']

async function loadFile() {
  dialog.showOpenDialog({
    message: "Select document",
    properties: ['openFile', 'multiSelections'],
    filters: [
      { name: 'PDF files', extensions: ['pdf'] },
      { name: 'Text files', extensions: ['txt'] },
      { name: 'Doc files', extensions: ['doc', 'docx'] },
      { name: 'Image files', extensions: imgExtensionsArray },
    ],
  }).then(result => {
    console.log(result.filePaths);
    result.filePaths.forEach((filepath: string) => {
      let extension: string = get_extension(filepath);
      console.log(extension);
      if(imgExtensionsArray.includes(extension)) {
        console.log("file di immagine");
        imgToText(filepath);
      }
    })
  }).catch(err => {
    console.log(err)
  })
}

const getMenuTemplate = (win: BrowserWindow): $TSFixed => {
    return [
     // App
     ...(isMac
        ? [
            {
              label: app.getName(),
              submenu: [
                {
                  label: 'About GGC',
                  click: () => {
                    win.webContents.send('about')
                  },
                },
                { type: 'separator' },
                {
                  label: 'Preferences',
                  accelerator: 'cmd + ,',
                  click: () => {
                    win.webContents.send('preferences')
                  },
                },
                { type: 'separator' },
                { role: 'hide' },
                { role: 'hideothers' },
                { role: 'unhide' },
                { type: 'separator' },
                { role: 'quit' },
              ],
            },
          ]
        : []), 
      // File
      {
          label: 'File',
          submenu: [
            isMac ? { role: 'close'} : { role: 'quit'},
            {
              label: 'Open',
              accelerator: 'CommandOrControl+O',
              click() {
                loadFile()
              }
            }
          ],
      },
      // EditMenu
      {
          label: 'Edit',
          submenu: [
            { role: 'undo' },
            { role: 'redo' },
            { type: 'separator' },
            { role: 'cut' },
            { role: 'copy' },
            { role: 'paste' },
            ...(isMac
              ? [
                  { role: 'pasteAndMatchStyle' },
                  { role: 'delete' },
                  { role: 'selectAll' },
                  { type: 'separator' },
                  {
                    label: 'Speech',
                    submenu: [{ role: 'startspeaking' }, { role: 'stopspeaking' }],
                  },
                ]
              : [{ role: 'delete' }, { type: 'separator' }, { role: 'selectAll' }]),            
          ]
      },
      // windowMenu
      {
          label: 'Window',
          submenu: [
              { role: 'minimize'},
              { role: 'zoom'},
              ...(isMac
                ? [
                    { type: 'separator' },
                    { role: 'front' },
                    { type: 'separator' },
                    { role: 'window' },
                  ]
                : [{ role: 'close' }]),
          ]
      },
      // User Status
      {
          role: 'help',
          submenu: [
              {
                  label: 'Lean more about GGC',
                  click: async () => {
                  },
              }
          ]

      },

    ]
}


export default getMenuTemplate
