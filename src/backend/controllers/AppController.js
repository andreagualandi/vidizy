'use strict';

const { app } = require('electron');
const path = require('path');

function getDownloadPath(args) {
    const dir = app.getPath('downloads');
    return path.join(dir, args.data.fileName);
}

module.exports = { getDownloadPath };