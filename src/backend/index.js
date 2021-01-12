"use strict";

const ipc = require('electron').ipcMain

const { getInfo, getUrl } = require('./controllers/ydlController');
const { getVersion, cut } = require('./controllers/ffmpegController');
const { getDownloadPath } = require('./controllers/AppController');

const routes = {
    ydl: {
        getInfo: getInfo,
        getUrl: getUrl,
    },
    ffmpeg: {
        getVersion: getVersion,
        cut: cut,
    },
    app: {
        getDownloadPath: getDownloadPath,
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

async function ffmpegRoute(event, args) {
    try {
        return await routes.ffmpeg[args.action](args)
    } catch (e) {
        console.error('FFMPEG - Error:', e);
        return null;
    }
}

async function appRoute(event, args) {
    try {
        return await routes.app[args.action](args)
    } catch (e) {
        console.error('APP - Error:', e);
        return null;
    }
}

ipc.handle('api-ydl', ydlRoute);
ipc.handle('api-ffmpeg', ffmpegRoute);
ipc.handle('api-app', appRoute);