const { contextBridge } = require('electron');
const onKeyPressed = require('./logic/keyMediator');

contextBridge.exposeInMainWorld(
  'electron',
  {
    onKeyPressed,
  },
);
