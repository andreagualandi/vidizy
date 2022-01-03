// Modules to control application life and create native browser window
const { app, BrowserWindow, protocol } = require('electron');
const path = require('path');
const serve = require('electron-serve');
const loadUrl = serve({ directory: 'public' });

require('./src/backend/index');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function isDev() {
    return !app.isPackaged;
}

function fileHandler(request, callback) {
    const url = request.url.replace(/^local-video:\/\//, '')
    // Decode URL to prevent errors when loading filenames with UTF-8 chars or chars like "#"
    const decodedUrl = decodeURI(url) // Needed in case URL contains spaces
    try {
        return callback(decodedUrl)
    } catch (error) {
        console.error(
            'ERROR: registerLocalVideoProtocol: Could not get file path:',
            error
        )
    }
}

function createWindow() {
    protocol.registerFileProtocol('local-video', fileHandler);
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 1024,
        height: 768,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js'),
        },
        //icon: path.join(__dirname, 'public/favicon.png'),
        show: false
    });



    if (isDev()) {
        mainWindow.loadURL(`http://localhost:8080`);
        mainWindow.webContents.openDevTools();
    } else {
        loadUrl(mainWindow);
    }

    // Open the DevTools and also disable Electron Security Warning.
    // process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = true;

    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    });

    // Emitted when the window is ready to be shown
    // This helps in showing the window gracefully.
    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
    });

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function() {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') app.quit()
});

app.on('activate', function() {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) createWindow()
});
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.