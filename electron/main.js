const {app, BrowserWindow} = require('electron');
let win;

function createWindow() {
  const devMode = process.mainModule.filename.indexOf('app.asar') === -1;
  win = new BrowserWindow({
    width: devMode ? 800 : 245,
    height: devMode ? 800 : 96,
    alwaysOnTop: true,
    autoHideMenuBar: true,
    maximizable: false,
    frame: devMode,
    transparent: true,
    resizable: devMode
  });

  win.loadFile('app/index.html');

  if (devMode) {
    win.webContents.openDevTools();
  }

  win.on('closed', function () {
    win = null
  })
}

app.on('ready', createWindow);
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});
app.on('activate', function () {
  if (win === null) {
    createWindow()
  }
});
