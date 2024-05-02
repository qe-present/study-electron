const testIt= async()=>{
    const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true
    })
    console.log('device', device)
    document.getElementById('device-name').innerHTML = device.name || `ID: ${device.id}`
}
document.getElementById('clickme').addEventListener('click', testIt)
// const cancelRequest = ()=> {
//     window.ipcRenderer.cancelBluetoothRequest()
// }
// document.getElementById('cancel').addEventListener('click', cancelRequest)
// window.ipcRenderer.bluetoothPairingRequest(
//     (event, details)=> {
//         const response={}
//         let pairingKind = details.pairingKind
//         console.log(pairingKind)
//
//     }
// )
