// https://github.com/getferdi/ferdi/blob/develop/src/electron/ipc-api/index.js

import autoUpdate from './autoUpdate';
import settings from './settings';
import download from './download';

export default (params) => {
  settings(params);
  autoUpdate(params);
  download(params);
  processManager(params);
};
