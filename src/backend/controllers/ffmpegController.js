"use sticts";

const ffmpeg = require('../lib/ffmpeg');

async function cut(args) {
    const { input, output } = args.data;
    console.log('cut params:', input, output);
    const params = ['-i', `"${input}"`];
    if (args.data.start) {
        params.unshift('-ss', args.data.start);
    }

    if (args.data.end) {
        params.push('-to', args.data.end);
    }

    params.push('-c', 'copy', `"${output}"`)

    //return params;
    return ffmpeg.execute(params);

}

function getVersion() {
    return ffmpeg.getVersion();
}

module.exports = { cut, getVersion };