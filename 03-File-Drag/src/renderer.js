document.getElementById('drag1').ondragstart = (event) => {
    event.preventDefault()
    window.ipcRenderer.startDrag('文件1.md')
}

document.getElementById('drag2').ondragstart = (event) => {
    event.preventDefault()
    window.ipcRenderer.startDrag('文件2.md')
}
