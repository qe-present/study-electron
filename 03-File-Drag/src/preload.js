const {ipcRenderer, contextBridge} = require('electron')

contextBridge.exposeInMainWorld('ipcRenderer', {
        startDrag: (filePath) => {
            ipcRenderer.send('start-drag', filePath)
        }
    }
)
