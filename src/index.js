const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const isMac = process.platform === 'darwin'

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: "main-images/ciruclarcroppedlogo_1WL_icon.ico"
  });

  const template = [
    // { role: 'fileMenu' }
    {
      label: 'File',
      submenu: [
        { label: 'Open Folder', 
        click: function()
          {
            console.log("Open folder")          
          } 
        },
        { label: 'Open File',
          click: function(){
            console.log("Open file")
          } },
        { label: 'Open Recent', 
          submenu:[
            {label: 'Recentanalysis.itl',
              click: function(){
                console.log("Open recent file")
              }}
          ] },
      ]
    },
    // { role: 'viewMenu' }
    {
      label: 'View',
      submenu: [
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    // { role: 'saveMenu' }
    {
      label: 'Save',
      submenu: [
        { label: 'Save as...',
          click: function(){
            console.log("Save as")
          }},
        { label: 'Save', 
          click: function(){
            console.log("Save")
          }}
      ]
    },
    // { role: 'windowMenu' }
    {
      label: 'Window',
      submenu: [
        { role: 'minimize' },
        { type: 'separator'},        
        { role: 'close' },
        { role: 'reload' }
        ]
    },
    // { role: 'helpMenu' }
    {
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          click: async () => {
            const { shell } = require('electron')
            await shell.openExternal('#AboutUsScreen')
          }
        }
      ]
    }
  ]
  
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'dashboardscreen.html'));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
