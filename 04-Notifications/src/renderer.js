
document.getElementById('myButton').addEventListener('click', function() {
      window.ipcRenderer.notify({
          title: '通知',
          body: 'Hello, World!',
      });

  });
