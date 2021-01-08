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
    return ydl.getVideoInfo(url);
}

function getVersion() {
    return ydl.getVersion();
}

function install() {
    return YoutubeDlWrap.downloadFromWebsite(ydlPath);
}

module.exports = { getInfo, getVersion };