function handleKeyPress (event) {
    // You can put code here to handle the keypress.
    document.getElementById('last-keypress').innerText = event.key
    console.log(`按下了 ${event.key} 键`)
}

window.addEventListener('keyup', handleKeyPress, true)
