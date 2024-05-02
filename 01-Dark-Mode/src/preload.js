const {contextBridge, ipcRenderer} = require('electron')
contextBridge.exposeInMainWorld(
    'ipcRenderer',{
        'toggle': async () => {
            return await ipcRenderer.invoke('toggleTheme')
        },
        'system': () => {
            ipcRenderer.send('systemTheme')
        }
    }
)
