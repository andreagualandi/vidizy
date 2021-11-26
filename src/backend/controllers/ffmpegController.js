"use sticts";

const ffmpeg = require('../lib/ffmpeg');

async function cut(args) {
    const { input, output } = args.data;
    console.log('cut params:', input, output);
    const params = ['-i', input];
    //ss befor -i for fast encode with less precision. ss after -i for more precision but much high encode time
    args.data.start && params.unshift('-ss', args.data.start);
    args.data.duration && params.push('-t', args.data.duration);
    params.push('-c', 'copy', output)

    return ffmpeg.execute(params);
}

function getVersion() {
    return ffmpeg.getVersion();
}

module.exports = { cut, getVersion };