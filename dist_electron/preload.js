// https://stackoverflow.com/questions/57807459/how-to-use-preload-js-properly-in-electron

const {
    contextBridge,
    ipcRenderer
} = require("electron");

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
    "api", {
        send: (channel, data) => {
            // whitelist channels
            let validChannels = ["toMain"];
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, data);
            }
        },
        receive: (channel, func) => {
            let validChannels = ["fromMain"];
            if (validChannels.includes(channel)) {
                // Deliberately strip event as it includes `sender` 
                ipcRenderer.on(channel, (event, ...args) => func(...args));
            }
        }
    }
);


// https://nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration

// https://nklayman.github.io/vue-cli-plugin-electron-builder/guide/guide.html#examples

//import { ipcRenderer } from 'electron'
window.ipcRenderer = ipcRenderer
