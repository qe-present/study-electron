const { contextBridge, ipcRenderer } = require('electron/renderer.js')

contextBridge.exposeInMainWorld('electron', {
    startDrag: async (fileName) => {
        return await ipcRenderer.invoke('ondragstart', fileName)
    }

})
