const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
    invoke: (message, data) => ipcRenderer.invoke(message, data)
});