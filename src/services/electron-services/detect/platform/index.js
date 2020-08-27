// https://github.com/Automattic/simplenote-electron/blob/develop/desktop/detect/platform/index.js

'use strict';

let platform = false;

function Platform() {
  this.platform = false;
}

Platform.prototype.isOSX = () => {
  return process.platform === 'darwin';
}

Platform.prototype.isWindows = () => {
  return process.platform === 'win32';
}

Platform.prototype.isLinux = () => {
  return process.platform === 'linux';
}

if (!platform) {
  platform = new Platform();
}

module.exports = platform;
