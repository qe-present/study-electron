const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const fs = require('fs')


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
const iconName = path.join(__dirname, '../public/qe.png')

// Create a new file to copy - you can also copy existing files.
fs.writeFileSync(path.join(__dirname, '文件1.md'), '# 文件1 - 用于测试拖拽功能')
fs.writeFileSync(path.join(__dirname, '文件2.md'), '# 文件2 - 用于测试拖拽功能')

ipcMain.on('start-drag', (event, filePath) => {
        event.sender.startDrag({
            file: path.join(__dirname, filePath),
            icon: iconName
        })

    }
)
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



