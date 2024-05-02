const {app, BrowserWindow, Notification, ipcMain} = require('electron');
const path = require('node:path');
app.setAppUserModelId('qe617');

if (require('electron-squirrel-startup')) {
    app.quit();
}

const createWindow = () => {

    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        icon: path.join(__dirname, '../../public/qe.ico'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });
    mainWindow.loadFile(path.join(__dirname, 'index.html'));

};
ipcMain.on('notification', (event, {title, body}) => {
    const notification = new Notification({
        title,
        body,
        type: 'info',
        icon: path.join(__dirname, './qe.ico'),
    });
    notification.show();
})


app.whenReady().then(() => {
    createWindow();


    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});



