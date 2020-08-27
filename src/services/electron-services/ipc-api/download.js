// https://github.com/getferdi/ferdi/blob/develop/src/electron/ipc-api/download.js

import { ipcMain, dialog } from 'electron';
import { download } from 'electron-dl';
import mime from 'mime-types';
import fs from 'fs-extra';

function decodeBase64Image (dataString) {
  const matches = dataString.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);

  if (matches.length !== 3) {
    return new Error('Invalid input string');
  }
  // https://www.w3schools.com/nodejs/met_buffer_from.asp
  return Buffer.from(matches[2], 'base64');
}

export default (params) => {
  ipcMain.on('download-file', async (event, { url, content, fileOptions = {} }) => {
    try {
      if (!content) {
        // https://github.com/sindresorhus/electron-dl#use-it-manually
        const dl = await download(params.mainWindow, url, {
          saveAs: true,
        });
        debug('File saved to', dl.savePath);
      } else {
        const extension = mime.extension(fileOptions.mime);
        const filename = `${fileOptions.name}.${extension}`;
          // Page 107 of electron-gitbook-en.pdf
          // On success dialog.showSaveDialog([browserWindow][,options][, callback]) return the p$
          // of the file chosen by the user, otherwise it returns undefined
          // options:
          // title String
          // defaultPath string
          // filters Array

        dialog.showSaveDialog(params.mainWindow, {
          defaultPath: filename,
        }, (name) => {
          const binaryImage = decodeBase64Image(content);
          fs.writeFileSync(name, binaryImage, 'binary');

          debug('File blob saved to', name);
        });
      }
    } catch (e) {
      console.error(e);
    }
  });
};
