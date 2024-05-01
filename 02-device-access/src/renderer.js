async function testIt () {
    const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true
    })
    document.getElementById('device-name').innerHTML = device.name || `ID: ${device.id}`
}

