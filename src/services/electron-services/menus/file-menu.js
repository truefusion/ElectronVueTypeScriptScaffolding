import menuItems from './menu-items';
import platform from '../detect/platform';
import { appCommandSender } from './utils';

const submenu = [
  {
    label: '&New Collaborative Session',
    accelerator: 'CommandControl+Shift+S',
    click: appCommandSender({
      action:'newCollaborativeSession',
    })
  },
  { type: 'separator' },
  {
    label: '&New Simulation',
    accelerator: 'CommandControl+Shift+I',
    click: appCommandSender({ action: 'newSimulation' }),
  },
  { type: 'separator' },
  {
    label: '&Import Simulations...',
    click: appCommandSender({
      action: 'showDialog',
      dialog: 'IMPORT',
    }),
  },
  {
    label: '&Export Simulations...',
    accelerator: 'CommandOrControl+Shift+E',
    click: appCommandSender({
      action: 'exportZipArchive',
    }),
  },
  { type: 'separator' },
  {
    label: '&Print...',
    accelerator: 'CommandOrControl+P',
    click: appCommandSender({
      action: 'printNote',
    }),
  }
];

const defaultSubmenuAdditions = [
  { type: 'separator' },
  menuItems.preferences,
  { type: 'separator' },
  { role: 'quit' },
];

const fileMenu = {
  label: '&File',
  submenu: (platform.isOSX() || platform.isLinux || platform.isWindows) ? submenu : submenu.concat(defaultSubmenuAdditions),
};

export default {
  fileMenu,
}
