"use strict";

const ipc = require('electron').ipcMain

ipc.handle('api', async (event, args) => {
    return 'backend message';
});
