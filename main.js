const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const window = new BrowserWindow({
    // width: 320,
    width: 1020,
    height: 600,
    // resizable: false,
    webPreferences: {
      preload: path.join(__dirname, './src/preload.js'),
      nodeIntegration: true,
    },
  });

  window.loadFile('./public/html/index.html');
  window.webContents.openDevTools(); // DEBUG-ONLY
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
