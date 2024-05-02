const {app, BrowserWindow, ipcMain} = require('electron/main')
const path = require('node:path')
const fs = require('node:fs')
const https = require('https')

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        icon: path.join(__dirname, '../../public/qe.ico'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    win.loadFile(path.join(__dirname, 'index.html'))
}

const userDataPath = app.getPath('userData');
const iconName = path.join(__dirname, 'iconForDragAndDrop.png')
const icon = fs.createWriteStream(iconName)


https.get('https://img.icons8.com/ios/452/drag-and-drop.png', (response) => {
    response.pipe(icon)
})


app.whenReady().then(createWindow)

ipcMain.handle('ondragstart', async (event, filePath) => {
    const targetFilePath = path.join(userDataPath, filePath);
    fs.writeFileSync(targetFilePath, '# This is a sample file for drag and drop testing.');
    event.sender.startDrag({
        file: targetFilePath,
        icon: iconName
    });
    return targetFilePath
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})
