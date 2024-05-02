const {app, BrowserWindow} = require('electron');
const path = require('node:path');
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
let icon = path.join(__dirname, '../../public/qe.ico');
if (require('electron-squirrel-startup')) {
    app.quit();
}
app.commandLine.appendSwitch("enable-web-bluetooth", true);
let mainWindow, selectBluetoothCallback;
const createWindow = () => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        icon: icon,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js'),
        },
    });
    mainWindow.webContents.openDevTools({mode: 'bottom'})
    mainWindow.webContents.session.setBluetoothPairingHandler((details, callback) => {
        bluetoothPinCallback = callback
        // Send a message to the renderer to prompt the user to confirm the pairing

        mainWindow.webContents.send('bluetooth-pairing-request', details)
    })
    mainWindow.loadFile(path.join(__dirname, 'index.html'));
    mainWindow.webContents.on(
        'select-bluetooth-device',
        async (event, deviceList, callback) => {
            event.preventDefault()
            selectBluetoothCallback = callback
            const result =  deviceList[0]
            console.log(result)

            if (result) {
                    callback(result.deviceId)
            } else {
                // The device wasn't found so we need to either wait longer (eg until the
                // device is turned on) or until the user cancels the request
            }
        }
    )

};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    createWindow();

    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
