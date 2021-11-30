"use strict";

const { spawn, execFile } = require('child_process');
const { BrowserWindow, MessageChannelMain } = require('electron');
const { hmsToSeconds } = require('./utils');

const cmd = require('ffmpeg-static');
let proc = null;

//NOTE: ffmpeg use stderr as output
function execute(args) {
    console.log('FFMPEG args', args, args.join(' '));
    proc = spawn(cmd, args);
    const port = getPortForProgress();
    let duration = null;
    let time = 0;
    let progress = 0;

    proc.stderr.setEncoding("utf8")
    proc.stderr.on('data', (data) => {
        console.log(data);
        let parse = null;
        if (duration === null) {
            parse = data.match(/Duration: (\d{2}):(\d{2}):(\d{2})/);
            if (parse) {
                duration = hmsToSeconds(parse[1], parse[2], parse[3]);
            }
        } else {
            parse = data.match(/time=(\d{2}):(\d{2}):(\d{2})/);
            if (parse && duration) {
                time = hmsToSeconds(parse[1], parse[2], parse[3]);
                progress = (time / duration) * 100;
                port.postMessage({ progress: progress });

            }
        }
    });

    proc.on('close', (code, signal) => {
        console.log(`Process terminated due to receipt of signal ${signal}`)
    });

}

function kill() {
    proc && proc.kill();
}

function getVersion() {
    return execPromise(['-version']);
}

function execPromise(args = [], options = {}) {
    return new Promise((resolve, reject) => {
        execFile(cmd, args, options, (error, stdout, stderr) => {
            error ? reject({ error: error, stderr: stderr }) : resolve(stdout);
        });
    });
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



module.exports = { getVersion, execute, kill };