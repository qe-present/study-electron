const {contextBridge, ipcRenderer} = require('electron')
contextBridge.exposeInMainWorld(
    'ipcRenderer',{
        'toggle': () => {
            ipcRenderer.invoke('toggle')
        },
        'system': () => {
            ipcRenderer.invoke('system')
        }
    }
)
