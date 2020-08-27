// https://github.com/Automattic/simplenote-electron/blob/develop/desktop/menus/utils.js

appCommandSender = (arg) => {
  return (item, focusedWindow) => {
    if (focusedWindow) {
      focusedWindow.webContents.send('appCommand', arg);
    }
  };
};

buildRadioGroup = ({ action, propName, settings }) => {
  return (item) => {
    const { id, ...props } = item;
    return {
      type: 'radio',
      checked: id === settings[propName],
      click: appCommandSender({
        action,
        [propName]: id,
      }),
      ...props,
    };
  };
};

module.exports = {
  appCommandSender,
  buildRadioGroup,
};
