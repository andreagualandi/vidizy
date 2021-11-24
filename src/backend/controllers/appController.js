'use strict';

const { app, dialog } = require('electron');
const path = require('path');

function getDownloadPath(args) {
    const dir = app.getPath('downloads');
    return path.join(dir, args.data.fileName);
}

async function showSaveDialog(args) {
    const dir = app.getPath('downloads');
    return dialog.showSaveDialog({
        defaultPath: dir
    })
}

module.exports = { getDownloadPath, showSaveDialog };