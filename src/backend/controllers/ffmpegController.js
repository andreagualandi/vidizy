"use sticts";

const { BrowserWindow, MessageChannelMain } = require('electron');
const ffmpeg = require('../lib/ffmpeg');
let port;

function getVersion() {
    return ffmpeg.getVersion();
}

function stop() {
    return ffmpeg.kill();
}

async function cut(args) {
    const { input, output, start, duration, overwrite } = args.data;
    port = getPortForProgress();

    await ffmpeg.cut(input, output, overwrite, start, duration, handleProgress);
    port.postMessage(100);
    return;
}

function handleProgress(data) {
    port.postMessage(data);
}


function getPortForProgress() {
    const window = BrowserWindow.getFocusedWindow();
    const { port1, port2 } = new MessageChannelMain();

    port2.on('message', (e) => {
        console.log('Data from renderer');
    })
    port2.start();
    window.webContents.postMessage('main-world-port', null, [port1]);
    return port2;
}

module.exports = { cut, getVersion, stop };