const { contextBridge } = require('electron');
const onKeyPressed = require('./logic/calculator');

contextBridge.exposeInMainWorld(
  'electron',
  {
    onKeyPressed,
  },
);
