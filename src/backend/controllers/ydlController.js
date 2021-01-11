"use sticts";

const YoutubeDlWrap = require("youtube-dl-wrap");
//const YoutubeDlWrap = require("../Ytdl");
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

function install() {
    return YoutubeDlWrap.downloadFromWebsite(ydlPath);
}

module.exports = { getInfo, getVersion };