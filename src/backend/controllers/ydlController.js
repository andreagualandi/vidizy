"use strict";

const YoutubeDlWrap = require("youtube-dl-wrap");

const path = require("path");
const { app } = require('electron');

const ydlPath = app.getPath('userData');
const ydl = new YoutubeDlWrap(path.join(ydlPath, 'youtube-dl'));

async function getInfo(args) {
    const { url } = args.data;
    const info = await ydl.getVideoInfo(url);
    console.log('Info for URL', url, info);

    const result = info.formats.map(item => {
        const formatInfo = item.fps ? `${item.format_note} - ${item.fps}fps` : item.format_note;

        return {
            id: item.format_id,
            description: `${item.ext} - ${formatInfo} - (vcodec: ${item.vcodec} / acodec: ${item.acodec})`,
            ext: item.ext,
            url: item.url,
        };
    });

    return { title: info.title, duration: info.duration, thumbnail: info.thumbnail, formats: result, url: info.url };
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