"use strict";

const ipc = require('electron').ipcMain

const ydlController = require('./controllers/ydlController');
const ffmpegController = require('./controllers/ffmpegController');
const AppController = require('./controllers/appController');

const routes = {
    ydl: ydlController,
    ffmpeg: ffmpegController,
    app: AppController
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