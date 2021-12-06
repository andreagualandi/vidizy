"use strict";

const { spawn, execFile } = require('child_process');
const { hmsToSeconds, strToSeconds, roundToTwo } = require('./utils');

const cmd = require('ffmpeg-static');
let proc = null;

//NOTE: ffmpeg use stderr as output
function execute(args, callback) {
    return new Promise((resolve, reject) => {
        console.log('FFMPEG args', args, args.join(' '));
        proc = spawn(cmd, args);

        proc.stderr.setEncoding("utf8")
        proc.stderr.on('data', callback);

        proc.on('close', (code, signal) => {
            console.log(`Process terminated due to receipt of signal ${signal}`)
            resolve();
        });
    })
}

async function cut(input, output, overwrite = true, start = null, duration = null, callback) {
    console.log('cut params:', input, output, start, duration);
    const params = ['-i', input];
    //ss befor -i for fast encode with less precision. ss after -i for more precision but much high encode time
    start && params.unshift('-ss', start);
    duration && params.push('-t', duration);
    params.push('-c', 'copy', output)
    overwrite && params.push('-y');

    let time = 0;
    let progress = 0;
    duration = strToSeconds(duration);

    return execute(params, (data) => {
        console.log(data);
        let parse = null;
        if (!duration) {
            parse = data.match(/Duration: (\d{2}):(\d{2}):(\d{2})/);
            if (parse) {
                duration = hmsToSeconds(parse[1], parse[2], parse[3]);
            }
        } else {
            parse = data.match(/time=(\d{2}):(\d{2}):(\d{2})/);
            if (parse && duration) {
                time = hmsToSeconds(parse[1], parse[2], parse[3]);
                progress = roundToTwo(time / duration);
            }
        }
        callback(progress);
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

module.exports = { getVersion, kill, cut };