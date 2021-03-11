const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld(
  'electron',
  {
    onKeyPressed: (keyId) => {
      console.log('Pressed Key', keyId);
    },
  },
);
