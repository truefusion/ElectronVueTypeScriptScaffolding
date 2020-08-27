import { app } from 'electron';

import { appCommandSender } from './utils.js';

// https://github.com/Automattic/simplenote-electron/blob/develop/desktop/menus/menu-items.js


const about = {
  label: '&About ' + app.name,
  click: appCommandSender({
    action: 'showDialog',
    dialog: 'ABOUT',
  }),
};

const preferences = {
  label: 'P&references...',
  accelerator: 'CommandOrControl+,',
  click: appCommandSender({
    action: 'showDialog',
    dialog:'SETTINGS',
  }),
};

//const checkForUpdates = {
//  label: '&Check for Updates...',
//  click: update.pingAndShowProgress.bind(updater),
//};

export default {
  about,
  preferences,
  //checkForUpdates,
}
