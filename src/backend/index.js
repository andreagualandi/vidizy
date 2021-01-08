"use strict";

const ipc = require('electron').ipcMain

const { getInfo } = require('./controllers/ydlController');

const routes = {
    ydl: {
        getInfo: getInfo,
    }
};

async function ydlRoute(event, args) {
    try {
        return await routes.ydl[args.action](args)
    } catch (e) {
        console.error('YDL - Error:', e);
        return null;
    }
}

ipc.handle('api-ydl', ydlRoute);