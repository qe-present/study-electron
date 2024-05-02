const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('ipcRenderer', {
    notify: ({title, body}) => {
        ipcRenderer.send('notification', { title, body });
    }
})
