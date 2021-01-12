"use strict";

const YoutubeDlWrap = require("youtube-dl-wrap");

const path = require("path");
const { app } = require('electron');

const ydlPath = app.getPath('userData');
const ydl = new YoutubeDlWrap(path.join(ydlPath, 'youtube-dl'));

async function getInfo(args) {
    const { url } = args.data;
    console.log('Info for URL', url);
    const info = await ydl.getVideoInfo(url);
    const formats = info.formats.map((p) => ({
        id: p.format_id,
        description: p.fps ? `${p.format} - ${p.fps}fps` : p.format,
    }));

    return { title: info.title, formats: formats };
}

function getVersion() {
    return ydl.getVersion();
}

async function getUrl(args) {
    console.log('GET URL', args);
    const params = ['-f', args.data.format, '-g', args.data.url];
    const url = await ydl.execPromise(params);
    return url.split(/\r?\n/)[0];
}

function install() {
    return YoutubeDlWrap.downloadFromWebsite(ydlPath);
}

module.exports = { getInfo, getVersion, getUrl };