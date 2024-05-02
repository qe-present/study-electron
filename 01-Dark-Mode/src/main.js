const {app, BrowserWindow, ipcMain, nativeTheme} = require('electron/main')
const path = require('node:path')
let icon = path.join(__dirname, '../../public/qe.ico');
if (require('electron-squirrel-startup'))
    app.quit();

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        icon: icon,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    win.loadFile(path.join(__dirname, 'index.html'))
}

ipcMain.handle('toggleTheme', () => {
    if (nativeTheme.shouldUseDarkColors) {
        nativeTheme.themeSource = 'light'
    } else {
        nativeTheme.themeSource = 'dark'
    }
    return nativeTheme.shouldUseDarkColors
})
ipcMain.on('systemTheme', () => {
    nativeTheme.themeSource = 'system'
})

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

