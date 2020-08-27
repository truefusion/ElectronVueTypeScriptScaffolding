import platform from '../detect/platform';
import fileMenu from './file-menu';


// https://github.com/Automattic/simplenote-electron/blob/develop/desktop/menus/index.js


function createMenuTemplate(settings) {
  const windowMenu = {
    role: 'window',
    submenu: [
      { role: 'minimize' },
      { role: 'close' },
      { type: 'separator' },
      { role: 'front' },
    ]
  };

  return [
  //  platform.isOS() ? macAppMenu : null,
    fileMenu,
  ].filter((menu) => menu !== null);

}

export default {
  createMenuTemplate,
}
