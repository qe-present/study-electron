document.getElementById('drag1').ondragstart = async (event) => {
    event.preventDefault()
    let res = await window.electron.startDrag('1.md')
    console.log(res)
}

document.getElementById('drag2').ondragstart = async (event) => {
    event.preventDefault()
    let res = await window.electron.startDrag('2.md')
    console.log(res)
}
