const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
    invoke: (message, data) => ipcRenderer.invoke(message, data),
});



// We need to wait until the main world is ready to receive the message before
// sending the port. We create this promise in the preload so it's guaranteed
// to register the onload listener before the load event is fired.
const windowLoaded = new Promise(resolve => { window.onload = resolve });
//this is a bridge for sorting ports between main and renderer
ipcRenderer.on('main-world-port', async (event) => {
    await windowLoaded
    // We use regular window.postMessage to transfer the port from the isolated
    // world to the main world.
    window.postMessage('main-world-port', '*', event.ports)
});