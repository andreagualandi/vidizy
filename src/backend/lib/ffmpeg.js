"use strict";

const { spawn, execFile } = require('child_process');

const cmd = require('ffmpeg-static');


function execute(args) {
    console.log('FFMPEG args', args, args.join(' '));
    const proc = spawn(cmd, args);

    proc.stdout.on('data', function(data) {
        console.log(data);
    });

    proc.stderr.setEncoding("utf8")
    proc.stderr.on('data', function(data) {
        console.log(data);
    });

    proc.on('close', function() {
        console.log('finished');
    });

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


module.exports = { getVersion, execute };