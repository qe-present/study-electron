import {contextBridge, ipcRenderer} from 'electron';
contextBridge.exposeInMainWorld('ipcRenderer', {
    'bluetoothPairingRequest': (callback) => ipcRenderer.on('bluetooth-pairing-request',() => callback),
});
